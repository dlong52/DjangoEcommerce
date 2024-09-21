from django.urls import path
from .views import createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryDetail

urlpatterns = [
    path('create', createCategory, name='create-category'),
    path('all/', getAllCategories, name='all-categories'),
    path('detail/<int:category_id>', getCategoryDetail, name='category-detail'),
    path('update/<int:category_id>', updateCategory, name='update-category'),
    path('delete/<int:category_id>', deleteCategory, name='delete-category'),
]
