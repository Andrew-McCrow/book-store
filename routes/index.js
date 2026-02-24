const { Router } = require("express");
const {
  getCategories,
  renderAbout,
  removeCategory,
} = require("../controllers/indexController");
const { getAllCategories } = require("../db/queries");

const indexRouter = Router();

// homepage and about page routes
indexRouter.get("/", getCategories);
indexRouter.get("/about", renderAbout);
indexRouter.post("/categories/:id/delete", removeCategory);

module.exports = indexRouter;
