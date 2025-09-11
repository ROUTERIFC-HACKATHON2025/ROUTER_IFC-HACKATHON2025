from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from routerifc.views import EmpresaViewSet, MotoristaViewSet, VeiculoViewSet, RotasViewSet, EnderecoViewSet, PassageiroViewSet, UserViewSet

router = DefaultRouter()
router.register(r'empresas', EmpresaViewSet)
router.register(r'motoristas', MotoristaViewSet)
router.register(r'veiculos', VeiculoViewSet)
router.register(r'rotas', RotasViewSet)
router.register(r'enderecos', EnderecoViewSet)
router.register(r'passageiros', PassageiroViewSet)
router.register(r'usuarios', UserViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/swagger/', SpectacularSwaggerView.as_view(), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(), name='redoc'),
    path('admin/', admin.site.urls),
]