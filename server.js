const express = require('express');
const path = require('path');
const app = express();
const fileHandler = require('./modules/fileHandler');
const PORT = 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    const employees = fileHandler.getEmployees();
    res.render('index', { employees });
});

app.get('/add', (req, res) => {
    res.render('add', { error: null, employee: {} });
});

app.post('/add', (req, res) => {
    const { name, salary, department, gender, joiningDate } = req.body;
    if (!name || !salary || !department || !gender || !joiningDate) {
        return res.status(400).render('add', { error: 'All fields are required', employee: req.body });
    }
    if (isNaN(salary) || Number(salary) <= 0) {
        return res.status(400).render('add', { error: 'Salary must be a positive number', employee: req.body });
    }
    const employees = fileHandler.getEmployees();
    const newEmployee = {
        id: Date.now(),
        name,
        salary: Number(salary),
        department,
        gender,
        joiningDate,
    };

    employees.push(newEmployee);
    fileHandler.saveEmployees(employees);
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employees = fileHandler.getEmployees();
    const filtered = employees.filter(e => e.id !== id);
    fileHandler.saveEmployees(filtered);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employees = fileHandler.getEmployees();
    const employee = employees.find(e => e.id === id);
    if (!employee) return res.redirect('/');
    res.render('edit', { employee });
});

app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, salary, department, gender, joiningDate } = req.body;
    const employees = fileHandler.getEmployees();
    const idx = employees.findIndex(e => e.id === id);
    if (idx === -1) return res.redirect('/');

    employees[idx] = {
        id,
        name,
        salary: Number(salary),
        department,
        gender,
        joiningDate,
    };
    fileHandler.saveEmployees(employees);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});