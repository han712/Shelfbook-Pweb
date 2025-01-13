const ModelBook = require("../model/book");


const getBook = async (req, res) => {
    try {
      const result = await ModelBook.getBooks();
      res.status(200).send({
        status: 200,
        message: "Get Books Success",
        data: result,
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };


  const createBook = async (req, res) => {
    try {
        const body = req.body;

        // Validasi Input

        // Tambahkan buku ke database
        const result = await ModelBook.createBook(
            body.title,
            body.author,
            body.publicaton,
            body.finished
        );

        // Berikan respons sukses dengan data baru
        res.status(201).json({
            status: 201,
            message: "Succes Create Book",
            data: result,
        });
    } catch (err) {
        console.error("Error saat membuat buku:", err);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

  const updateBook = async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      if(!body.title){res.status(400).json({status: 400, message: "Need to input title",error:err.message})}
      if(!body.author){res.status(400).json({status: 400, message: "Need to input author",error:err.message})}
      if(!body.publicaton){res.status(400).json({status: 400, message: "Need to input publication",error:err.message})}
      const result = await ModelBook.updateBook(
        id,
        body.title,
        body.author,
        body.publicaton,
        body.finished
      );
  
      res.status(200).json({
        status: 200,
        message: "Succes Update Book",
        data: body,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };

  const deleteBook = async (req, res) => {
    try {
      const id = req.params.id;
      if(!id){res.status(400).json({status: 400, message: "Need to input id",error:err.message})}
      const result = await ModelBook.deleteBook(id);
  
      res.status(200).json({
        status: 200,
        message: "Success delete Contact",
        data: id,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };

  const searchBook = async (req, res) => {
    try {
      const query = req.query.title;
      const result = await ModelBook.searchBook(query);
  
      res.status(200).json({
        status: 200,
        message: "Success delete Contact",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };


  module.exports = {getBook, updateBook, deleteBook, searchBook, createBook}