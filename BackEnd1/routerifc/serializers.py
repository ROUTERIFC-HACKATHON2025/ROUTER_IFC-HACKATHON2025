from rest_framework.serializers import ModelSerializer
from .models import Empresa, Motorista, Veiculo, Rotas, Endereco, Passageiro

class EmpresaSerializer(ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class MotoristaSerializer(ModelSerializer):
    class Meta:
        model = Motorista
        fields = '__all__'

class VeiculoSerializer(ModelSerializer):
    class Meta:
        model = Veiculo
        fields = '__all__'

class RotasSerializer(ModelSerializer):
    class Meta:
        model = Rotas
        fields = '__all__'

class EnderecoSerializer(ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'

class PassageiroSerializer(ModelSerializer):
    class Meta:
        model = Passageiro
        fields = '__all__'