import {connection} from "../client";
import {NextFunction, Request, Response} from "express";

const getAllExpendituresByUser = async (req: Request, res: Response, next: NextFunction) => {
    let userId: string = req.params.userid;
    try {
        let response = await connection.expenditure.findMany({
            where: {
                category: {
                    user: {
                        id: parseInt(userId)
                    }
                }
            }
        })
        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(409).json({
            message: "User with Id: " + userId + " does not exists"
        });
    }
}
const getExpenditure = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id
    try {
        let response = await connection.expenditure.findUniqueOrThrow({
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

const createExpenditure = async (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.body.name;
    let amount: number = req.body.amount;
    let categoryId: number = req.body.categoryId;
    let dateTime: string = req.body.dateTime;
    try {
        let response = await connection.expenditure.create({
            data: {
                name: name,
                amount: amount,
                dateTime: dateTime,
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
            message: "Category with Id: " + categoryId + " does not exists"
        });
    }
}

const updateExpenditure = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let name: string = req.body.name;
    let amount: number = req.body.amount;
    let categoryId: number = req.body.categoryId;
    try {
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
            message: "Expenditure deleted successfully"
        });
    } catch (handleRequestError) {
        return res.status(404).json({
            message: "Expenditure does not exists"
        });
    }
}


export default {
    getExpenditure,
    createExpenditure,
    updateExpenditure,
    deleteExpenditure,
    getAllExpendituresByUser
};