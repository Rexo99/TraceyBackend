import {connection} from "../client";
import {NextFunction, Request, Response} from 'express';

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.params.name
    let response = await connection.category.findUnique({where: {name: name}});
    return res.status(200).json({
        message: response
    });
};
const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.body.name;
    let budget = req.body.budget;
    try{
        let response = await connection.category.create({
                data: {
                    name: name,
                    budget: budget,
                    spendings: {}
                }
            }
        )
        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError){
        return res.status(400).json({
            message: "Category Already exists"
        });
    }


}

export default {getCategory,createCategory};