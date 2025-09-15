from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Empresa, Motorista, Veiculo, Rotas, Endereco, Passageiro, Admin
from django.contrib.auth.models import User

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

    def create(self, validated_data):
        # Cria/garante um User do Django vinculado ao Passageiro
        email = validated_data.get('email')
        senha_plana = validated_data.get('senha')

        if not email or not senha_plana:
            raise serializers.ValidationError({'detail': 'Email e senha são obrigatórios para cadastro.'})

        # Usa email como username
        user, created = User.objects.get_or_create(username=email, defaults={'email': email})
        # Sempre define/atualiza a senha para garantir acesso
        user.set_password(senha_plana)
        user.save()

        validated_data['usuario'] = user
        passageiro = super().create(validated_data)
        return passageiro

class AdminSerializer(ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class MotoristaSerializer(ModelSerializer):
    class Meta:
        model = Motorista
        fields = '__all__'

    def create(self, validated_data):
        # Cria/garante um User do Django vinculado ao Motorista
        email = validated_data.get('email')
        senha_plana = validated_data.get('senha')

        if not email or not senha_plana:
            raise serializers.ValidationError({'detail': 'Email e senha são obrigatórios para cadastro.'})

        user, created = User.objects.get_or_create(username=email, defaults={'email': email})
        user.set_password(senha_plana)
        user.save()

        validated_data['usuario'] = user
        motorista = super().create(validated_data)
        return motorista