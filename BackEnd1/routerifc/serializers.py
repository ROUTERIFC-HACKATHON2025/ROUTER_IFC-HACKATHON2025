from rest_framework.serializers import ModelSerializer
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
    
    def create(self, validated_data):
        # Extrair dados do motorista
        email = validated_data.get('email')
        senha = validated_data.get('senha')
        nome = validated_data.get('nome')
        
        # Verificar se já existe um usuário com este email
        if User.objects.filter(email=email).exists():
            raise ValueError(f'Já existe um usuário com o email {email}')
        
        # Criar usuário Django
        username = email  # Usar email como username
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=senha,
                first_name=nome.split()[0] if nome else '',
                last_name=' '.join(nome.split()[1:]) if len(nome.split()) > 1 else ''
            )
        except Exception as e:
            raise ValueError(f'Erro ao criar usuário: {str(e)}')
        
        # Criar motorista e associar ao usuário
        validated_data['usuario'] = user
        try:
            motorista = Motorista.objects.create(**validated_data)
        except Exception as e:
            # Se falhar ao criar motorista, deletar o usuário criado
            user.delete()
            raise ValueError(f'Erro ao criar motorista: {str(e)}')
        
        return motorista
    
    def update(self, instance, validated_data):
        # Atualizar usuário Django se necessário
        if instance.usuario:
            # Se a senha foi alterada, atualizar no usuário Django
            if 'senha' in validated_data:
                instance.usuario.set_password(validated_data['senha'])
            
            # Se o email foi alterado, atualizar no usuário Django
            if 'email' in validated_data:
                instance.usuario.email = validated_data['email']
                instance.usuario.username = validated_data['email']  # Usar email como username
            
            # Se o nome foi alterado, atualizar no usuário Django
            if 'nome' in validated_data:
                nome = validated_data['nome']
                instance.usuario.first_name = nome.split()[0] if nome else ''
                instance.usuario.last_name = ' '.join(nome.split()[1:]) if len(nome.split()) > 1 else ''
            
            instance.usuario.save()
        
        # Atualizar outros campos do motorista
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

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
        # Extrair dados do passageiro
        email = validated_data.get('email')
        senha = validated_data.get('senha')
        nome = validated_data.get('nome')
        
        # Verificar se já existe um usuário com este email
        if User.objects.filter(email=email).exists():
            raise ValueError(f'Já existe um usuário com o email {email}')
        
        # Criar usuário Django
        username = email  # Usar email como username
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=senha,
                first_name=nome.split()[0] if nome else '',
                last_name=' '.join(nome.split()[1:]) if len(nome.split()) > 1 else ''
            )
        except Exception as e:
            raise ValueError(f'Erro ao criar usuário: {str(e)}')
        
        # Criar passageiro e associar ao usuário
        validated_data['usuario'] = user
        try:
            passageiro = Passageiro.objects.create(**validated_data)
        except Exception as e:
            # Se falhar ao criar passageiro, deletar o usuário criado
            user.delete()
            raise ValueError(f'Erro ao criar passageiro: {str(e)}')
        
        return passageiro
    
    def update(self, instance, validated_data):
        # Atualizar usuário Django se necessário
        if instance.usuario:
            # Se a senha foi alterada, atualizar no usuário Django
            if 'senha' in validated_data:
                instance.usuario.set_password(validated_data['senha'])
            
            # Se o email foi alterado, atualizar no usuário Django
            if 'email' in validated_data:
                instance.usuario.email = validated_data['email']
                instance.usuario.username = validated_data['email']  # Usar email como username
            
            # Se o nome foi alterado, atualizar no usuário Django
            if 'nome' in validated_data:
                nome = validated_data['nome']
                instance.usuario.first_name = nome.split()[0] if nome else ''
                instance.usuario.last_name = ' '.join(nome.split()[1:]) if len(nome.split()) > 1 else ''
            
            instance.usuario.save()
        
        # Lidar com endereços separadamente (ManyToManyField)
        enderecos_data = validated_data.pop('endereco', None)
        
        # Atualizar outros campos do passageiro
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        
        # Atualizar endereços se fornecidos
        if enderecos_data is not None:
            instance.endereco.set(enderecos_data)
        
        return instance

class AdminSerializer(ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'