const { connectDB } = require('../config/connectDB');
const db = connectDB();

const getAllBooks = async (req, res) => {
    try {
        const data = db.prepare("SELECT * FROM books").all();

        return res.status(200).json({
            success: true,
            message: "All books fetched successfully from db",
            data: data
        });
    } catch (error) {
        console.error("Error while fetching data from db", error);
        res.status(500).json({
            success: false,
            message: `Error while fetching data from db ${error.message}`,
            error: error
        });
    }
};

const createBook = async (req, res) => {
    try {
        const { title, genre, author } = req.body;
        if (!title || !genre || !author) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required data"
            });
        }

        const newBook = db.prepare('INSERT INTO books (title, author, genre) VALUES (?, ?, ?)').run(
            title, genre, author);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            book: { id: newBook.lastInsertRowid , title, author, genre }
        });
    } catch (error) {
        console.error("Error while creating book", error);
        return res.status(500).json({
            success: false,
            message: "Error while creating book",
            error: error
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide book ID"
            });
        }

        const book = db.prepare('SELECT * FROM books WHERE id = ?').get(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Book not found with id = ${id}`
            });
        }

        const delBook = db.prepare("DELETE FROM books WHERE id=?").run(id);

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            deletedBook: { id: book.id, title: book.title, author: book.author, genre: book.genre }
        });
    } catch (error) {
        console.error("Error during deleting book", error);
        return res.status(500).json({
            success: false,
            message: "Error during deleting book",
            error: error
        });
    }
};

// Properly close the database connection on exit
const closeDBConnection = () => {
    db.close();
    console.log('Database connection closed.');
};

process.on('exit', closeDBConnection);
process.on('SIGINT', closeDBConnection);
process.on('SIGTERM', closeDBConnection);

module.exports = {
    getAllBooks,
    createBook,
    deleteBook,
};