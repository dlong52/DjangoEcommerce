from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import signUp, signIn, updateUser, deleteUser, getDetail, getAll
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
router = DefaultRouter()

urlpatterns = [
    path('sign-up', signUp, name='sign-up'),  
    path('sign-in', signIn, name='sign-in'),
    path('update/<int:user_id>', updateUser, name='update-user'),
    path('delete/<int:user_id>', deleteUser, name='delete-user'),
    path('detail/<int:user_id>', getDetail, name='detail-user'),
    path('all', getAll, name='all-user'),
]
