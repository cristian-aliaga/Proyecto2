class Usuario {
    constructor(name, lname, birthday, email, address, phone, description) {
        this.name = name;
        this.lname = lname;
        this.birthday = birthday;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.description = description;
    }
}

function showData() {
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    let html = "";
    usersList.forEach((user, index) => {
        html += "<tr>";
        html += "<td id='td_name'>" + user.name + ' ' + user.lname + "</td>";
        html += "<td id='td_email'>" + user.email + "</td>";
        html += '<td><button onclick="editData('+ index +')" class="button-reg">Ver/Editar</button></td>';
        html += '<td><button class="button-del" onclick="deleteData('+ index +')">Eliminar</button>';
        html += "</tr>";
    });
    document.querySelector('#table').innerHTML = html;
}

document.onload = showData()

function addData(event) {
    event.preventDefault();
    let name = document.querySelector('#name').value;
    let lname = document.querySelector('#lname').value;
    let birthday = document.querySelector('#birthday').value;
    let email = document.querySelector('#email').value;
    let address = document.querySelector('#address').value;
    let phone = document.querySelector('#phone').value;
    let description = document.querySelector('#description').value;


    if (name === "" || lname === "") return;

    const usuario = new Usuario(name, lname, birthday, email, address, phone, description);
    console.log(usuario)
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    usersList.push(usuario)
    localStorage.setItem("usersList", JSON.stringify(usersList))
    showData()

    document.querySelector('#name').value = ""
    document.querySelector('#lname').value = ""
    document.querySelector('#birthday').value = ""
    document.querySelector('#email').value = ""
    document.querySelector('#address').value = ""
    document.querySelector('#phone').value = ""
    document.querySelector('#description').value = ""
}

function editData(index) {
    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('edit-btn').style.display = 'block';
    
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    document.querySelector('#name').value = usersList[index].name;
    document.querySelector('#lname').value = usersList[index].lname;
    document.querySelector('#birthday').value = usersList[index].birthday;
    document.querySelector('#email').value = usersList[index].email;
    document.querySelector('#address').value = usersList[index].address;
    document.querySelector('#phone').value = usersList[index].phone;
    document.querySelector('#description').value = usersList[index].description;

    document.getElementById('edit-btn').onclick = function () {
        usersList[index].name = document.querySelector('#name').value
        usersList[index].lname = document.querySelector('#lname').value
        usersList[index].birthday = document.querySelector('#birthday').value
        usersList[index].email = document.querySelector('#email').value
        usersList[index].address = document.querySelector('#address').value
        usersList[index].phone = document.querySelector('#phone').value
        usersList[index].description = document.querySelector('#description').value

        localStorage.setItem("usersList", JSON.stringify(usersList));
        showData();
        document.querySelector('#name').value = ""
        document.querySelector('#lname').value = ""
        document.querySelector('#birthday').value = ""
        document.querySelector('#email').value = ""
        document.querySelector('#address').value = ""
        document.querySelector('#phone').value = ""
        document.querySelector('#description').value = ""

        document.getElementById('add-btn').style.display = 'block';
        document.getElementById('edit-btn').style.display = 'none';
    }
}

function deleteData(index) {
    let usersList;
    if (localStorage.getItem("usersList") == null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    usersList.splice(index, 1);
    localStorage.setItem("usersList", JSON.stringify(usersList));
    showData();
}

