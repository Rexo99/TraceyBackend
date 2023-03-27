import {connection} from "../client";
import {NextFunction, Request, response, Response} from 'express';

const getAllCategoriesByUser = async (req: Request, res: Response, next: NextFunction) => {
    let userId: string = req.params.userid;

    try {
        let response = await connection.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        }).category();
        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(404).json({
            message: "User does not exists"
        });
    }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    try {
        let response = await connection.category.findUnique({
            where: {
                id: parseInt(id)
            },
        });
        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(404).json({
            message: "Category does not exists"
        });
    }
};

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.body.name;
    let budget: number = req.body.budget;
    let userId: string = req.params.userid;
    try {
        let response = await connection.category.create({
            data: {
                name: name,
                budget: budget,
                expenditure: {},
                user_id: parseInt(userId)
            }
        })


        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(409).json({
            message: "Category already exists"
        });
    }
}

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let name: string = req.body.name;
    let budget: number = req.body.budget;
    try {
        let response = await connection.category.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                budget: budget
            }
        })
        return res.status(200).json({
            message: response
        });
    } catch (handleRequestError) {
        return res.status(404).json({
            message: "Category does not exists"
        });
    }
}

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    try {
        let response = await connection.category.delete({
            where: {
                id: parseInt(id)
            }
        })
        return res.status(200).json({
            message: "Category deleted successfully"
        });
    } catch (e) {
        return res.status(404).json({
            message: "Category does not exists"
        });
    }
}

const getAllExpendituresByCategory = async (req: Request, res: Response, next: NextFunction) => {
    //Todo dont reply
    let categoryId: string = req.params.id;
    try {
        // find all expenditures by categoryId
        console.log("moin");
        let response = await connection.expenditure.findMany({
            where: {
                categoryId: parseInt(categoryId)
            }
        });

        return response;
    } catch (e) {
        return res.status(404).json({
            message: "Category does not exists"
        });
    }
}

export default {
    getAllCategoriesByUser,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllExpendituresByCategory
};