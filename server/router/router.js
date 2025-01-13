const express = require("express");
const router = express.Router();
const bookController = require("../controller/book.controller");


router
  .route("/books")
  .get(bookController.getBook)
  .post(bookController.createBook);

router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);
router.get("/books/search", bookController.searchBook)

module.exports = router;

