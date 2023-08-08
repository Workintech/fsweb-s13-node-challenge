const express = require('express');
const server = express();
server.use(express.json()); // to support json requests
const actionsRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectRouter);

module.exports = server;
