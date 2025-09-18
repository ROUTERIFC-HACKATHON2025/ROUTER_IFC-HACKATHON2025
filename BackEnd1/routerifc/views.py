from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Empresa, Motorista, Veiculo, Rotas, Endereco, Passageiro
from .serializers import EmpresaSerializer, MotoristaSerializer, VeiculoSerializer, RotasSerializer, EnderecoSerializer, PassageiroSerializer, AdminSerializer

class EmpresaViewSet(ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class MotoristaViewSet(ModelViewSet):
    queryset = Motorista.objects.all()
    serializer_class = MotoristaSerializer

    @action(detail=True, methods=['post'], url_path='atualizar-localizacao')
    def atualizar_localizacao(self, request, pk=None):
        try:
            motorista = self.get_object()
        except Motorista.DoesNotExist:
            return Response({"detail": "Motorista não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        rota_ativa_raw = request.data.get('rota_ativa')
        rota_ativa = None
        if rota_ativa_raw is not None:
            if isinstance(rota_ativa_raw, bool):
                rota_ativa = rota_ativa_raw
            elif isinstance(rota_ativa_raw, (int, float)):
                rota_ativa = bool(rota_ativa_raw)
            elif isinstance(rota_ativa_raw, str):
                rota_ativa = rota_ativa_raw.strip().lower() in ("true", "1", "yes", "y", "on")

        # permitir finalizar rota sem coordenadas (rota_ativa false)
        if (latitude is None or longitude is None) and str(rota_ativa).lower() not in ("false", "0", "none"):
            return Response({"detail": "latitude e longitude são obrigatórios"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if latitude is not None and longitude is not None:
                motorista.latitude_atual = latitude
                motorista.longitude_atual = longitude
            if rota_ativa is not None:
                motorista.rota_ativa = rota_ativa
            motorista.atualizado_em = timezone.now()
            motorista.save(update_fields=['latitude_atual', 'longitude_atual', 'rota_ativa', 'atualizado_em'])
        except Exception as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "idMotorista": motorista.idMotorista,
            "latitude": float(motorista.latitude_atual) if motorista.latitude_atual is not None else None,
            "longitude": float(motorista.longitude_atual) if motorista.longitude_atual is not None else None,
            "rota_ativa": motorista.rota_ativa,
            "atualizado_em": motorista.atualizado_em,
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='localizacao-atual')
    def localizacao_atual(self, request, pk=None):
        try:
            motorista = self.get_object()
        except Motorista.DoesNotExist:
            return Response({"detail": "Motorista não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "idMotorista": motorista.idMotorista,
            "latitude": float(motorista.latitude_atual) if motorista.latitude_atual is not None else None,
            "longitude": float(motorista.longitude_atual) if motorista.longitude_atual is not None else None,
            "rota_ativa": motorista.rota_ativa,
            "atualizado_em": motorista.atualizado_em,
        }, status=status.HTTP_200_OK)

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
        if user.is_superuser:
            admin = True
        if hasattr(user, 'passageiro'):
            passageiro = True
        if hasattr(user, 'motorista'):
            motorista = True
        
        return Response({
            'username': user.username,
            'email': user.email,
            'is_passageiro': passageiro,
            'is_motorista': motorista,
            'is_admin': admin
        }, status=200)


class EmailOrUsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token

    def validate(self, attrs):
        username_or_email = attrs.get('username')
        password = attrs.get('password')

        if username_or_email and '@' in username_or_email:
            # Try email
            try:
                user = User.objects.get(email__iexact=username_or_email)
                username = user.username
            except User.DoesNotExist:
                username = username_or_email  # fallback
        else:
            username = username_or_email

        data = {}
        user = authenticate(username=username, password=password)
        if user is None:
            # As a fallback, try authenticating by email directly if username lookup failed
            try:
                user_obj = User.objects.get(email__iexact=username_or_email)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                user = None

        if user is None:
            raise self.fail('no_active_account')

        refresh = self.get_token(user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        return data


class EmailOrUsernameTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailOrUsernameTokenObtainPairSerializer


@api_view(['POST'])
def password_reset_request(request):
    email = request.data.get('email')
    if not email:
        return Response({"detail": "Email é obrigatório"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"detail": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    # Generate token
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    # In a real app, send email with uid and token
    # For now, return them in response for testing
    return Response({
        "message": "Token gerado. Use o uid e token para redefinir a senha.",
        "uid": uid,
        "token": token
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def password_reset_confirm(request):
    uidb64 = request.data.get('uid')
    token = request.data.get('token')
    password = request.data.get('password')

    if not uidb64 or not token or not password:
        return Response({"detail": "uid, token e password são obrigatórios"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({"detail": "Token inválido"}, status=status.HTTP_400_BAD_REQUEST)

    if not default_token_generator.check_token(user, token):
        return Response({"detail": "Token inválido"}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(password)
    user.save()
    return Response({"message": "Senha alterada com sucesso"}, status=status.HTTP_200_OK)
