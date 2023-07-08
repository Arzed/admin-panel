import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/mongoose";
import { IProduct } from "@/types";
import Product from "@/models/Product";
import mongoose from "mongoose";

type Data =
  | {
      message: string;
    }
  | IProduct;

export default function handlers(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductById(req, res);

    default:
      return res.status(404).json({
        message: "EndPoint not exist",
      });
  }
}

const getProductById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;
  try {
    await mongooseConnect();
    const product = await Product.findOne({ _id: id });
    await mongoose.disconnect()
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Bad Request: Error on the server",
    });
  }
};