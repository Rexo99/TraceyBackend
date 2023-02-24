import jwt, {Secret, JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express';
require('jsonwebtoken');

export let secret: Secret = "default"
if (process.env.secret) {
    secret = process.env.secret
    console.log(secret + "-------------")
} else {
    throw new Error("WHATEVER environment variable is not set")
}

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, secret);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};