from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Cart, CartItem
from rest_framework.permissions import AllowAny
from .serializers import CartSerializer, CartItemSerializer
from product.models import Product

@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')
    size = request.data.get('size')
    user_id = request.data.get('user_id')

    if not all([product_id, quantity, user_id]):
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.get(product_id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    try:
        quantity = int(quantity)
    except ValueError:
        return Response({"error": "Invalid quantity"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        size = str(size)
    except ValueError:
        return Response({"error": "Invalid size"}, status=status.HTTP_400_BAD_REQUEST)

    cart, created = Cart.objects.get_or_create(user_id=user_id)
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product, size=size)

    if not created:
        cart_item.quantity += quantity
        cart_item.save()
    else:
        cart_item.quantity = quantity
        cart_item.save()

    return Response({"status": "success", "message": "Thêm vào giỏ hàng thành công", "data": CartItemSerializer(cart_item).data}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_cart(request, user_id):
    try:
        cart = Cart.objects.get(user_id=user_id)
        cart_items = CartItem.objects.filter(cart=cart)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([AllowAny])
def update_cart_item(request, cart_item_id):
    try:
        cart_item = CartItem.objects.get(id=cart_item_id)
    except CartItem.DoesNotExist:
        return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

    quantity = request.data.get('quantity')
    size = request.data.get('size')

    if quantity:
        try:
            cart_item.quantity = int(quantity)
        except ValueError:
            return Response({"error": "Invalid quantity"}, status=status.HTTP_400_BAD_REQUEST)

    if size:
        try:
            cart_item.size = str(size)
        except ValueError:
            return Response({"error": "Invalid size"}, status=status.HTTP_400_BAD_REQUEST)

    cart_item.save()
    return Response({"status": "success", "message": "Cập nhật sản phẩm trong giỏ hàng thành công", "data": CartItemSerializer(cart_item).data}, status=status.HTTP_200_OK)

# API để xóa sản phẩm khỏi giỏ hàng
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_cart_item(request, cart_item_id):
    try:
        cart_item = CartItem.objects.get(id=cart_item_id)
        cart_item.delete()
        return Response({"status": "success", "message": "Sản phẩm đã được xóa khỏi giỏ hàng"}, status=status.HTTP_200_OK)
    except CartItem.DoesNotExist:
        return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
