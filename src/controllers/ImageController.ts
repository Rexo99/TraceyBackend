import {connection} from "../client";
import {NextFunction, Request, Response} from "express";

const createImage = async (req: Request, res: Response, next: NextFunction) => {
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
            message: response.id
        });
    } catch (handleRequestError) {
        return res.status(403).json({
            message: "failed"
        });
    }
}

const getImageById = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id
    try {
        let response = await connection.image.findUniqueOrThrow({
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

export default {
    createImage,
    getImageById
};