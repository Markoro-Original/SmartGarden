import mqtt from 'mqtt';


const brokerUrl = process.env.BROKER_URL;
const topicToSubscribe = process.env.TOPIC_TO_SUBSCRIBE;
const topicToPublish = process.env.TOPIC_TO_PUBLISH;

export function setupMQTTClient() {
    const client = mqtt.connect(brokerUrl);
    console.log(`==> Conectando ao broker MQTT em ${brokerUrl}`);
    client.on('connect', () => {
        console.log('Conectado ao broker MQTT');
        client.subscribe(topicToSubscribe, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${topicToSubscribe}`);
            } else {
                console.error(`Erro ao se inscrever no tópico ${topicToSubscribe}: ${err}`);
            }
        });
    });

    client.on('message', (topic, message) => {
        console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`);
        // TODO: Tratar mensagem recebida salvando no banco de dados
    });
}