import {connection} from "../client";
import {User} from "@prisma/client";
import bcryptjs from "bcryptjs"
async function register(user: User) {
    const saltRounds = 8
    const newPassword = await bcryptjs.hash(user.password, saltRounds);
    try {
        await connection.user.create({
            data: {
                name: user.name,
                password: newPassword,
                category: {}
            }});
    } catch (error) {
        throw error;
    }
}

async function login(user: User){
    try {
        const foundUser = await connection.user.findUnique({where: {name: user.name}});
        if (!foundUser) {
            throw new Error('Name of user is not correct');
        }
        const isMatch = bcryptjs.compareSync(user.password, foundUser.password);
        if (isMatch) {
            return foundUser
        } else {
            throw new Error('Password is not correct');
        }
    } catch (error) {
        throw error;
    }
}

export default { register, login };