const {
  getAllCategories,
  deleteCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  getMoviesByCategoryId,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../db/queries");

// controller function to get all categories from db and render the index page
async function getCategories(req, res) {
  const categories = await getAllCategories();

  if (!categories) {
    res.status(404).render("404", { title: "404" });
    return;
  }

  res.render("index", { title: "Home", categories });
}

// controller function to render the about page
function renderAbout(req, res) {
  res.render("about", { title: "About" });
}

// controller function to delete a category and redirect to home page
async function removeCategory(req, res) {
  const movies = await getMoviesByCategoryId(req.params.id);
  if (movies.length > 0) {
    const categories = await getAllCategories();
    return res.render("index", {
      title: "Home",
      categories,
      error:
        "Cannot delete a category that still has movies. Delete all movies first.",
    });
  }
  await deleteCategory(req.params.id);
  res.redirect("/");
}

// controller function to render the add category form
function renderAddCategoryForm(req, res) {
  res.render("addCategory", { title: "Add Category" });
}

// controller function to create a new category and redirect to home
async function addCategory(req, res) {
  const { name } = req.body;
  await createCategory(name);
  res.redirect("/");
}

// controller function to get a single category and its movies
async function getCategoryDetail(req, res) {
  const category = await getCategoryById(req.params.id);
  if (!category) return res.status(404).render("404", { title: "404" });
  const movies = await getMoviesByCategoryId(req.params.id);
  res.render("categoryDetail", { title: category.name, category, movies });
}

// controller function to render the edit category form pre-filled with current name
async function renderEditCategoryForm(req, res) {
  const category = await getCategoryById(req.params.id);
  if (!category) return res.status(404).render("404", { title: "404" });
  res.render("editCategory", { title: "Edit Category", category });
}

// controller function to update a category and redirect to home
async function editCategory(req, res) {
  const { name } = req.body;
  await updateCategory(req.params.id, name);
  res.redirect("/");
}

// controller function to render the add movie form
async function renderAddMovieForm(req, res) {
  const category = await getCategoryById(req.params.categoryId);
  if (!category) return res.status(404).render("404", { title: "404" });
  res.render("addMovie", { title: "Add Movie", category });
}

// controller function to create a new movie and redirect to category detail
async function addMovie(req, res) {
  const { title, director, year_released } = req.body;
  await createMovie(title, director, year_released, req.params.categoryId);
  res.redirect(`/categories/${req.params.categoryId}`);
}

// controller function to render the edit movie form
async function renderEditMovieForm(req, res) {
  const category = await getCategoryById(req.params.categoryId);
  if (!category) return res.status(404).render("404", { title: "404" });
  const movie = await getMovieById(req.params.movieId);
  if (!movie) return res.status(404).render("404", { title: "404" });
  res.render("editMovie", { title: "Edit Movie", category, movie });
}

// controller function to update a movie and redirect to category detail
async function editMovie(req, res) {
  const { title, director, year_released } = req.body;
  await updateMovie(
    req.params.movieId,
    title,
    director,
    year_released,
    req.params.categoryId,
  );
  res.redirect(`/categories/${req.params.categoryId}`);
}

// controller function to delete a movie and redirect to category detail
async function removeMovie(req, res) {
  await deleteMovie(req.params.movieId);
  res.redirect(`/categories/${req.params.categoryId}`);
}

module.exports = {
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
};
