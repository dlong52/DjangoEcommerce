from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from .models import Category
from .serializers import CategorySerializer

@api_view(['POST'])
@permission_classes([AllowAny])  
def createCategory(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([AllowAny])  
def updateCategory(request, category_id):
    try:
        category = Category.objects.get(category_id=category_id)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CategorySerializer(category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([AllowAny])  
def deleteCategory(request, category_id):
    try:
        category = Category.objects.get(category_id=category_id)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    category.delete()
    return Response({'message': 'Category deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([AllowAny])  
def getCategoryDetail(request, category_id):
    try:
        category = Category.objects.get(category_id=category_id)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CategorySerializer(category)
    return Response(serializer.data)
from rest_framework.pagination import PageNumberPagination

@api_view(['GET'])
@permission_classes([AllowAny])  
def getAllCategories(request):
    categories = Category.objects.all()
    
    # Pagination
    paginator = PageNumberPagination()
    paginator.page_size = 10  # Số category trên mỗi trang, bạn có thể thay đổi giá trị này

    result_page = paginator.paginate_queryset(categories, request)
    serializer = CategorySerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
