import express, { Request, Response, NextFunction } from 'express';


export const getAll = async (req: Request, res: Response, next: NextFunction) => {

    // try {
    //     const pincode = req.params.pincode;

    //     const result = await Vendor.find({ pincode: pincode, serviceAvailable: true })
    //         .sort([['rating', 'descending']])
    //         .populate("foods");

    //     if (result.length > 0) {
    //         return res.status(200).json(result);
    //     }

    //     return res.status(400).json({ message: 'Data Not Found' });
    // } catch (error) {
    //     return next(new HttpException(404, "Error with Get Availability Food"));
    // }
    return res.status(200).json({ message: 'Hello Test' });

}