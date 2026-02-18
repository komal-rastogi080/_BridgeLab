const fs = require('fs');
const path = require('path');

function getEmployees() {
    const filePath = path.join(__dirname, '..', 'employees.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading employees.json:', err);
        return {};
    }
}

function saveEmployees(employees) {
    const filePath = path.join(__dirname, '..', 'employees.json');
        try{
            fs.writeFileSync(filePath, JSON.stringify(employees, null, 2), 'utf8');

        }catch(err){
            console.error('Error writing to employees.json:', err);
        }
}
    
module.exports = {
    getEmployees,
    saveEmployees
};