from django.http import JsonResponse
from django.views import View
from orders.models import Order, Payment
import paypalrestsdk
import json

class CreatePaymentView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        total_amount = data.get('total_amount')
        order_id = data.get('order_id')

        # Ensure total_amount is a string representing a valid number
        if total_amount is None or not isinstance(total_amount, (int, float)):
            return JsonResponse({"error": "Invalid total amount"}, status=400)

        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:5173/cart",
                "cancel_url": "http://localhost:5173/cart"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": f"Order #{order_id}",
                        "sku": "item",
                        "price": str(total_amount),
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "total": str(total_amount),
                    "currency": "USD",
                },
                "description": f"Payment for Order #{order_id}"
            }]
        })

        if payment.create():
            return JsonResponse({
                "paymentID": payment.id,
                "approvalUrl": payment.links[1].href
            })
        else:
            print("Error creating payment:", payment.error)
            return JsonResponse({"error": payment.error}, status=400)

class ExecutePaymentView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        payment_id = data.get('paymentId')
        payer_id = data.get('payerId')

        print("Received paymentId:", payment_id)
        print("Received payerId:", payer_id)

        try:
            payment = paypalrestsdk.Payment.find(payment_id)
            print("Payment found:", payment)

            # Kiểm tra trạng thái trước khi thực hiện
            print("Payment state before execution:", payment.state)

            if payment.state == 'approved':
                if payment.execute({"payer_id": payer_id}):
                    order = Order.objects.get(order_id=payment.transactions[0].invoice_number)
                    Payment.objects.create(
                        payment_method='paypal',
                        payment_status='paid',
                        payment_date=payment.create_time,
                        payment_id=payment.id
                    )
                    order.status = 'paid'
                    order.save()
                    return JsonResponse({"message": "Payment executed successfully!"})
                else:
                    print("Payment execution error:", payment.error)
                    return JsonResponse({"error": payment.error}, status=400)
            else:
                print("Payment state is not approved:", payment.state)
                return JsonResponse({"error": "Payment not approved. Current state: {}".format(payment.state)}, status=400)

        except Order.DoesNotExist:
            return JsonResponse({"error": "Order not found"}, status=404)
        except Exception as e:
            print("Exception:", str(e))
            return JsonResponse({"error": f"An error occurred while processing the payment: {str(e)}"}, status=500)


class CancelPaymentView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({"message": "Payment canceled!"})