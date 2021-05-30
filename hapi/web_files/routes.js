let { getAllBooks, getBookById, createNewBook, updateBookById, deleteBookById } = require("./handler.js");

let routes = [
    {
        method: "GET",
        path: "/",
        handler: (request, h) => {
            return `Welcome to BOOK_SHELF API in ${request.url}`;
        },
    },
    {
        method: "GET",
        path: "/books",
        handler: getAllBooks
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getBookById
    },
    {
        method: "POST",
        path: "/books",
        handler: createNewBook
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: updateBookById
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBookById
    }
];

module.exports = routes;