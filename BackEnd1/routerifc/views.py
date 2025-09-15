from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Empresa, Motorista, Veiculo, Rotas, Endereco, Passageiro
from .serializers import EmpresaSerializer, MotoristaSerializer, VeiculoSerializer, RotasSerializer, EnderecoSerializer, PassageiroSerializer, AdminSerializer

class EmpresaViewSet(ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class MotoristaViewSet(ModelViewSet):
    queryset = Motorista.objects.all()
    serializer_class = MotoristaSerializer

class VeiculoViewSet(ModelViewSet):
    queryset = Veiculo.objects.all()
    serializer_class = VeiculoSerializer

class RotasViewSet(ModelViewSet):
    queryset = Rotas.objects.all()
    serializer_class = RotasSerializer

class EnderecoViewSet(ModelViewSet):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer

class PassageiroViewSet(ModelViewSet):
    queryset = Passageiro.objects.all()
    serializer_class = PassageiroSerializer

class AdminViewSet(ModelViewSet):
    queryset = User.objects.filter(is_superuser=True)
    serializer_class = AdminSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()

    @action(detail=False, methods=['get'])
    def me(self, request):
        user = request.user
        passageiro = False
        motorista = False
        admin = False
        data = {
            'username': user.username,
            'email': user.email,
            'is_passageiro': passageiro,
            'is_motorista': motorista,
            'is_admin': admin
        }
        if user.is_superuser:
            admin = True
            data['is_admin'] = admin
        if hasattr(user, 'passageiro'):
            passageiro = True
            data['is_passageiro'] = passageiro
            passageiro_obj = user.passageiro
            data.update({
                'nome': passageiro_obj.nome,
                'telefone': passageiro_obj.telefone,
                'email': passageiro_obj.email,
                'senha': passageiro_obj.senha,
                'dataNascimento': passageiro_obj.dataNascimento,
                'cpf': passageiro_obj.cpf,
                'nomeResponsavel': passageiro_obj.nomeResponsavel,
                'cpfResponsavel': passageiro_obj.cpfResponsavel,
                'telefoneResponsavel': passageiro_obj.telefoneResponsavel
            })
        if hasattr(user, 'motorista'):
            motorista = True
            data['is_motorista'] = motorista
            motorista_obj = user.motorista
            data.update({
                'nome': motorista_obj.nome,
                'telefone': motorista_obj.telefone,
                'email': motorista_obj.email,
                'senha': motorista_obj.senha,
                'cpf': motorista_obj.cpf,
                'codigoCnh': motorista_obj.codigoCnh
            })
        
        return Response(data, status=200)
