const express = require('express');
const app = express();
const fileHandler = require('./modules/fileHandler');
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const employees = fileHandler.getEmployees();
    res.render('index', { employees });
});

app.get('/employees', (req, res) => {
    const employees = fileHandler.getEmployees();
    res.json(employees);
});

app.post('/add-employee', (req, res) =>{
    res.render("add");
    const {name, salary, department, gender, dateOfJoining} = req.body;
    const employees = fileHandler.getEmployees();
    const newEmployee = {
        id: Date.now(),
        name, position, salary: Number(salary), department, gender, dateOfJoining
    }
    employees[newEmployee.id] = newEmployee;
    fileHandler.saveEmployees(employees);
    res.json({message: 'Employee added successfully', employee: newEmployee});
});

app.get('/delete:id', (req,res) => {
    const employees = fileHandler.getEmployees();
    employees = employees.filter(e => e.id !== parseInt(req.params.id));
    fileHandler.saveEmployees(employees);
    res.redirect('/employees');
});

app.get('/edit:id', (req,res) => {
    const employees = fileHandler.getEmployees();
    const employee = employees.filter(e => e.id == parseInt(req.params.id));
    res.render("edit", {employee});
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});