import express from 'express';
import cors from 'cors';
import {setupRoutes} from './routes/routes';
import {setupMQTTClient} from './mqttServer/mqttClient';

const app = express();
const port = 3001;
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


setupRoutes(app);
setupMQTTClient();

app.listen(port, () => {
    console.log(`-> Servidor rodando em http://localhost:${port}`);
});
