// "project" routerını buraya yazın!
const router = require("express").Router();
const projectModel = require("./projects-model");
const mw = require("./projects-middleware");

router.get("/", async (req, res, next) => {
    try {
        const allProjects = await projectModel.get();
        res.json(allProjects);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", mw.validateProjectId, async (req, res, next) => {
    try {
        res.json(req.existProject);
    } catch (error) {
        next(error);
    }
});

router.post("/", mw.validateProjectPayload, async (req, res, next) => {
    try {
        let projectBody = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        }
        const insertedProject = await projectModel.insert(projectBody);
        res.status(201).json(insertedProject);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", mw.validateProjectId, mw.validateProjectPayload, async (req, res, next) => {
    try {
        let projectBody = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        }
        const updatedProject = await projectModel.update(req.params.id, projectBody);
        res.json(updatedProject);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", mw.validateProjectId, async (req, res, next) => {
    try {
        await projectModel.remove(req.params.id);
        res.json({message: "Successfully deleted"})
    } catch (error) {
        next(error);
    }
});

router.get("/:id/actions", mw.validateProjectId, async (req, res, next) => {
    try {
        let projectActions = await projectModel.getProjectActions(req.params.id);
        res.json(projectActions);
    } catch (error) {
        next(error);
    }
});

module.exports = router;