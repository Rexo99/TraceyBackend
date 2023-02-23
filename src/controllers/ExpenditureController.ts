import {connection} from "../client";
import {NextFunction, Request, Response} from "express";

const getAllExpenditures = async (req: Request, res: Response, next: NextFunction) => {
    let response = await connection.expenditure.findMany();
    return res.status(200).json({
        message: response
    });
}
const getExpenditure = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id
    let response = await connection.expenditure.findUnique({
        where: {
            id: parseInt(id)
        }
    })
}

const createExpenditure = async (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.body.name;
    let amount: number = req.body.amount;
    let categoryId: number = req.body.categoryId;
    try {
        let response = await connection.expenditure.create({
            data:{
                name: name,
                amount: amount,
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })

        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(409).json({
            message: "Category with Id:" + categoryId + "does not exists"
        });
    }
}

const updateExpenditure = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let name: string = req.body.name;
    let amount: number = req.body.amount;
    let categoryId: number = req.body.categoryId;
    try{
        let response = await connection.expenditure.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                amount: amount,
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })
        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(404).json({
            message: "Expenditure does not exists"
        });
    }
}

const deleteExpenditure = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    try {
        let response = await connection.expenditure.delete({
            where: {
                id: parseInt(id)
            }
        })
        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(404).json({
            message: "Expenditure does not exists"
        });
    }
}

export default {getExpenditure, createExpenditure, updateExpenditure, deleteExpenditure, getAllExpenditures};