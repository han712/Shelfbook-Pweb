const db = require("../connection/connection")

function createBook(title, author, publicaton, finished){
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO Books VALUES (null, ?, ?, ?, ?)`,
            [title, author, publicaton, finished],
            (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            }
        )
    })
}

function updateBook(id, title, author, publicaton, finished){
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE Books SET title = ?, author = ?, publicaton = ?, finished = ? WHERE id = ?`,
            [title, author, publicaton, finished, id],
            (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            }
        )
    })
}

function deleteBook(id){
    return new Promise((resolve, reject) => {
        db.run(
            `DELETE FROM Books WHERE id = ?`,
            [id],
            (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            }
        )
    })
}

function getBooks(){
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM Books`,
            (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            }
        )
    })
}

function searchBook(search) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM Books WHERE title LIKE ?`,
            [`%${search}%`],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}
module.exports = {getBooks, updateBook, createBook, searchBook, deleteBook}