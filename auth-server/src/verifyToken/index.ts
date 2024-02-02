import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // if there isn't any token
    }

    jwt.verify(token, 'garden', (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.body.user = user;

        next(); // pass the execution off to whatever request the client intended
    });
}