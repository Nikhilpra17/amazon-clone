import mongoose from "mongoose";
import Product from "../models/product.js";
import Products from "./data.js";

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/amazon-clone");

    await Product.deleteMany();
    console.log("Product are deleted");

    await Product.insertMany(Products);
    console.log("Product are inserted");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
