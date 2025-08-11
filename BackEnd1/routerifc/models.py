from django.db import models

class Empresa(models.Model):
    idEmpresa = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=30)
    cnpj = models.CharField(max_length=14, unique=True)
    email = models.CharField(max_length=40)
    telefone = models.CharField(max_length=20)
    

    def __str__(self):
        return self.nome

class Motorista(models.Model):
    idMotorista = models.AutoField(primary_key=True)
    cpf = models.CharField(max_length=14, unique=True)
    login = models.CharField(max_length=40)
    nome = models.CharField(max_length=30)
    telefone = models.CharField(max_length=20)
    dataEntrada = models.DateField()
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, null=True, blank=True)  

    
    def __str__(self):
        return self.nome

class Veiculo(models.Model):
    idCarro = models.AutoField(primary_key=True) 
    placa = models.CharField(max_length=10, unique=True) 
    marca = models.CharField(max_length=30)
    capacidade = models.IntegerField()
    motoristas = models.ManyToManyField('Motorista', related_name='veiculos')
    passageiros = models.ManyToManyField('Passageiro', related_name='veiculos')

    def __str__(self):
        return self.placa

class Rotas(models.Model):
    idRotas = models.AutoField(primary_key=True)  
    horarios = models.TimeField() 
    motorista = models.ForeignKey(Motorista, on_delete=models.CASCADE, related_name='rotas')
    veiculos = models.ForeignKey(Veiculo, on_delete=models.CASCADE, related_name='rotas')

    def __str__(self):
        return self.horarios.strftime("%H:%M")

class Endereco(models.Model):
    idEndereco = models.AutoField(primary_key=True)  
    cidade = models.CharField(max_length=30)
    bairro = models.CharField(max_length=30)
    rua = models.CharField(max_length=30)
    numero = models.IntegerField()
    complemento = models.TextField(null=True, blank=True)
    rotas = models.ForeignKey(Rotas, on_delete=models.CASCADE, related_name='endereco')

    def __str__(self):
         return f"{self.cidade} - {self.bairro} - {self.rua}, {self.numero}"

class Passageiro(models.Model):
    idPassageiros =  models.AutoField(primary_key=True)
    login = models.CharField(max_length=40)
    nome = models.CharField(max_length=30)
    dataEntrada = models.DateField()
    cpf = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=20)
    endereco = models.ManyToManyField('Endereco', related_name='passageiros')

    def __str__(self):
        return self.nome




