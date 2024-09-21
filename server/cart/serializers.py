from rest_framework import serializers
from .models import Cart, CartItem
from product.models import Product

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    product_price = serializers.SerializerMethodField()
    product_images = serializers.SerializerMethodField()
    product_discount = serializers.SerializerMethodField()  # Sửa lại từ product_discount thành discount

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity', 'size', 'product_name', 'product_price', 'product_images', 'product_discount']

    def get_product_name(self, obj):
        return obj.product.name

    def get_product_price(self, obj):
        return obj.product.price

    def get_product_images(self, obj):
        return obj.product.images

    def get_product_discount(self, obj):
        return obj.product.discount  # Truy xuất discount từ Product
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'name', 'price', 'images', 'discount']  # Thêm discount vào ProductSerializer
