import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { IProduct } from "@/types";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
// import { isAdminRequest } from "./auth/[...nextauth]";

type Data = | { message: string } | IProduct[] | IProduct

export default async function handle(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {method} = req;
    // await isAdminRequest(req, res);
    // const {title, price, description, images} = req.body
    
    if (method === 'POST') {
      try {
        await mongooseConnect();
        const product = new Product(req.body);
        await product.save()
        await mongoose.disconnect()
        
        res.status(201).json(product)
      } catch (error) {
        console.log(error);
        await mongoose.disconnect();
        res.status(400).json({message: 'Something Error try this later'})
      }
    }

    if (method === 'PUT') {
      const { _id, title, price, description, images} = req.body as IProduct
      try {
        await mongooseConnect();
        await Product.updateOne({_id}, {title, price, description, images})
        await mongoose.disconnect();

        res.status(201).json(req.body)
      } catch (error) {
        console.log(error)
        await mongoose.disconnect();
        res.status(400).json({message: `Can't find product with the specified id`})
      }
    }

    if (method === "DELETE") {
      const {id} = req.query
      try {
        await mongooseConnect();
        await Product.deleteOne({_id: id})
        await mongoose.disconnect();

        res.status(201).json({message: 'Product deleted'})
      } catch (error) {
        console.log(error);
        await mongoose.disconnect();
        res.status(400).json({message: `Can't find product with the specified id`})
      }
    }
}