const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const loanRoutes = require('./routes/loanRoutes');
const rateLimit = require('express-rate-limit');
require('./config/passport');

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
});
app.use(limiter);


// Routes
app.use('/auth', authRoutes);
app.use('/loans', loanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
