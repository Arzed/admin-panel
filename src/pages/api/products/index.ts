import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "@/types";
import Product from "@/models/Product";
import mongoose from "mongoose";

type Data = { message: string } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      return res.status(400).json({
        message: "Endpoint not exist",
      });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  try {
    await mongooseConnect();
    const products = await Product.find()
    await mongoose.disconnect()
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Bad rquest: error on the server",
    });
  }
};