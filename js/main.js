var sinhVienApi = '  http://localhost:3000/sinhVien';

function start() {
    getSv(function(data) {
        renderSinhVien(data)
    });
}

start();

// Functions

// Lấy danh sách khóa học từ API
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
        console.log(sinhVien.id)
        return `
        <tr class="sv-item-${sinhVien.id}">
            <td>${sinhVien.name}</td>
            <td>${sinhVien.email}</td>
            <td>${sinhVien.phone}</td>
            <td>${sinhVien.gender}</td>
            <td>
                <a class="edit" title="Edit" onclick="handleUpdateCourse(${sinhVien.id})">
                    <i class="material-icons">&#xE254;</i>
                </a>
                <a class="delete" title="Delete" onclick="handleDeleteCourse(${sinhVien.id})">
                    <i class="material-icons">&#xE872;</i>
                </a>
            </td>
        </tr>
        `
    });
    listSvBlock.innerHTML = htmls.join('');
}