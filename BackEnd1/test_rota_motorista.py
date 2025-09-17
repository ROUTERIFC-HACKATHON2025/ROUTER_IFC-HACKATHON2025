#!/usr/bin/env python3
import requests
import time

def testar_rota_motorista():
    base_url = "http://localhost:8000/api/motoristas/2/atualizar-localizacao/"
    
    print("=== TESTE DE ROTA DO MOTORISTA ===")
    print("1. Desativando rota do motorista...")
    
    # Desativar rota
    data_inativa = {
        "latitude": -26.392081,
        "longitude": -48.734213,
        "rota_ativa": False
    }
    
    response = requests.post(base_url, json=data_inativa)
    if response.status_code == 200:
        print("✅ Rota desativada com sucesso")
        print(f"   Resposta: {response.json()}")
    else:
        print(f"❌ Erro ao desativar rota: {response.status_code}")
    
    print("\n2. Aguardando 5 segundos...")
    time.sleep(5)
    
    print("\n3. Ativando rota do motorista...")
    
    # Ativar rota
    data_ativa = {
        "latitude": -26.392081,
        "longitude": -48.734213,
        "rota_ativa": True
    }
    
    response = requests.post(base_url, json=data_ativa)
    if response.status_code == 200:
        print("✅ Rota ativada com sucesso")
        print(f"   Resposta: {response.json()}")
    else:
        print(f"❌ Erro ao ativar rota: {response.status_code}")
    
    print("\n4. Aguardando 5 segundos...")
    time.sleep(5)
    
    print("\n5. Desativando rota novamente...")
    
    # Desativar rota novamente
    response = requests.post(base_url, json=data_inativa)
    if response.status_code == 200:
        print("✅ Rota desativada novamente")
        print(f"   Resposta: {response.json()}")
    else:
        print(f"❌ Erro ao desativar rota: {response.status_code}")
    
    print("\n=== TESTE CONCLUÍDO ===")
    print("Agora teste no frontend:")
    print("- Faça login como PASSAGEIRO")
    print("- Verifique se o marcador NÃO aparece quando rota_ativa = false")
    print("- Ative a rota do motorista e verifique se o marcador aparece")
    print("- Desative a rota e verifique se o marcador desaparece")

if __name__ == "__main__":
    testar_rota_motorista()

