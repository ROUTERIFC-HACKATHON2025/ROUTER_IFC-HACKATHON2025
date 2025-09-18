from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from routerifc.models import Passageiro, Motorista


class Command(BaseCommand):
    help = 'Cria usuários Django para passageiros e motoristas existentes que não possuem usuário associado'

    def handle(self, *args, **options):
        # Migrar passageiros
        passageiros_sem_usuario = Passageiro.objects.filter(usuario__isnull=True)
        self.stdout.write(f'Encontrados {passageiros_sem_usuario.count()} passageiros sem usuário Django')
        
        for passageiro in passageiros_sem_usuario:
            try:
                # Verificar se já existe um usuário com este email
                if User.objects.filter(email=passageiro.email).exists():
                    self.stdout.write(
                        self.style.WARNING(f'Usuário com email {passageiro.email} já existe. Pulando...')
                    )
                    continue
                
                # Criar usuário Django
                username = passageiro.email
                user = User.objects.create_user(
                    username=username,
                    email=passageiro.email,
                    password=passageiro.senha,
                    first_name=passageiro.nome.split()[0] if passageiro.nome else '',
                    last_name=' '.join(passageiro.nome.split()[1:]) if len(passageiro.nome.split()) > 1 else ''
                )
                
                # Associar usuário ao passageiro
                passageiro.usuario = user
                passageiro.save()
                
                self.stdout.write(
                    self.style.SUCCESS(f'Usuário criado para passageiro: {passageiro.nome} ({passageiro.email})')
                )
                
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Erro ao criar usuário para passageiro {passageiro.nome}: {str(e)}')
                )
        
        # Migrar motoristas
        motoristas_sem_usuario = Motorista.objects.filter(usuario__isnull=True)
        self.stdout.write(f'Encontrados {motoristas_sem_usuario.count()} motoristas sem usuário Django')
        
        for motorista in motoristas_sem_usuario:
            try:
                # Verificar se já existe um usuário com este email
                if User.objects.filter(email=motorista.email).exists():
                    self.stdout.write(
                        self.style.WARNING(f'Usuário com email {motorista.email} já existe. Pulando...')
                    )
                    continue
                
                # Criar usuário Django
                username = motorista.email
                user = User.objects.create_user(
                    username=username,
                    email=motorista.email,
                    password=motorista.senha,
                    first_name=motorista.nome.split()[0] if motorista.nome else '',
                    last_name=' '.join(motorista.nome.split()[1:]) if len(motorista.nome.split()) > 1 else ''
                )
                
                # Associar usuário ao motorista
                motorista.usuario = user
                motorista.save()
                
                self.stdout.write(
                    self.style.SUCCESS(f'Usuário criado para motorista: {motorista.nome} ({motorista.email})')
                )
                
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Erro ao criar usuário para motorista {motorista.nome}: {str(e)}')
                )
        
        self.stdout.write(
            self.style.SUCCESS('Migração concluída! Todos os passageiros e motoristas agora podem fazer login.')
        )

