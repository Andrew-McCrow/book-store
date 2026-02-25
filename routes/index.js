const { Router } = require("express");
const {
  getCategories,
  renderAbout,
  removeCategory,
  renderAddCategoryForm,
  addCategory,
  renderEditCategoryForm,
  editCategory,
  getCategoryDetail,
  renderAddMovieForm,
  addMovie,
  renderEditMovieForm,
  editMovie,
  removeMovie,
} = require("../controllers/indexController");
const { getAllCategories } = require("../db/queries");

const indexRouter = Router();

// homepage and about page routes
indexRouter.get("/", getCategories);
indexRouter.get("/about", renderAbout);
indexRouter.get("/categories/new", renderAddCategoryForm);
indexRouter.post("/categories/new", addCategory);
indexRouter.get("/categories/:id", getCategoryDetail);
indexRouter.get("/categories/:id/edit", renderEditCategoryForm);
indexRouter.post("/categories/:id/edit", editCategory);
indexRouter.post("/categories/:id/delete", removeCategory);
indexRouter.get("/categories/:categoryId/movies/new", renderAddMovieForm);
indexRouter.post("/categories/:categoryId/movies/new", addMovie);
indexRouter.get(
  "/categories/:categoryId/movies/:movieId/edit",
  renderEditMovieForm,
);
indexRouter.post("/categories/:categoryId/movies/:movieId/edit", editMovie);
indexRouter.post("/categories/:categoryId/movies/:movieId/delete", removeMovie);

module.exports = indexRouter;
