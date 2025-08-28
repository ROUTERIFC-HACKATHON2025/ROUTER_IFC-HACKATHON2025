from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from routerifc.views import EmpresaViewSet

router = DefaultRouter()
router.register(r'empresas', EmpresaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]