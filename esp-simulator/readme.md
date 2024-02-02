# ESP Simulador

Simuala um ESP32 enviando dados de umidade, temperatura, umidade do solo e luz para um broker MQTT.

## Pré-requisitos

- Node.js
- Broker MQTT

## Como executar

1. Abri o terminal na pasta do projeto
2. Executar o comando `npm install`
3. Executar o comando `npm run build`
3. Executar o comando `npm start`

O auth-simulator ira iniciar na porta 3001 e o sensor-simulator na porta 3002.

### Mqtt Mosquitto WSL

```sh
sudo apt-get update
```

```sh
sudo apt-get upgrade
``` 

```sh
sudo apt-get install mosquitto
```

```sh
sudo apt-get install mosquitto-clients
```

    Edite o arquivo /etc/mosquitto/mosquitto.conf e adicione as duas linhas abaixo ao final do arquivo:

    allow_anonymous true
    listener 1883 0.0.0.0

    Em seguida, inicie o servidor Mosquitto executando o comando:
    mosquitto.