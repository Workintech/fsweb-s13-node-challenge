// projects ara yazılımları buraya
const projectModel = require("./projects-model");

const validateProjectId = async (req, res, next) => {
    try {
        const existProject = await projectModel.get(req.params.id);
        if (!existProject) {
            res.status(404).json({ message: "Project not found" });
        } else {
            req.existProject = existProject;
            next();
        }
    } catch (error) {
        next(error);
    }
};

const validateProjectPayload = (req, res, next) => {
    try {
        const { name, description } = req.body
        if(!name || !description) {
            res.status(400).json({message: "Check fields"})
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateProjectId,
    validateProjectPayload
}