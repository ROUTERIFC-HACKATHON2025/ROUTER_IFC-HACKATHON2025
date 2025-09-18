from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from routerifc.views import EmpresaViewSet, MotoristaViewSet, VeiculoViewSet, RotasViewSet, EnderecoViewSet, PassageiroViewSet, UserViewSet, EmailOrUsernameTokenObtainPairView, password_reset_request, password_reset_confirm

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
    path('api/token/', EmailOrUsernameTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/password-reset/', password_reset_request, name='password_reset_request'),
    path('api/password-reset/confirm/', password_reset_confirm, name='password_reset_confirm'),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/swagger/', SpectacularSwaggerView.as_view(), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(), name='redoc'),
    path('admin/', admin.site.urls),
]
