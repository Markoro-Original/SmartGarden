import mqtt, {MqttClient} from 'mqtt';


export interface ISensor {
    id: string;
    tipo: string;
    valor: string;
}

export interface IMessage {
    mac: string;
    ssid: string;
    data: string;
    sensores: ISensor[];
}

export class MqttService {
    private client: MqttClient;
    private topicToSubscribe ='teste/1'

    constructor() {
        this.client = mqtt.connect("mqtt://localhost:1884")
        this.connect();
    }

    private connect() {
        this.client.on('connect', () => {
            console.log('Conectado ao broker MQTT');
            this.subscribe();
        });
    }

    subscribe(callback?: (message: IMessage) => void) {
        this.client.subscribe(this.topicToSubscribe, (err) => {
            if (err) {
                console.error(`Erro ao se inscrever no tópico ${this.topicToSubscribe}: ${err}`);
            } else {
                console.log(`Inscrito no tópico ${this.topicToSubscribe}`);
                if (callback) {
                    this.client.on('message', (topic: string, message: Buffer) => {
                        const parsedMessage: IMessage = JSON.parse(message.toString());
                        callback(parsedMessage);
                    });
                }
            }
        });
    }
}