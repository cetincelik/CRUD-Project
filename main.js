// html elemanları
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// Düzenleme Seçenekleri
let editElement; // düzenleme yapılan öğeyi temsil eder
let editFlag = false; //düzenleme modunda olup olmadığını belirtir
let editID = ""; // benzersiz id

// form gönderildiğinde addItem fonksiyonunu çağır
form.addEventListener("submit", addItem);
// Temizle düğmesine tıklanıldığında clearItems fonksiyonunu çağır
clearBtn.addEventListener("click", clearItems);
// sayfa yüklenildiğinde setupItems fonksiyonunu çağır
window.addEventListener("DOMContentLoaded", setupItems);
//! fonksion
function addItem(e){
    e.preventDefault();
    const value = grocery.value; // inputun giriş değerini al 
    const id = new Date().getTime().toString();

    if (value !=="" && !editFlag){
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id"); // yeni bir veri kimliği oluşturur
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        // console.log(element);
        element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
            <button class="edit-btn" type="button">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete-btn" type="button">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        `;


        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);

        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);

        list.appendChild(element);
        // alert
        displayAlert("Başarıyla Eklendi", "success");
        //show container
        container.classList.add("show-container");
        //localStorage ekleme
        addToLocalStorage(id, value);
        //içeriği temizleme
        setBackToDefault();
    } else if ( value !== "" && editFlag){
        editElement.innerHTML = value;
        displayAlert("Değer Değiştirildi", "success");
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert("Lütfen bir değer giriniz.", "danger");
    }
} 

// alert fonksiyonu
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    console.log(alert);
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}
//Temizleme
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}
//silme işlemi
function deleteItem(e) {
 const element = e.currentTarget.parentElement.parentElement;
 // console.log(element);
 const id = element.dataset.id; // localStorage kullanılacak

 list.removeChild(element);

 if(list.children.length == 0) {
    container.classList.remove("show-container");
 }
 displayAlert("Eleman kaldırıldı", "danger");

 // yerel depodan kaldır
 removeFromLocalStorage(id);
}
//düzenleme fonksiyonu
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // console.log(editElement);
    //form değeri düzenlenen öğenin metniyle doldur
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id; //düzenlenen elemantin kimliği
    submitBtn.textContent = "edit";
}
//listeyi temizleme
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item); // her öğeyi listeden kaldırır
        });
    }
    container.classList.remove("show-container");
    displayAlert("Liste temizlendi", "danger");
    setBackToDefault();
}
//! locolStorage işlemleri
//yerel depoya öğe ekleme işlemi
function addToLocalStorage(id, value) {
    const grocery = { id, value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

// localStoragedan verileri alma işlemi
function getLocalStorage() {
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if ( item.id !== id){
            return item;
        }
    });
}
function editLocalStorage(id, value) {}

function setupItems() {
    let items = getLocalStorage();
}
