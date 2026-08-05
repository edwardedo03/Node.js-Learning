const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password harus diisi" });
  }
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "Username sudah terdaftar!" });
  }
  users.push({ username, password });
  return res
    .status(201)
    .json({ message: "User berhasil didaftarkan. Silakan login." });

  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  try {
    const getBooks = () => {
      return new Promise((resolve) => {
        resolve(books);
      });
    };

    const allBooks = await getBooks();
    return res.status(200).send(JSON.stringify(allBooks, null, 4));
  } catch {
    return res.status(500).json({
      message: "Cant get the books",
      error: error.message,
    });
  }

  // return res.status(200).send(JSON.stringify(books, null, 4));

  // res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  const isbn = req.params.isbn;

  try {
    const getBookByISBN = (id) => {
      return new Promise((resolve, reject) => {
        if (books[id]) {
          resolve(books[id]);
        } else {
          reject(new Error("book not found"));
        }
      });
    };

    const book = await getBookByISBN(isbn);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }

  // const book = books[isbn];

  // if (book) {
  //   return res.status(200).json(book);
  // } else {
  //   return res.status(404).json({
  //     message: "Book not found",
  //   });
  // }

  // return res.status(200).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  const author = req.params.author.toLowerCase();

  try {
    const getBookByAuthor = (author) => {
      return new Promise((resolve) => {
        const keys = Object.keys(books);
        const matchingBooks = [];

        keys.forEach((key) => {
          if (books[key].author.toLowerCase() === author) {
            matchingBooks.push({
              isbn: key,
              ...books[key],
            });
          }
        });

        resolve(matchingBooks);
      });
    };

    const matchingBooks = await getBookByAuthor(author);

    if (matchingBooks.length > 0) {
      return res.status(200).json(matchingBooks);
    } else {
      return res.status(404).json({
        message: "Book from the Author not found",
      });
    }
  } catch {
    return res.status(500).json({
      message: "error",
    });
  }

  // const keys = Object.keys(books);
  // const matchingBooks = [];

  // keys.forEach((key) => {
  //   if (books[key].author.toLowerCase() === author) {
  //     matchingBooks.push({
  //       isbn: key,
  //       ...books[key],
  //     });
  //   }
  // });

  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  const title = req.params.title.toLowerCase();

  try {
    const getBooksByTitle = (titleName) => {
      return new Promise((resolve) => {
        const keys = Object.keys(books);
        const matchingBooks = [];
        keys.forEach((key) => {
          if (books[key].title.toLowerCase() === titleName) {
            matchingBooks.push({ isbn: key, ...books[key] });
          }
        });
        resolve(matchingBooks);
      });
    };

    const matchingBooks = await getBooksByTitle(author);
    if (matchingBooks.length > 0) {
      return res.status(200).json(matchingBooks);
    } else {
      return res.status(404).json({
        message: `Book with Title ${title} not found`,
      });
    }
  } catch {
    return res.status(500).json({
      message: "error",
    });
  }
  // const keys = Object.keys(books);
  // const matchingBooks = [];

  // keys.forEach((key) => {
  //   if (books[key].title.toLowerCase() === title) {
  //     matchingBooks.push({
  //       isbn: key,
  //       ...books[key],
  //     });
  //   }
  // });

  // return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  // const keys = Object.keys(books);
  const bookReview = books[isbn].reviews;

  if (bookReview) {
    return res.status(200).json(bookReview);
  } else {
    return res.status(404).json({
      message: "Select a book that available",
    });
  }

  // return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
