const jwt = require('jsonwebtoken');
const Staff = require('../models/staff');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Entered with email - ${email}, password - ${password}`)
    try {
        const user = await Staff.findOne({ email });
        console.log("User", user)
        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'Logout successful' });
};

