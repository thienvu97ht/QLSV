var sinhVienApi = '  http://localhost:3000/sinhVien';
var overlayElement = document.querySelector('.overlay');
var formElement = document.querySelector('.main-form');

var createBtn = document.querySelector('#create');
var btnUpdate = document.querySelector('#update');

var nameInputElement = document.querySelector('#name');
var emailInputElement = document.querySelector('#email');
var phoneInputElement = document.querySelector('#phone');
var namInputElement = document.querySelector('#male');
var nuInputElement = document.querySelector('#female');

function start() {
    overlayElement.style.display = 'none';
    formElement.style.display = 'none';
    document.querySelector('#update').style.display = 'none';
    getSv(function (data) {
        renderSinhVien(data)
    });
}

start();

// Functions

// Lấy danh sách sinh viên từ API
function getSv(callback) {
    fetch(sinhVienApi)
        .then(function (response) {
            return response.json()
        })
        .then(callback);
}

// Hàm render ra trình duyệt
function renderSinhVien(ListSinhVien) {
    var listSvBlock = document.querySelector('#list-sv');
    var htmls = ListSinhVien.map(function (sinhVien) {
        return `
        <tr class="sv-item-${sinhVien.id}">
            <td class="col1">${sinhVien.name}</td>
            <td class="col2">${sinhVien.email}</td>
            <td class="col3">${sinhVien.phone}</td>
            <td class="col4">${sinhVien.gender}</td>
            <td>
                <a class="edit" title="Edit" onclick="handleUpdateSv(${sinhVien.id})">
                    <i class="material-icons">&#xE254;</i>
                </a>
                <a class="delete" title="Delete" onclick="handleDeleteSv(${sinhVien.id})">
                    <i class="material-icons">&#xE872;</i>
                </a>
            </td>
        </tr>
        `
    });
    listSvBlock.innerHTML = htmls.join('');
};

// Hàm tạo mới dữ liệu vào database
function createSv(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(sinhVienApi, options)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
};

// Hàm sửa dữ liệu
function updateSv(data, id) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(sinhVienApi + '/' + id, options)
        .then(function (response) {
            return response.json()
        })
        .then(function () {
            getSv(renderSinhVien);
        })
};

// Hàm xóa dữ liệu trong database
function handleDeleteSv(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(sinhVienApi + '/' + id, options)
        .then(function (response) {
            return response.json()
        })
        .then(function () {
            var svItem = document.querySelector('.sv-item-' + id);
            if (svItem) {
                svItem.remove();
            }
        });
};

// Hàm xử lý lấy dữ liệu trong form
function handleCreateForm(data) {
    var name = nameInputElement.value;
    var email = emailInputElement.value;
    var phone = phoneInputElement.value;
    var gender;

    namInputElement.checked ? gender = 'Nam' : undefined;
    nuInputElement.checked ? gender = 'Nữ' : undefined;

    var data = {
        name,
        email,
        phone,
        gender
    }

    createSv(data, function () {
        getSv(renderSinhVien);
    });
    document.querySelector('.main-form').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';

    nameInputElement.value = '';
    emailInputElement.value = '';
    phoneInputElement.value = '';
    namInputElement.checked = false;
    nuInputElement.checked = false;
};

// Hàm lấy value khóa học cũ
function handleUpdateSv(id) {
    showForm();
    var itemSv = document.querySelector('.sv-item-' + id);

    var nameSv = itemSv.querySelector('.col1');
    var emailSv = itemSv.querySelector('.col2');
    var phoneSv = itemSv.querySelector('.col3');
    var genderSv = itemSv.querySelector('.col4');


    nameInputElement.value = nameSv.innerHTML;
    emailInputElement.value = emailSv.innerHTML;
    phoneInputElement.value = phoneSv.innerHTML;
    genderSv.innerHTML == 'Nam' ? namInputElement.checked = true : undefined;
    genderSv.innerHTML == 'Nữ' ? nuInputElement.checked = true : undefined;

    createBtn.style.display = 'none';
    btnUpdate.style.display = 'block';

    btnUpdate.onclick = function () {
        var newName = document.querySelector('input[name="name"]');
        var newEmail = document.querySelector('input[name="email"]');
        var newPhone = document.querySelector('input[name="phone"]');
        var newGender;

        namInputElement.checked ? newGender = 'Nam' : undefined;
        nuInputElement.checked ? newGender = 'Nữ' : undefined;

        var formData = {
            name: newName.value,
            email: newEmail.value,
            phone: newPhone.value,
            gender: newGender
        }

        if (formData) {
            updateSv(formData, id);
        }


        nameInputElement.value = '';
        emailInputElement.value = '';
        phoneInputElement.value = '';
        namInputElement.checked = false;
        nuInputElement.checked = false;

        createBtn.style.display = 'block';
        btnUpdate.style.display = 'none';
        hideForm();
    }




};

// Hàm nút bấm ẩn hiện form
function showForm() {

    if (overlayElement.style.display == 'none' || formElement.style.display == 'none') {
        overlayElement.style.display = 'block';
        formElement.style.display = 'block';
    }
};

function hideForm() {
    if (overlayElement.style.display == 'block' || formElement.style.display == 'block') {
        overlayElement.style.display = 'none';
        formElement.style.display = 'none';

        nameInputElement.value = '';
        emailInputElement.value = '';
        phoneInputElement.value = '';
        namInputElement.checked = false;
        nuInputElement.checked = false;

        createBtn.style.display = 'block';
        btnUpdate.style.display = 'none';
    }
};