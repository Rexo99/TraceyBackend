import {connection} from "../client";
import {User} from "@prisma/client";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import {secret} from "../middleware/auth";

async function register(user: User) {
    const saltRounds = 8
    const newPassword = await bcryptjs.hash(user.password, saltRounds);
    try {
        await connection.user.create({
            data: {
                name: user.name,
                password: newPassword,
                category: {}
            }
        });
    } catch (error) {
        throw error;
    }
}

async function login(user: User) {
    let expiration: number = 60*60 //1hour
    try {
        const foundUser = await connection.user.findUnique({where: {name: user.name}});
        if (!foundUser) {
            throw new Error('Name of user is not correct');
        }
        const isMatch = bcryptjs.compareSync(user.password, foundUser.password);
        if (isMatch) {
            const token = jwt.sign({
                id: foundUser.id?.toString(),
                name: foundUser.name,
            }, secret, {expiresIn: expiration});
            return {user: {id: foundUser.id, name: foundUser.name}, token: token};
        } else {
            throw new Error('Password is not correct');
        }
    } catch (error) {
        throw error;
    }
}

export default {register, login};