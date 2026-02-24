const { Router } = require("express");
const { insertMessage, renderNew } = require("../controllers/newController");

const newRouter = Router();

// routes for rendering the form page and handling form submission for creating a new message
newRouter.get("/", renderNew);
newRouter.post("/", insertMessage);

module.exports = newRouter;
