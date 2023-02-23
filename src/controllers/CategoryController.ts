import {connection} from "../client";
import {NextFunction, Request, Response} from 'express';

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    let response = await connection.category.findMany();
    return res.status(200).json({
        message: response
    });
}

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.params.name
    let response = await connection.category.findUnique({where: {name: name}});
    return res.status(200).json({
        message: response
    });
};

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.body.name;
    let budget: number = req.body.budget;
    try {
        let response = await connection.category.create({
            data:{
                name: name,
                budget: budget,
                expenditure: {}
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
    try{
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
    } catch (e){
        return res.status(404).json({
            message: "Category does not exists"
        });
    }
}

export default {getAllCategories,getCategory, createCategory, updateCategory, deleteCategory};