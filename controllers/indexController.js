const { getAllCategories, deleteCategory, createCategory, getCategoryById, updateCategory } = require("../db/queries");

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

module.exports = { getCategories, renderAbout, removeCategory, renderAddCategoryForm, addCategory, renderEditCategoryForm, editCategory };
