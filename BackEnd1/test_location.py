#!/usr/bin/env python3
import requests
import time
import random

# Simular localização do motorista
def simular_localizacao():
    base_url = "http://localhost:8000/api/motoristas/2/atualizar-localizacao/"
    
    # Coordenadas base (Blumenau)
    lat_base = -26.392081
    lng_base = -48.734213
    
    print("Iniciando simulação de localização do motorista...")
    
    for i in range(10):  # Simular 10 atualizações
        # Adicionar pequenas variações para simular movimento
        lat = lat_base + random.uniform(-0.001, 0.001)
        lng = lng_base + random.uniform(-0.001, 0.001)
        
        data = {
            "latitude": lat,
            "longitude": lng,
            "rota_ativa": True
        }
        
        try:
            response = requests.post(base_url, json=data)
            if response.status_code == 200:
                print(f"Atualização {i+1}: Lat={lat:.6f}, Lng={lng:.6f}")
            else:
                print(f"Erro na atualização {i+1}: {response.status_code}")
        except Exception as e:
            print(f"Erro na requisição {i+1}: {e}")
        
        time.sleep(2)  # Aguardar 2 segundos entre atualizações
    
    print("Simulação concluída!")

if __name__ == "__main__":
    simular_localizacao()

