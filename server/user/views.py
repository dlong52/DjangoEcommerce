from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

# Register
@api_view(['POST'])
@permission_classes([AllowAny])  
def signUp(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Login
@api_view(['POST'])
@permission_classes([AllowAny])  
def signIn(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    if check_password(password, user.password):
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # Set the refresh token in the cookie
        response = Response({
            'status': "success",
            'access_token': access_token,
        }, status=status.HTTP_200_OK)
        
        # Set cookie with HttpOnly flag for security
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=True,  # Set to True if using HTTPS
            samesite='None',
        )

        return response
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
#Refresh token
@api_view(['POST'])
@permission_classes([AllowAny])
def refreshToken(request):
    refresh_token = request.COOKIES.get('refresh_token')
    if not refresh_token:
        return Response({"error": "No refresh token providedjk"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)
        return Response({"access_token": access_token}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)
# Logout
@api_view(['POST'])
@permission_classes([AllowAny])  
def logout(request):
    refresh_token = request.COOKIES.get('refresh_token')

    if not refresh_token:
        return Response({"error": "No refresh token provided"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Lấy refresh token từ cookie và vô hiệu hóa nó
        refresh = RefreshToken(refresh_token)
        refresh.blacklist()  # Đánh dấu refresh token này là không hợp lệ
        
        # Xóa cookie chứa refresh_token
        response = Response({"status": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('refresh_token')  # Xóa refresh token trong cookie
        
        return response
    except Exception as e:
        return Response({"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)
#Update user
@api_view(['PUT'])
@permission_classes([AllowAny])
def updateUser(request, user_id):
    try:
        user = User.objects.get(user_id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
#Delete user
@api_view(['DELETE'])
@permission_classes([AllowAny])
def deleteUser(request, user_id):
    try:
        user = User.objects.get(user_id=user_id)
        user.delete()
        return Response({"status": "User deleted successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

#Get user details
@api_view(['GET'])
@permission_classes([AllowAny])
def getDetail(request, user_id):
    try:
        user = User.objects.get(user_id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Get all users
@api_view(['GET'])
@permission_classes([AllowAny])
def getAll(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([AllowAny])  # Chỉ admin mới được tạo user mới
def createUser(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'message': 'User created successfully',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'status': 'error',
                'message': 'Validation failed',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
    