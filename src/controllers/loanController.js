const LoanService = require('../services/loanService');

exports.getAllLoans = async (req, res) => {
    const userRole = req.user.role;
    try {
        const { status } = req.query;
        console.log("Entered loans", status)
        let loans;

        if (status) {
            loans = await LoanService.getLoansByStatus(status, userRole);
        } else {
            loans = await LoanService.getAllLoans(userRole);
        }
        res.json(loans);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserLoans = async (req, res) => {
    const { userEmail } = req.params;
    try {
        const loans = await LoanService.getUserLoans(userEmail);
        res.json(loans);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getExpiredLoans = async (req, res) => {
    try {
        const loans = await LoanService.getExpiredLoans();
        res.json(loans);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteLoan = async (req, res) => {
    const { loanId } = req.params;
    const userRole = req.user.role;
    try {
        const message = await LoanService.deleteLoan(loanId, userRole);
        res.send(message);
    } catch (error) {
        res.status(403).send(error.message);
    }
};
