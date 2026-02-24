const {
  insertMessage: insertMessageQuery,
  getAllMessages,
} = require("../db/queries");

// controller function to insert a new message into the db and render the index page
async function insertMessage(req, res) {
  // destructure text and username from the request body
  const { text, username } = req.body;
  // insert the new message into the db and get the new message back
  const newMessage = await insertMessageQuery(username, text);

  if (!newMessage) {
    res.status(404).render("404", { title: "404" });
    return;
  }

  const messages = await getAllMessages();

  res.render("index", { title: "Home", messages: messages });
}

// controller to render the form page for creating a new message
function renderNew(req, res) {
  res.render("form", { title: "Create a new message" });
}

module.exports = { insertMessage, renderNew };
