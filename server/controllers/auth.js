const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectDB } = require('../config/connectDB');

require('dotenv').config();
const db = connectDB();

const signUp = async (req, res) => {
    try {

        const { username, email, password, confirmPassword, account_type = 'user' } = req.body;

        if (!username || !email || !password || !confirmPassword || !account_type) {
            return res.status(400).json({
                success: false,
                message: 'Please fill required fields',
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and Confirm Password not matched',
            });
        }

        const alreadyUsername = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

        if (alreadyUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username already used !!!',
            });
        }

        const alreadyEmail = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (alreadyEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email already used !!!',
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const result = db.prepare('INSERT INTO users (username, email, password , account_type) VALUES (?, ?, ? , ?)').run(
            username,
            email,
            hashPassword,
            account_type
        );

        const newUser = {
            id: result.lastInsertRowid,
            username,
            email,
            account_type
        };

        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
            user: newUser,
        });
    } catch (error) {
        console.log('Error : ', error);
        return res.status(500).json({
            success: false,
            message: 'Error during SignUp',
            error: error,
        });
    }
};




const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill required fields',
            });
        }

        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found. Please sign up first!',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Wrong Password',
            });
        }

        const payload = {
            username: user.username,
            id: user.id,
        };

        console.log("payload " , payload)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Expires in 3 days
            httpOnly: true,
            samesite: 'None',
        };

        // Omitting password for security reasons
        const userWithoutPassword = { ...user, password: undefined };

        res.cookie('token', token, options).status(200).json({
            success: true,
            message: 'Login Successful',
            user: userWithoutPassword,
            token: token,
        });
    } catch (error) {
        console.log('Error : ', error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, please try again!',
            error,
        });
    }
};

const setPreferences = async (req, res) => {
    try {
        const { favourite_genre , favourite_author , userId} = req.body;
        // const {userId} = req.params;

        // const userId = req.user.id;

        console.log("user id " , userId)

        if (!favourite_author && !favourite_genre) {
            return res.status(400).json({
                success: false,
                message: "Please provide either favourite_author or favourite_genre for preferences"
            });
        }

        // Check if the user preferences already exist
        const existingPreferences = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

        if (!existingPreferences) {
            db.prepare('INSERT INTO users (id, favourite_author, favourite_genre) VALUES (?, ?, ?)').run(userId, favourite_author, favourite_genre);
        } else {
            db.prepare('UPDATE users SET favourite_author = ?, favourite_genre = ? WHERE id = ?').run(favourite_author, favourite_genre, userId);
        }

        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        res.status(200).json({
            success: true,
            message: "Preferences set successfully",
            user :user
        });
    } catch (error) {
        console.error("Error while setting preferences", error);
        return res.status(500).json({
            success: false,
            message: "Error while setting preferences",
            error: error
        });
    }
};


// shutting down app , proper close of connection
process.on('exit', () => {
    db.close();
    console.log('Database connection closed.');
});

// to handel , ctrl + c  
process.on('SIGINT', () => {
    process.exit();
});

//termination signal , close the database connection (like error and all)
process.on('SIGTERM', () => {
    process.exit();
});


module.exports = { login, signUp , setPreferences};
