from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'confirm_password')
        extra_kwargs = {
            'password': {'write_only': True}, 
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'Passwords must match.'})
        return data

    def create(self, validated_data):
        password = validated_data.pop('password') 
        validated_data.pop('confirm_password') 
        user = User(**validated_data) 
        user.password = make_password(password) 
        user.save()
        return user
