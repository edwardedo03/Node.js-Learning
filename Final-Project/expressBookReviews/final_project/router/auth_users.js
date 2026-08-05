const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  const userExists = users.some((user) => user.username === username);
  return !userExists;
};

const authenticatedUser = (username, password) => {
  const matchingUser = users.find(
    (user) => user.username === username && user.password === password,
  );
  return !!matchingUser;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "you must write your username dan password",
    });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        username: username,
      },
      "access",
      { expiresIn: "1h" },
    );

    req.session.authorization = {
      accessToken,
      username,
    };

    return res.status(200).json({
      message: "user logged in",
      token: accessToken,
    });
  } else {
    return res.status(208).json({
      message: "wrong credential, check back your username and password",
    });
  }

  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.username;

  if (!review) {
    return res.status(400).json({
      message: "you must input the review",
    });
  }

  if (books[isbn]) {
    if (!books[isbn].reviews) {
      books[isbn].reviews = {};
    }

    books[isbn].reviews[username] = review;

    return res.status(200).json({
      message: `review for ${isbn} book, success added/modified by ${username}`,
      reviews: books[isbn].reviews,
    });
  } else {
    return res.status(404).json({
      message: "book not found",
    });
  }

  // return res.status(300).json({ message: "Yet to be implemented" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  if (books[isbn]) {
    if (books[isbn].reviews && books[isbn].reviews[username]) {
      delete books[isbn].reviews[username];
      return res.status(200).json({
        message: `Review dari user ${username} untuk buku ISBN ${isbn} berhasil dihapus.`,
        reviews: books[isbn].reviews,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Kamu tidak memiliki review pada buku ini" });
    }
  } else {
    return res.status(404).json({ message: "Buku tidak ditemukan" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
