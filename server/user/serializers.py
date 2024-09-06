from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = ['user_id', 'username', 'email', 'password', 'confirm_password', 'role', 'address', 'phone_number', 'image']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
        }

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        # Chỉ kiểm tra mật khẩu khi cả password và confirm_password đều được cung cấp
        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError({'confirm_password': 'Passwords must match.'})
        
        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('confirm_password', None)
        user = User(**validated_data)
        user.password = make_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        validated_data.pop('confirm_password', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
