const path = require('path');
const fs = require('fs').promises;

class Loan {
    static async getAllLoans() {
        try {
            const loansData = await fs.readFile(path.join(__dirname, 'data', 'loans.json'), 'utf8');
            return JSON.parse(loansData);
        } catch (error) {
            console.error('Error reading loans data:', error);
            throw error;
        }
    }

    static async getLoansByStatus(status) {
        try {
            const loansData = await fs.readFile(path.join(__dirname, 'data', 'loans.json'), 'utf8');
            const allLoans = JSON.parse(loansData);
            return allLoans.filter(loan => loan.status === status);
        } catch (error) {
            console.error('Error reading loans data:', error);
            throw error;
        }
    }

    static async getUserLoans(userEmail) {
        try {
            const loansData = await fs.readFile(path.join(__dirname, 'data', 'loans.json'), 'utf8');
            const allLoans = JSON.parse(loansData);
            return allLoans.filter(loan => loan.applicant.email === userEmail);
        } catch (error) {
            console.error('Error reading loans data:', error);
            throw error;
        }
    }

    static async getExpiredLoans() {
        try {
            const now = new Date();
            const loansData = await fs.readFile(path.join(__dirname, 'data', 'loans.json'), 'utf8');
            const allLoans = JSON.parse(loansData);
            return allLoans.filter(loan => new Date(loan.maturityDate) < now);
        } catch (error) {
            console.error('Error reading loans data:', error);
            throw error;
        }
    }

    static async deleteLoan(loanId) {
        try {
            const loansFilePath = path.join(__dirname, 'data', 'loans.json');
            const loansData = await fs.readFile(loansFilePath, 'utf8');
            let allLoans = JSON.parse(loansData);
            const index = allLoans.findIndex(loan => loan.id === loanId);
            if (index !== -1) {
                allLoans.splice(index, 1);
                await fs.writeFile(loansFilePath, JSON.stringify(allLoans, null, 2));
                return 'Loan deleted successfully';
            } else {
                throw new Error('Loan not found');
            }
        } catch (error) {
            console.error('Error deleting loan:', error);
            throw error;
        }
    }
}

module.exports = Loan;
