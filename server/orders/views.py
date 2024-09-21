from decimal import ROUND_DOWN, Decimal
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Order, OrderDetail, Payment
from cart.models import Cart, CartItem
from product.models import Product
from .serializers import OrderSerializer, PaymentSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .filter import StandardResultsSetPagination, OrderFilter
from django.utils import timezone

@api_view(['POST'])
@permission_classes([AllowAny])
def create_order(request):
    user_id = request.data.get('user_id')
    payment_method = request.data.get('payment_method')
    address = request.data.get('address')
    phone_number = request.data.get('phone_number')
    username = request.data.get('username')

    if not user_id or not payment_method:
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

    # Lấy giỏ hàng của người dùng
    try:
        cart = Cart.objects.get(user_id=user_id)
        cart_items = CartItem.objects.filter(cart=cart)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
    except CartItem.DoesNotExist:
        return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

    if not cart_items.exists():
        return Response({"error": "No items in the cart"}, status=status.HTTP_400_BAD_REQUEST)

    # Tính tổng tiền của giỏ hàng
    total_amount = sum(
        item.product.price * (Decimal(1) - Decimal(item.product.discount) / Decimal(100)) * Decimal(item.quantity)
        for item in cart_items
    )
    total_amount = (total_amount / Decimal(1000)).quantize(Decimal('1'), rounding=ROUND_DOWN) * Decimal(1000)

    # Tạo payment
    payment = Payment.objects.create(
        payment_method=payment_method,
        payment_status='pending'
    )

    # Tạo đơn hàng
    order = Order.objects.create(
        user_id=user_id,
        total_amount=total_amount,
        status='pending',
        payment=payment,
        cart=cart,
        address=address,
        phone_number=phone_number,
        username=username
    )

    # Tạo chi tiết đơn hàng từ giỏ hàng và giảm số lượng sản phẩm trong kho
    for cart_item in cart_items:
        product = cart_item.product
        
        # Kiểm tra xem số lượng sản phẩm có đủ không
        if product.stock_quantity < cart_item.quantity:
            return Response({"error": f"Product '{product.name}' is out of stock or not enough quantity"}, status=status.HTTP_400_BAD_REQUEST)

        # Giảm số lượng sản phẩm tồn kho
        product.stock_quantity -= cart_item.quantity

        # Cộng thêm số lượng đã mua vào sales_count
        product.sales_count += cart_item.quantity
        product.save()

        # Tạo OrderDetail
        OrderDetail.objects.create(
            order=order,
            product=cart_item.product,
            size=cart_item.size,
            quantity=cart_item.quantity,
            price=cart_item.product.price,
            image=cart_item.product.images[0]
        )

    # Sau khi đặt hàng, xóa các sản phẩm trong giỏ hàng 
    cart_items.delete()

    # Trả về thông tin đơn hàng
    serializer = OrderSerializer(order)
    return Response(
        {
            'status': 'success',
            'message': 'Order was successfully created',
            'data': serializer.data
        },
        status=status.HTTP_201_CREATED
    )

@api_view(['GET'])
@permission_classes([AllowAny])
def get_order_details(request, order_id):
    try:
        order = Order.objects.get(order_id=order_id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_orders(request):
    queryset = Order.objects.all()
    
    # Apply filters
    order_filter = OrderFilter(request.GET, queryset=queryset)
    queryset = order_filter.qs
    
    # Paginate the results
    paginator = StandardResultsSetPagination()
    paginated_queryset = paginator.paginate_queryset(queryset, request)
    
    serializer = OrderSerializer(paginated_queryset, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_orders_by_user(request, user_id):
    orders = Order.objects.filter(user_id=user_id)

    # Apply filters if any are provided in the query params
    order_filter = OrderFilter(request.GET, queryset=orders)
    if order_filter.qs.exists():
        orders = order_filter.qs
    else:
        return Response({"error": "Chưa có đơn nào ở mục này", 'status' : "error"}, status=status.HTTP_200_OK)

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([AllowAny])  
def update_order(request, order_id):
    try:
        order = Order.objects.get(order_id=order_id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

    # Update status
    new_status = request.data.get('status', order.status)
    order.status = new_status

    # Set date_received if status is updated to 'paid'
    if new_status == 'paid':
        order.date_received = timezone.now()  # Automatically set the current time

    # Set date_cancelled if status is updated to 'cancelled'
    if new_status == 'cancelled':
        order.date_cancelled = timezone.now()  # Automatically set the current time

    # Update payment_info fields if provided
    payment_info = request.data.get('payment_info', {})
    if 'payment_status' in payment_info:
        order.payment.payment_status = payment_info['payment_status']
    if 'payment_method' in payment_info:
        order.payment.payment_method = payment_info['payment_method']
    
    order.payment.save()  # Save payment info
    order.save()  # Save order

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)
