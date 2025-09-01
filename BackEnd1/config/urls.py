from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from routerifc.views import EmpresaViewSet, MotoristaViewSet, VeiculoViewSet, RotasViewSet, EnderecoViewSet, PassageiroViewSet

router = DefaultRouter()
router.register(r'empresas', EmpresaViewSet)
router.register(r'motoristas', MotoristaViewSet)
router.register(r'veiculos', VeiculoViewSet)
router.register(r'rotas', RotasViewSet)
router.register(r'enderecos', EnderecoViewSet)
router.register(r'passageiros', PassageiroViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]