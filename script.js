let modalContainer = document.querySelector(".modal-bg");
let addNew = document.querySelector(".add-new");
let closeModal = document.querySelector(".close-modal");
let table = document.querySelector(".wrapper-table");
let addPost = document.querySelector(".add-post");
let inpAddFullName = document.querySelector(".inp-add-fullname");
let inpAddType = document.querySelector(".inp-add-type");
let inpAddPublish = document.querySelector(".inp-add-publish");
let inpAddReview = document.querySelector(".inp-add-review");
let tableRow = document.querySelector(".table");
//
let modalEdit = document.querySelector(".modal-bg-edit");
let inpEditFullName = document.querySelector(".inp-edit-fullname");
let inpEditType = document.querySelector(".inp-edit-type");
let inpEditPublish = document.querySelector(".inp-edit-publish");
let inpEditReview = document.querySelector(".inp-edit-review");
let saveEditPost = document.querySelector(".edit-post");
let closeModalEdit = document.querySelector(".close-modal-edit");
let data = [
  {
    id: 1,
    fullname: "1.Alex Mitchel",
    type: "Student",
    publish: "23 march 2023",
    review: "writer",
    isComplete: false,
  },
  {
    id: 2,
    fullname: "2.Mike Tyson",
    type: "Graduates",
    publish: "23 march 2023",
    review: "boxer",
    isComplete: false,
  },
];

function get() {
  tableRow.innerHTML = "";
  data.forEach((e) => {
    let dataList = document.createElement("tr");
    dataList.classList.add("data-list");
    let fullNameText = document.createElement("td");
    fullNameText.innerHTML = e.fullname;
    // fullNameText.classList.add("checked-line");
    let typeText = document.createElement("td");
    typeText.innerHTML = e.type;
    let publishText = document.createElement("td");
    publishText.innerHTML = e.publish;
    let reviewText = document.createElement("td");
    reviewText.innerHTML = e.review;
    let btnInfo = document.createElement("td");
    btnInfo.classList.add("btn-info", "ml-td");
    let btnInfoText = document.createElement("p");
    btnInfoText.innerHTML = "i";
    btnInfo.append(btnInfoText);
    let btnEdit = document.createElement("td");
    btnEdit.classList.add("btn-edit", "ml-td");
    let btnEditText = document.createElement("p");
    btnEditText.innerHTML = "Edit";
    btnEdit.append(btnEditText);
    let btnDelete = document.createElement("td");
    btnDelete.classList.add("btn-delete", "ml-td");
    let btnDeleteText = document.createElement("p");
    btnDeleteText.innerHTML = "Delete";
    btnDelete.append(btnDeleteText);
    let btnCheckbox = document.createElement("td");
    btnCheckbox.classList.add("ml-td");
    let btnCheckboxText = document.createElement("input");
    btnCheckboxText.type = "checkbox";
    btnCheckboxText.checked = e.isComplete;
    btnCheckbox.append(btnCheckboxText);

    dataList.append(
      fullNameText,
      typeText,
      publishText,
      reviewText,
      btnInfo,
      btnEdit,
      btnDelete,
      btnCheckbox
    );
    tableRow.append(dataList);

    // Кнопка удалить
    btnDelete.onclick = () => {
      deletePost(e.id);
    };
    // Кнопка checked
    btnCheckboxText.onclick = () => {
      checkedPost(e.id);
    };
    if (e.isComplete === true) {
      fullNameText.classList.add("checked-line");
    } else {
      fullNameText.classList.remove("checked-line");
    }
    // Кнопка Edit
    btnEdit.onclick = () => {
      editPost(e.id);
    };
    // Кнопка Edit Close
    closeModalEdit.onclick = () => {
      modalEdit.style.display = "none";
    };

    // Если данных нет, то вывод надписи "Неизвестно"
    if (e.fullname.length === 0) fullNameText.innerHTML = "Заполните поле";
    if (e.publish.length === 0) publishText.innerHTML = "Заполните поле";
    if (e.review.length === 0) reviewText.innerHTML = "Заполните поле";
    if (e.type.length === 0) typeText.innerHTML = "Заполните поле";
  });
}
get();

// Открыть модальное окно
addNew.onclick = () => {
  modalContainer.style.display = "block";
};
closeModal.onclick = () => {
  modalContainer.style.display = "none";
};

// Функция Add

let num = 3;
addPost.onclick = () => {
  let newData = {
    id: new Date().getTime(),
    fullname: num++ + "." + inpAddFullName.value,
    type: inpAddType.value,
    publish: inpAddPublish.value,
    review: inpAddReview.value,
    isComplete: false,
  };
  data.push(newData);
  inpAddFullName.value = "";
  inpAddType.value = "";
  inpAddPublish.value = "";
  inpAddReview.value = "";
  modalContainer.style.display = "none";
  get();
};

// Функция удалить
function deletePost(id) {
  data = data.filter((e) => {
    return e.id !== id;
  });
  get();
}

// Функция checked
function checkedPost(id) {
  data = data.map((e) => {
    if (e.id === id) e.isComplete = !e.isComplete;
    return e;
  });
  get();
}

// Функция Edit
let newId = null;
function editPost(id) {
  modalEdit.style.display = "block";
  let editData = data.find((e) => e.id === id);
  inpEditFullName.value = editData.fullname;
  inpEditType.value = editData.type;
  inpEditPublish.value = editData.publish;
  inpEditReview.value = editData.review;
  newId = id;
  console.log(editData);
}

// Функция Save
saveEditPost.onclick = () => {
  data = data.map((e) => {
    if (e.id === newId) {
      e.fullname = inpEditFullName.value;
      e.publish = inpEditPublish.value;
      e.review = inpEditReview.value;
      e.type = inpEditType.value;
    }
    return e;
  });
  get();
  modalEdit.style.display = "none";
};
