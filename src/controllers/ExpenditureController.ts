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

    // If date is empty use current date
    if (!dateTime)
    {
        dateTime = new Date().toISOString();
    }

    try {
        // Check if category exist if not throw error
        let tempCategory = await connection.category.findFirst({
            where: {id: categoryId}
        });

        if (!tempCategory)
        {
            return res.status(409).json({
                message: "Category with Id: " + categoryId + " does not exists"
            });
        }

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
            message: "error"
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

const testUpload = async (req: Request, res: Response, next: NextFunction) => {
    console.log("File" + req.file);
    let image: Buffer = req.file!.buffer;
    let hash: string = req.body.hash;

    console.log(image + "------" + hash)
    try {
        let response = await connection.image.create({
            data: {
                imageBytes: image,
                hash: parseInt(hash)
            }
        })
        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(403).json({
            message: "failed"
        });
    }
}

export default {
    getExpenditure,
    createExpenditure,
    updateExpenditure,
    deleteExpenditure,
    getAllExpendituresByUser,
    testUpload
};