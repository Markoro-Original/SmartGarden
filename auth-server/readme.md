# Smart Garden Mock

Os seguintes programas foram desenvolvidos para simular o ambiente de produção o Smart Garden.

## Pré-requisitos

- Node.js
- Broker MQTT

## Como executar

1. Abrir o terminal na pasta do projeto
2. Executar o comando `npm install`
3. Executar o comando `npx prisma migrate dev`
3. Executar o comando `npm start`

### Primeira execução

    Somente se não tiver o dev.db na pasta database, executar o comando `npx prisma migrate dev` para criar o banco de dados.

1. Executar o comando `npm run build`
2. Executar o comando `npx migrate up`
3. Executar o comando `npx migrate seed`
4. Executar o comando `npm start`

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
