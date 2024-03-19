const Loan = require('../models/loan');

class LoanService {
    static async getAllLoans(userRole) {
        const allLoans = await Loan.getAllLoans();
        if (userRole !== 'admin' && userRole !== 'superAdmin') {
            return allLoans.map(loan => {
                const { applicant, ...loanData } = loan;
                return { ...loanData, applicant: { name: applicant.name, email: applicant.email, telephone: applicant.telephone } };
            });
        }
        return allLoans;
    }

    static async getLoansByStatus(status, userRole) {
        const loansByStatus = await Loan.getLoansByStatus(status);
        if (userRole !== 'admin' && userRole !== 'superAdmin') {
            return loansByStatus.map(loan => {
                const { applicant, ...loanData } = loan;
                return { ...loanData, applicant: { name: applicant.name, email: applicant.email, telephone: applicant.telephone } };
            });
        }
        return loansByStatus;
    }

    static async getUserLoans(userEmail) {
        return Loan.getUserLoans(userEmail);
    }

    static async getExpiredLoans() {
        return Loan.getExpiredLoans();
    }

    static async deleteLoan(loanId, userRole) {
        if (userRole !== 'superAdmin') {
            throw new Error('Forbidden');
        }
        return Loan.deleteLoan(loanId);
    }
}

module.exports = LoanService;
