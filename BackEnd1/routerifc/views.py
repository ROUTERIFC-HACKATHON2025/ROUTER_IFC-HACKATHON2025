from rest_framework.viewsets import ModelViewSet
from .models import Empresa, Motorista, Veiculo, Rotas, Endereco, Passageiro
from .serializers import EmpresaSerializer, MotoristaSerializer, VeiculoSerializer, RotasSerializer, EnderecoSerializer, PassageiroSerializer

class EmpresaViewSet(ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class MotoristaViewSet(ModelViewSet):
    queryset = Motorista.objects.all()
    serializer_class = MotoristaSerializer

class VeiculoViewSet(ModelViewSet):
    queryset = Veiculo.objects.all()
    serializer_class = VeiculoSerializer

class RotaViewSet(ModelViewSet):
    queryset = Rota.objects.all()
    serializer_class = RotaSerializer

class EnderecoViewSet(ModelViewSet):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer

class PassageiroViewSet(ModelViewSet):
    queryset = Passageiro.objects.all()
    serializer_class = PassageiroSerializer