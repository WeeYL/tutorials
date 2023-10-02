
import express from "express";
import { Cat } from "../models/catModel.js";
import * as mongooseHelper from '../../mongooseHelper.js'

const router = express.Router()

router.post("/", (req, res) => {
    try {
      mongooseHelper.saveDataToModel(Cat, { name: req.body.name });
      return res.status(201).send({ message: "Success. Data posted" });
    } catch (error) {
      return res.status(404).send({ message: error });
    }
  });
  
router.get("/", async (req, res) => {
    try {
      const result = await mongooseHelper.queryGetAll(Cat);
      return res.status(201).send({ message: result });
    } catch (error) {
      return res.status(404).send({ message: error });
    }
  });

router.delete("/:id", async (req, res) => {
    try {
      const result = await mongooseHelper.removeData(Cat, req.params.id);
      return res.status(201).send({ message: result });
    } catch (error) {
      return res.status(404).send({ message: error });
    }
  });
  

router.get("/hello", (req, res) => {
    res.send("hello cat world");
  });

export default router