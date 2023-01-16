const express = require("express");
const { NoteModel } = require("../models/notemodel");
const noteRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

noteRouter.get("/", async (req, res) => {
  try {
    let query = req.query;
    let user = await NoteModel.find(query);
    res.send(user);
    console.log("here is your data");
  } catch (error) {
    console.log("somthing is wrong");
  }
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.send(note);
    console.log("created the note");
  } catch (error) {
    res.send(error);
    console.log("somthing is wrong");
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const note = await NoteModel.findOne({ _id: id });
  const noteuserId = note.userID;
  const userid_makingReq = req.body.userID;
  try {
    if (userid_makingReq !== noteuserId) {
      res.send("You are not authorized!");
    } else {
      const note = await NoteModel.findByIdAndUpdate({ _id: id }, payload);
      res.send(note);
      console.log("updated the note");
    }
  } catch (error) {
    res.send(error);
    console.log({ err: "somthing is wrong" });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await NoteModel.findByIdAndDelete({ _id: id });
    res.send(note);
    console.log("deleted the note");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = { noteRouter };
