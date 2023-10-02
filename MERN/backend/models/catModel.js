import mongoose from "mongoose";
import * as  mongooseHelper from "../../mongooseHelper.js";

const catSchema = mongooseHelper.createSchema(mongoose, {
  name: String,
});

export const Cat = mongooseHelper.createModel(mongoose, "Cat", catSchema);
