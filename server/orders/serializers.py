from rest_framework import serializers
from .models import Order, OrderDetail, Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['payment_id', 'payment_method', 'payment_status', 'payment_date']

class OrderDetailSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = OrderDetail
        fields = ['product', 'product_name', 'quantity', 'size', 'price', 'image']

class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, source='orderdetail_set', read_only=True)
    payment_info = PaymentSerializer(source='payment', read_only=True)
    
    # Remove source keyword argument if it's the same as field name
    address = serializers.CharField()
    phone_number = serializers.CharField()
    username = serializers.CharField()

    class Meta:
        model = Order
        fields = ['order_id', 'user', 'total_amount', 'order_date', 'status', 'payment_info', 'cart', 'order_details', 'address', 'phone_number', 'username']
