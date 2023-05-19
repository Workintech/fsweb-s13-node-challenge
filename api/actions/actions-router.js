// "eylem" routerını buraya yazın
const express = require("express");
const actionsRouter = express.Router();
const actionsModel = require("./actions-model.js");

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const actions = await actionsModel.get();
    res.status(200).json(actions || []);
  } catch (err) {
    res.status(500).json({ message: "Failed to get actions" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const action = await actionsModel.get(req.params.id);
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({ message: "Failed to get actions" });
  }
});

router.post("/", async (req, res) => {
  try {
    const action = await actionsModel.insert(req.body);
    res.status(201).json(action);
  } catch (err) {
    res.status(500).json({ message: "Failed to create new action" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const action = await actionsModel.update(req.params.id, req.body);
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({ message: "Failed to update action" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const action = await actionsModel.remove(req.params.id);
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete action" });
  }
});

module.exports = actionsRouter;
