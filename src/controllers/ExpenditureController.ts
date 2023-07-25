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
    let imageId: number | null = req.body.imageId; // Make imageId nullable


    // If date is empty use the current date
    if (!dateTime) {
        dateTime = new Date().toISOString();
    }
    try {
        // Check if the category exists; if not, throw an error
        let tempCategory = await connection.category.findFirst({
            where: { id: categoryId }
        });

        if (!tempCategory) {
            return res.status(409).json({
                message: "Category with Id: " + categoryId + " does not exist"
            });
        }

        // Create the Expenditure record with optional image connection
        let data: any = {
            name: name,
            amount: amount,
            dateTime: dateTime,
            category: {
                connect: {
                    id: categoryId
                }
            }
        };

        // Add the image connection only if imageId is not null
        if (imageId !== null) {
            data.image = {
                connect: {
                    id: imageId
                }
            };
        }

        let response = await connection.expenditure.create({
            data: data
        });

        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(409).json({
            message: "Error creating expenditure: " + handleRequestError
        });
    }
};


const updateExpenditure = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let name: string = req.body.name;
    let amount: number = req.body.amount;
    let categoryId: number = req.body.categoryId;
    let imageId: number | null = req.body.imageId; // Make imageId nullable

    try {
        // Check if the category exists; if not, throw an error
        let tempCategory = await connection.category.findFirst({
            where: { id: categoryId }
        });

        if (!tempCategory) {
            return res.status(409).json({
                message: "Category with Id: " + categoryId + " does not exist"
            });
        }

        // Update the Expenditure record with optional image connection
        let data: any = {
            name: name,
            amount: amount,
            category: {
                connect: {
                    id: categoryId
                }
            }
        };

        // Add the image connection only if imageId is not null
        if (imageId !== null) {
            data.image = {
                connect: {
                    id: imageId
                }
            };
        }

        let response = await connection.expenditure.update({
            where: {
                id: parseInt(id)
            },
            data: data
        });

        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(404).json({
            message: "Expenditure does not exist"
        });
    }
};


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