const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function createCategory(name) {
  const { rows } = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name],
  );
  return rows[0];
}

async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function updateCategory(id, name) {
  const { rows } = await pool.query(
    "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
    [name, id],
  );
  return rows[0];
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

async function getMoviesByCategoryId(category_id) {
  const { rows } = await pool.query(
    "SELECT * FROM movies WHERE category_id = $1",
    [category_id],
  );
  return rows;
}

async function getAllMovies() {
  const { rows } = await pool.query(
    "SELECT movies.*, categories.name AS category_name FROM movies JOIN categories ON movies.category_id = categories.id",
  );
  return rows;
}

async function createMovie(title, director, year_released, category_id) {
  const { rows } = await pool.query(
    "INSERT INTO movies (title, director, year_released, category_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, director, year_released, category_id],
  );
  return rows[0];
}

async function getMovieById(id) {
  const { rows } = await pool.query(
    "SELECT movies.*, categories.name AS category_name FROM movies JOIN categories ON movies.category_id = categories.id WHERE movies.id = $1",
    [id],
  );
  return rows[0];
}

async function updateMovie(id, title, director, year_released, category_id) {
  const { rows } = await pool.query(
    "UPDATE movies SET title = $1, director = $2, year_released = $3, category_id = $4 WHERE id = $5 RETURNING *",
    [title, director, year_released, category_id, id],
  );
  return rows[0];
}

async function deleteMovie(id) {
  await pool.query("DELETE FROM movies WHERE id = $1", [id]);
}

module.exports = {
  getAllCategories,
  createMovie,
  deleteMovie,
  deleteCategory,
  getAllMovies,
  createCategory,
  getCategoryById,
  updateCategory,
  getMoviesByCategoryId,
  getMovieById,
  updateMovie,
};
