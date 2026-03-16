async function loadStudents(){

let sort = document.getElementById("sort").value;
let department = document.getElementById("department").value;

let url = `http://localhost:3000/students?sort=${sort}&department=${department}`;

let response = await fetch(url);
let data = await response.json();

let table = document.getElementById("studentTable");
table.innerHTML = "";

data.forEach(student => {

table.innerHTML += `
<tr>
<td>${student.name}</td>
<td>${student.email}</td>
<td>${student.department}</td>
<td>${student.join_date}</td>
</tr>
`;

});

}

async function loadDepartmentCount(){

let response = await fetch("http://localhost:3000/department-count");
let data = await response.json();

let list = document.getElementById("deptCount");
list.innerHTML = "";

data.forEach(d => {

list.innerHTML += `<li>${d.department} : ${d.total}</li>`;

});

}

loadStudents();
loadDepartmentCount();