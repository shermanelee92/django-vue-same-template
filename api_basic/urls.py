from django.urls import path, include
# from .views import article_list, article_detail, ArticleApiView, ArticleDetailView, GenericAPIView, ArticleViewSet, index
from .views import ArticleViewSet, index

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('article', ArticleViewSet, basename='article')

urlpatterns = [
    path('index/', index),
    path('viewset/', include(router.urls)),
    path('viewset/<int:pk>', include(router.urls)),
    # path('article/', article_list),
    # path('article/', ArticleApiView.as_view()),
    # path('generic/article/<int:id>/', GenericAPIView.as_view()),
    # path('detail/<int:id>/', ArticleDetailView.as_view())
    # path('detail/<int:pk>/', article_detail)
]
