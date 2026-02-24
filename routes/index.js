const { Router } = require("express");
const { getMessages, renderAbout, removeMessage } = require("../controllers/indexController");

const indexRouter = Router();

// homepage and about page routes
indexRouter.get("/", getMessages);
indexRouter.get("/about", renderAbout);
indexRouter.post("/messages/:id/delete", removeMessage);

module.exports = indexRouter;
