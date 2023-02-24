// "eylem" routerını buraya yazın
const express = require("express");

const Actions = require("./actions-model");
const mw = require("./actions-middlware");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  Actions.get(req.params.id)
    .then((actions) => {
      res.json(actions);
    })
    .catch((err) => {
      res.json([]);
    });
});

router.get("/:id", mw.validateActionId, (req, res, next) => {
  res.json(req.actions);
});

router.post("/", mw.validateAction, async (req, res, next) => {
  try {
    let actions = req.actions;
    let createdAction = await Actions.insert(actions);
    res.status(201).json(createdAction);
  } catch (error) {
    next(error);
  }
});

//eksik
router.put(
  "/:id",
  mw.validateActionId,
  mw.validateAction,
  async (req, res, next) => {
    try {
      await Actions.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: true,
      });
      let updated = await Actions.get(req.params.id);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.json(req.actions);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res) => {
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu",
    message: err.message,
  });
});
module.exports = router;
