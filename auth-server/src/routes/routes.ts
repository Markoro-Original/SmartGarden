import {Express} from 'express';
import {UserController} from '../controller/userController';
import {verifyToken} from "../verifyToken";
import {GardenController} from "../controller/gardenController";

export function setupRoutes(app: Express) {

    app.post('/signup', UserController.signup);
    app.post('/login', UserController.login);
    app.get('/users', verifyToken, UserController.getAll);

    app.post('/garden', verifyToken, GardenController.createGarden);
    app.get('/gardens', verifyToken, GardenController.getGardensByUserId);
    app.get('/gardens/:id', verifyToken, GardenController.getGardenById);

    app.get('/simulations/:gardenId', GardenController.getSimulationsByGardenId);
    app.post('/simulation', GardenController.createSimulation);

}