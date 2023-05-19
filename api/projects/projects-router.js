// "project" routerını buraya yazın!
const express = require("express");
const projectsModel = require("./projects-model.js");
const mw = require("./projects-middleware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allProjects = await projectsModel.get();
    res.json(allProjects || []);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.validateProjectId, (req, res, next) => {
  try {
    res.json(req.currentProject);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.validateProjectPayload, async (req, res, next) => {
  try {
    let model = {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    };
    const inserted = await projectsModel.insert(model);
    res.status(201).json(inserted);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.validateProjectId,
  mw.validateProjectPayload,
  async (req, res, next) => {
    try {
      let model = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
      };
      const updated = await projectsModel.update(req.params.id, model);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.validateProjectId, async (req, res, next) => {
  try {
    await projectsModel.remove(req.params.id);
    res.json({ message: "Silme işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});
router.get("/:id/actions", mw.validateProjectId, async (req, res, next) => {
  try {
    const projectActions = await projectsModel.getProjectActions(req.params.id);
    res.json(projectActions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
