from django.urls import path
from .views import createCollection, updateCollection, deleteCollection, getAllCollection, getCollectionDetail

urlpatterns = [
    path('create', createCollection, name='create-collection'),
    path('all', getAllCollection, name='all-collection'),
    path('detail/<int:collection_id>', getCollectionDetail, name='collection-detail'),
    path('update/<int:collection_id>', updateCollection, name='update-collection'),
    path('delete/<int:collection_id>', deleteCollection, name='delete-collection'),
]
