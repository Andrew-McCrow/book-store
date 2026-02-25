const { Router } = require("express");
const {
  getCategories,
  renderAbout,
  removeCategory,
  renderAddCategoryForm,
  addCategory,
  renderEditCategoryForm,
  editCategory,
} = require("../controllers/indexController");
const { getAllCategories } = require("../db/queries");

const indexRouter = Router();

// homepage and about page routes
indexRouter.get("/", getCategories);
indexRouter.get("/about", renderAbout);
indexRouter.get("/categories/new", renderAddCategoryForm);
indexRouter.post("/categories/new", addCategory);
indexRouter.get("/categories/:id/edit", renderEditCategoryForm);
indexRouter.post("/categories/:id/edit", editCategory);
indexRouter.post("/categories/:id/delete", removeCategory);

module.exports = indexRouter;
