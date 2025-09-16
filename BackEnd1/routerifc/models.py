from django.db import models
from django.contrib.auth.models import User  

class Empresa(models.Model):
   idEmpresa = models.AutoField(primary_key=True)
   nome = models.CharField(max_length=30)
   cnpj = models.IntegerField()
   email = models.CharField(max_length=40)
   telefone = models.IntegerField()
  


   def __str__(self):
       return self.nome


class Motorista(models.Model):
   idMotorista = models.AutoField(primary_key=True)
   cpf = models.IntegerField()
   nome = models.CharField(max_length=30)
   telefone = models.IntegerField()
   email = models.CharField(max_length=50, unique=True)
   senha = models.CharField(max_length=45)
   codigoCnh = models.CharField(max_length=45)
   empresa = models.ForeignKey(Empresa, on_delete=models.PROTECT, null=True, blank=True)
   usuario = models.OneToOneField(User, on_delete=models.PROTECT, null=True, blank=True, related_name='motorista')
   latitude_atual = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
   longitude_atual = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
   rota_ativa = models.BooleanField(default=False)
   atualizado_em = models.DateTimeField(null=True, blank=True)

  
   def __str__(self):
       return self.nome


class Veiculo(models.Model):
   idCarro = models.AutoField(primary_key=True)
   placa = models.CharField(max_length=10, unique=True)
   marca = models.CharField(max_length=30)
   capacidade = models.IntegerField()
   modelo = models.CharField(max_length=45)
   motoristas = models.ManyToManyField('Motorista', related_name='veiculos')
   passageiros = models.ManyToManyField('Passageiro', related_name='veiculos', null=True, blank=True)


   def __str__(self):
       return self.placa


class Rotas(models.Model):
   idRotas = models.AutoField(primary_key=True) 
   horarios = models.TimeField()
   motorista = models.ForeignKey(Motorista, on_delete=models.PROTECT, related_name='rotas')
   veiculos = models.ForeignKey(Veiculo, on_delete=models.PROTECT, related_name='rotas')


   def __str__(self):
       return self.horarios.strftime("%H:%M")


class Endereco(models.Model):
   idEndereco = models.AutoField(primary_key=True) 
   cidade = models.CharField(max_length=30)
   bairro = models.CharField(max_length=30)
   rua = models.CharField(max_length=30)
   numero = models.IntegerField()
   cep = models.IntegerField(default="0000000000")
   rotas = models.ForeignKey(Rotas, on_delete=models.PROTECT, related_name='endereco')


   def __str__(self):
        return f"{self.cidade} - {self.bairro} - {self.rua}, {self.numero}"


class Passageiro(models.Model):
   idPassageiros =  models.AutoField(primary_key=True)
   email = models.CharField(max_length=50, unique=True)
   senha = models.CharField(max_length=45)
   nome = models.CharField(max_length=30)
   dataNascimento = models.DateField()
   cpf = models.IntegerField()
   telefone = models.IntegerField()
   nomeResponsavel = models.CharField(max_length=30)
   cpfResponsavel = models.IntegerField()
   telefoneResponsavel = models.IntegerField()
   endereco = models.ManyToManyField('Endereco', related_name='passageiros', blank=True, null=True)
   usuario = models.OneToOneField(User, on_delete=models.PROTECT, null=True, blank=True, related_name='passageiro')


   def __str__(self):
       return self.nome

class Admin(models.Model):
   idAdmin = models.AutoField(primary_key=True)
   nome = models.CharField(max_length=30)
   email = models.CharField(max_length=50, unique=True)
   senha = models.CharField(max_length=45)
   usuario = models.OneToOneField(User, on_delete=models.PROTECT, null=True, blank=True, related_name='admin')


   def __str__(self):
       return self.nome



