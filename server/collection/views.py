from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from product.models import Product
from .models import Collection
from .serializers import CollectionSerializer


@api_view(['POST'])
@permission_classes([AllowAny])  
def createCollection(request):
    serializer = CollectionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([AllowAny])  
def updateCollection(request, collection_id):
    try:
        collection = Collection.objects.get(collection_id=collection_id)
    except Collection.DoesNotExist:
        return Response({'error': 'Collection not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CollectionSerializer(collection, data=request.data, partial=True)
    if serializer.is_valid():
        # Lưu trạng thái 'active' trước khi update
        previous_active_status = collection.active
        
        # Save the updated collection
        updated_collection = serializer.save()
        
        # Kiểm tra nếu active thay đổi
        new_active_status = updated_collection.active
        if previous_active_status != new_active_status:
            # Cập nhật products có liên kết
            Product.objects.filter(collection=updated_collection).update(status=new_active_status)
        
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([AllowAny])  
def deleteCollection(request, collection_id):
    try:
        collection = Collection.objects.get(collection_id=collection_id)
    except Collection.DoesNotExist:
        return Response({'error': 'Collection not found'}, status=status.HTTP_404_NOT_FOUND)

    collection.delete()
    return Response({'message': 'Collection deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([AllowAny])  
def getCollectionDetail(request, collection_id):
    try:
        collection = Collection.objects.get(collection_id=collection_id)
    except Collection.DoesNotExist:
        return Response({'error': 'Collection not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CollectionSerializer(collection)
    return Response(serializer.data)
from rest_framework.pagination import PageNumberPagination

@api_view(['GET'])
@permission_classes([AllowAny])  
def getAllCollection(request):
    collections = Collection.objects.all()
    
    paginator = PageNumberPagination()
    paginator.page_size = 10  
    
    result_page = paginator.paginate_queryset(collections, request)
    serializer = CollectionSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
