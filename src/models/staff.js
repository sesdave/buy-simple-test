const path = require('path');
const fs = require('fs').promises; 

class Staff {
    static async findOne(query) {
        try {
            const filePath = path.join(__dirname, 'data', 'staffs.json');
            const staffData = await fs.readFile(filePath, 'utf8');
            const allStaff = JSON.parse(staffData);
            console.log("Staff data ", allStaff);
            return allStaff.find(staff => staff.email === query.email);
        } catch (error) {
            console.error("Error reading staff data:", error);
        }
    }
}

module.exports = Staff;
