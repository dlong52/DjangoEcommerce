from django.urls import path
from .views import createProduct, updateProduct, deleteProduct, getProductDetail, getAllProducts

urlpatterns = [
    path('create', createProduct, name='create-product'),
    path('update/<int:product_id>', updateProduct, name='update-product'),
    path('delete/<int:product_id>', deleteProduct, name='delete-product'),
    path('detail/<int:product_id>', getProductDetail, name='detail-product'),
    path('all/', getAllProducts, name='all-product'),
    
]
