from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ProductSerializer
from .filter import ProductFilter

# Create new product
@api_view(['POST'])
@permission_classes([AllowAny])  
def createProduct(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update product
@api_view(['PUT', 'PATCH'])
@permission_classes([AllowAny])  
def updateProduct(request, product_id):
    try:
        product = Product.objects.get(product_id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    partial = request.method == 'PATCH'
    serializer = ProductSerializer(product, data=request.data, partial=partial)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Detele product
@api_view(['DELETE'])
@permission_classes([AllowAny])
def deleteProduct(request, product_id):
    try:
        product = Product.objects.get(product_id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    product.delete()
    return Response({'message': 'Product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# Get product details
@api_view(['GET'])
@permission_classes([AllowAny])
def getProductDetail(request, product_id):
    try:
        product = Product.objects.get(product_id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Get all products
@api_view(['GET'])
@permission_classes([AllowAny])
def getAllProducts(request):
    products = Product.objects.all()
    
    # Apply filters
    filterset = ProductFilter(request.GET, queryset=products)
    if not filterset.is_valid():
        return Response(filterset.errors, status=status.HTTP_400_BAD_REQUEST)
    
    products = filterset.qs

    # Apply pagination
    paginator = PageNumberPagination()
    paginator.page_size = 3  # Số sản phẩm trên mỗi trang

    result_page = paginator.paginate_queryset(products, request)
    serializer = ProductSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)