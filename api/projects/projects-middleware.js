// projects ara yazılımları buraya

const projectsModel = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const isExistProject = await projectsModel.get(req.params.id);
    if (!isExistProject) {
      res.status(404).json({ message: "Proje mevcut değil." });
    } else {
      req.currentProject = isExistProject;
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateProjectPayload(req, res, next) {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({ message: "alanları kontrol ediniz." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateProjectId,
  validateProjectPayload,
};
