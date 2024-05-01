// Create a web server
// Create a web server that listens on port 3000 and serves the following responses:
// - GET /comments - returns a list of comments
// - POST /comments - create a new comment
// - GET /comments/:id - return a single comment with the matching id
// - PUT /comments/:id - update a comment with the matching id
// - DELETE /comments/:id - delete a comment with the matching id
// The comments are stored in a JSON file on the server. Use the fs module to read/write to this file.
// You can use this array of comments to get started with:
// const comments = [
//   { id: 1, author: "user1", content: "content1" },
//   { id: 2, author: "user2", content: "content2" },
//   { id: 3, author: "user3", content: "content3" },
//   { id: 4, author: "user4", content: "content4" },
// ];

// Path: comments.js
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const comments = [
  { id: 1, author: "user1", content: "content1" },
  { id: 2, author: "user2", content: "content2" },
  { id: 3, author: "user3", content: "content3" },
  { id: 4, author: "user4", content: "content4" },
];

app.get("/comments", (req, res) => {
  res.json(comments);
});

app.post("/comments", (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.json(newComment);
});

app.get("/comments/:id", (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find((comment) => comment.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send("Comment not found");
  }
});

app.put("/comments/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments[index] = req.body;
    res.json(comments[index]);
  } else {
    res.status(404).send("Comment not found");
  }
});

app.delete("/comments/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.send("Comment deleted");
  } else {
    res.status(404).send("Comment not found");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Test the server
// Use curl or Postman to test the