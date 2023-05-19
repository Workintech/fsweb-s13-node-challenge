// "project" routerını buraya yazın!
const express = require("express");
const projectsModel = require("./projects-model.js");
const mw = require("./projects-middleware.js");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  try {
    const projects = projectsModel.get();
    res.status(200).json(projects || []);
  } catch (err) {
    res.status(500).json({ message: "Failed to get projects" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await projectsModel.get(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to get projects" });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = await projectsModel.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to create new project" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const project = await projectsModel.update(req.params.id, req.body);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to update project" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await projectsModel.remove(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project" });
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const actions = await projectsModel.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: "Failed to get actions" });
  }
});

module.exports = router;
