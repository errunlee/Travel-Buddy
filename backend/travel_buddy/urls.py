from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserViewSet, TripViewSet, MessageViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"trips", TripViewSet)
router.register(r'trips/(?P<trip_pk>\d+)/messages', MessageViewSet, basename='trip-messages')
# router.register(r"messages", MessageViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
