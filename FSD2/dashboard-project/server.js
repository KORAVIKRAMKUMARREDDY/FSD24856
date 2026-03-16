const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "student_dashboard"
});

db.connect(err => {
    if (err) {
        console.log("Database connection failed", err);
    } else {
        console.log("Connected to MySQL");
    }
});

app.get("/students", (req, res) => {

    let sort = req.query.sort;
    let department = req.query.department;

    let query = "SELECT * FROM students";

    if (department) {
        query += ` WHERE department='${department}'`;
    }

    if (sort === "name") {
        query += " ORDER BY name";
    }

    if (sort === "date") {
        query += " ORDER BY join_date";
    }

    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get("/department-count", (req, res) => {

    const query = `
        SELECT department, COUNT(*) AS total
        FROM students
        GROUP BY department
    `;

    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });

});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});