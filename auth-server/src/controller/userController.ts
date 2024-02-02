import {Request, Response} from "express";
import {prisma} from "../database/prismaClient";
import jwt from "jsonwebtoken";

class UserController {
    static async signup(request: Request, response: Response) {
        const {name, email, password} = request.body;

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });

        return response.json(user);
    }

    static async login(request: Request, response: Response) {
        const {email, password} = request.body;

        const user = await prisma.user.findFirst({
            where: {
                email,
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
            },
        });

        if (!user) {
            return response.status(400).json({message: 'User not found'});
        }

        if (user.password !== password) {
            return response.status(400).json({message: 'Incorrect password'});
        }

        // User authenticated successfully, generate a JWT
        const token = jwt.sign({id: user.id}, 'garden', {expiresIn: '1h'});

        return response.json({user, token});
    }

    static async getAll(req: Request, res: Response) {
        const users = await prisma.user.findMany();
        return res.json(users);
    }
}

export {UserController};