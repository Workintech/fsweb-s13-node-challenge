// projects ara yazılımları buraya
const Projects = require("./projects-model");

function logger(req, res, next) {
  //console.log(req);
  console.log(
    `${req.method} --- ${req.originalUrl}   ---- ${new Date().toLocaleString()}`
  );
  next();
}

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.status(404).json({ message: "not found" });
    } else {
      req.project = project; //req project diye değişken oluşturduk ve projectleri atadık
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "İşlem yapılamadı" });
  }
}

function validateProject(req, res, next) {
  const { name, description, completed } = req.body;
  if (
    !name ||
    !description ||
    completed == undefined /*typeof(completed) != "boolean"*/
  ) {
    res.status(400).json({ message: "gerekli alanlar eksik" });
  } else {
    // req.name = name;
    // req.description = description;
    //req.completed = completed;
    req.project = {
      name: name,
      description: description,
      completed: completed,
    };
    next();
  }
}
module.exports = {
  logger,
  validateProjectId,
  validateProject,
};
