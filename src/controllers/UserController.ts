import userServices from '../services/UserService';
import {getErrorMessage} from '../utils/errors';
import {Request, Response} from 'express';


const login = async (req: Request, res: Response) => {
    try {
        const foundUser = await userServices.login(req.body);
        res.status(200).send(foundUser.token);
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

const register = async (req: Request, res: Response) => {
    try {
        await userServices.register(req.body);
        res.status(200).send('Registration successful');
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};


export default {register, login};