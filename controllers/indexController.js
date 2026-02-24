const { getAllMessages, deleteMessage } = require("../db/queries");

// controller function to get all messages from db and render the index page
async function getMessages(req, res) {
  const messages = await getAllMessages();

  if (!messages) {
    res.status(404).render("404", { title: "404" });
    return;
  }

  res.render("index", { title: "Home", messages });
}

// controller function to render the about page
function renderAbout(req, res) {
  res.render("about", { title: "About" });
}

// controller function to delete a message and redirect to home page
async function removeMessage(req, res) {
  await deleteMessage(req.params.id);
  res.redirect("/");
}

module.exports = { getMessages, renderAbout, removeMessage };
