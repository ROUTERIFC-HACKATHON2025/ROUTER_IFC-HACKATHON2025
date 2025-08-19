from django.contrib import admin
from .models import Motorista, Veiculo, Empresa, Rotas, Endereco, Passageiro

@admin.register(Motorista)
class MotoristaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf', 'telefone', 'empresa')

@admin.register(Veiculo)
class VeiculoAdmin(admin.ModelAdmin):
    list_display = ('placa', 'marca', 'capacidade')
    filter_horizontal = ('motoristas', 'passageiros')  

@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cnpj', 'telefone')

@admin.register(Rotas)
class RotasAdmin(admin.ModelAdmin):
    list_display = ('idRotas', 'horarios', 'motorista', 'veiculos')

@admin.register(Endereco)
class EnderecoAdmin(admin.ModelAdmin):
    list_display = ('cidade', 'bairro', 'rua', 'numero')

@admin.register(Passageiro)
class PassageiroAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf', 'telefone')
    filter_horizontal = ('endereco',) 