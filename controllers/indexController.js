const { getAllCategories, deleteCategory } = require("../db/queries");

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

module.exports = { getCategories, renderAbout, removeCategory };
