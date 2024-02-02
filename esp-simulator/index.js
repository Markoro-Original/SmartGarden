const mqtt = require('mqtt');
require('dotenv').config();

const brokerUrl = process.env.BROKER_URL;
const topicToSubscribe = process.env.TOPIC_TO_SUBSCRIBE;
const topicToPublish = process.env.TOPIC_TO_PUBLISH;


const client = mqtt.connect(brokerUrl);

// TODO: Enviar mudaças do esp somente quando houver mudanças significativas
client.on('connect', () => {
    console.log('Conectado ao broker MQTT');
    console.log(`Conectado ao broker MQTT: ${brokerUrl}`);
    console.log(`Tópico para se inscrever: ${topicToSubscribe}`);
    console.log(`Tópico para publicar: ${topicToPublish}`);

    // Inscreva-se no tópico para receber comandos
    client.subscribe(topicToSubscribe, (err) => {
        if (!err) {
            console.log(`Inscrito no tópico ${topicToSubscribe}`);
        } else {
            console.error(`Erro ao se inscrever no tópico ${topicToSubscribe}: ${err}`);
        }
    });

    // Envie mensagens periodicamente
    setInterval(() => {
        const message = {
            "mac": "00:11:22:33:44:55",
            "ssid": "wifi_ssid_mock",
            "data": new Date().toISOString(),
            "sensores": [
                {
                    "id": "sensor1",
                    "tipo": "temperatura",
                    "valor": getRandomValue(20, 40),
                    "unidade": "Celsius"
                },
                {
                    "id": "sensor2",
                    "tipo": "umidade",
                    "valor": getRandomValue(40, 60),
                    "unidade": "Percentual"
                },
                {
                    "id": "sensor3",
                    "tipo": "umidade_do_solo",
                    "valor": getRandomValue(30, 50),
                    "unidade": "Percentual"
                },
                {
                    "id": "sensor4",
                    "tipo": "temperatura",
                    "valor": getRandomValue(20, 40),
                    "unidade": "Celsius"
                },
                {
                    "id": "sensor5",
                    "tipo": "umidade",
                    "valor": getRandomValue(40, 60),
                    "unidade": "Percentual"
                },
                {
                    "id": "sensor6",
                    "tipo": "umidade_do_solo",
                    "valor": getRandomValue(30, 50),
                    "unidade": "Percentual"
                }
            ]
        };
        //Envia a mensagem para o broker MQTT
        client.publish(topicToPublish, JSON.stringify(message));
        console.log(`Mensagem publicada: ${JSON.stringify(message)}`);
    }, 5000); // Delay de 5 segundos
});

function getRandomValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}


client.on('message', (topic, message) => {
    console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`);
});

client.on('error', (err) => {
    console.error(`Erro de conexão: ${err}`);
});
