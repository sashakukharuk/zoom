import {Response} from "express";

export const errorHandler = (res: Response, error: Error) => {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    });
};
