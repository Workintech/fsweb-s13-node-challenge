const express = require("express");
const server = express();

server.use(express.json());

const projectsRouter = require("./projects/projects-router.js");
const actionsRouter = require("./actions/actions-router.js");

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

module.exports = server;
