const express = require('express');
const { getRecommendation } = require('../controllers/recommend');
const { getAllBooks, deleteBook, createBook } = require('../controllers/book');

const booksRoute = express.Router();

booksRoute.post('/recommendation' , getRecommendation);

booksRoute.get('/get-all' , getAllBooks);
booksRoute.delete('/delete' , deleteBook);
booksRoute.post('/create' , createBook);

module.exports = booksRoute;