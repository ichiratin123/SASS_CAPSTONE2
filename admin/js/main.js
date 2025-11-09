import ApiServices from "./classes/apiServices.js";
import Prodcuct from "./classes/product.js";
import Validation from "./classes/validation.js";

const api = new ApiServices();
const validation2 = new Validation();
let mode = "";
let currentEditId = null;
let productList = [];

const getList = () => { 
    const promise = api.fetchData();
    promise
        .then((result) => { 
            productList = result.data;
            renderList(productList);
        })
        .catch((e) => { 
            console.log(e);
        });
}
getList();

export const getEle = (id) => document.getElementById(id);

const resetForm = () => { 
  getEle("productForm").reset();
}


const getInfo = () => { 
    const name = getEle("namesp").value;
    const price = getEle("pricesp").value;
    const screen = getEle("screensp").value;
    const back = getEle("backsp").value;
    const front = getEle("frontsp").value;
    const img = getEle("imgsp").value;
    const desc = getEle("descsp").value;
    const type = getEle("typesp").value;

    let isvalid = true;

    isvalid &= validation2.checkEmp(name, "nametb", "tên") && validation2.checkLength(name, "nametb", "3-50 kí tự", 3, 50);
    isvalid &= validation2.checkEmp(price, "pricetb", "giá") && validation2.checkNum(price, "pricetb", "giá");
    isvalid &= validation2.checkEmp(screen, "screentb", "screen") && validation2.checkNum(screen, "screentb", "screen");
    isvalid &= validation2.checkEmp(back, "backtb", "back camera") && validation2.checkNum(back, "backtb", "back camera");
    isvalid &= validation2.checkEmp(front, "fronttb", "front camera") && validation2.checkNum(front, "fronttb", "front camera");
    isvalid &= validation2.checkEmp(img, "imgtb", "hình");
    isvalid &= validation2.checkEmp(desc, "desctb", "description");
    isvalid &= validation2.checkType(type, "typetb", "brand");

    if (!isvalid) return null;
    const id = mode === "edit" ? currentEditId : null;
    const product = new Prodcuct(id, name, price, screen, back, front, img, desc, type);

    return product;
}

const renderList = (data) => {
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const list = data[i];
    contentHTML += `
             <tr data-id="${list.id}">
            <td>${list.id}</td>
            <td>${list.name}</td>
            <td>${list.price}</td>
            <td>${list.screen}</td>
            <td>${list.backCamera}</td>
            <td>${list.frontCamera}</td>
            <td><img src=${list.img} alt="" width="50" /></td>
            <td>${list.desc}</td>
            <td>${list.type}</td>
      <td>
        <button class="btn-delete" id="btnDelete" aria-label="Delete" onclick="deleteProduct('${list.id}')"><i class="fa-solid fa-trash"></i></button>
        <button class="btn-edit" id="btnEdit" data-toggle="modal" data-target="#myModal" aria-label="Edit" onclick="editProduct('${list.id}')"><i class="fa-solid fa-gear"></i></button>
      </td>
        </tr>
    `;
  }
  getEle("danhSachSP").innerHTML = contentHTML;
};

// add 

const addProduct = () => { 
    const data = getInfo();
    if (data !== null) { 
        const promise = api.addData(data);
        promise.then(() => { 
            getList();
            document.getElementsByClassName("close")[0].click();
        }).catch((e) => {
            console.log(e);
        })
    }
}

getEle("open__modal").onclick = () => { 
    getEle("modalTitle").innerHTML = "Add Product";
    getEle("btnAdd").innerHTML = "Add";
    mode = "add";
    currentEditId = null;
    resetForm();
}

getEle("btnAdd").onclick = () => {
    if (mode === "add") {
        addProduct();
    } else { 
        updateProduct();
    }
    
}

// Edit

const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

const editProduct = (id) => {
    overlay.classList.add('active');
    modal.classList.add('active');
    getEle("modalTitle").innerHTML = "Edit Product";
    getEle("btnAdd").innerHTML = "Edit";
    mode = "edit";
    currentEditId = id;
    const promise = api.fetchDataById(id);
    promise
        .then((result) => { 
            const p = result.data;
            getEle("namesp").value = p.name;
            getEle("pricesp").value = p.price;
            getEle("screensp").value = p.screen;
            getEle("backsp").value = p.backCamera;
            getEle("frontsp").value = p.frontCamera;
            getEle("imgsp").value = p.img;
            getEle("descsp").value = p.desc;
            getEle("typesp").value = p.type;
        })
        .catch((e) => { 
            console.log(e);
        
        });
}

window.editProduct = editProduct;

// update
const updateProduct = () => { 
    const data = getInfo();
    if (data !== null) { 
        const promise = api.updateData(data);

        promise
            .then(() => { 
                getList();
                document.getElementsByClassName("close")[0].click();
                mode = "add";
                currentEditId = null;
            })
            .catch((e) => { 
                console.log(e);
            });
    }
}

// delete
const deleteProduct = (id) => { 
    const promise = api.deleteData(id);

    promise
        .then((result) => { 
            getList();
            
        })
        .catch((e) => { 
            console.log(e);
            
        });
    
}
window.deleteProduct = deleteProduct;

// search
const searchProducts = (keyword) => {
    if (!keyword.trim()) {
        renderList(productList);
        return;
    }

    const searchResults = productList.filter(product => {
        const searchString = `${product.name} ${product.type}`.toLowerCase();
        return searchString.includes(keyword.toLowerCase());
    });

    renderList(searchResults);
};

document.querySelector('.find__btn').addEventListener('click', () => {
    searchProducts(document.querySelector('.find__input').value);
});


// sort
const sortProductsByPrice = (products, ascending = true) => {
    return [...products].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return ascending ? priceA - priceB : priceB - priceA;
    });
};

getEle("SapXepTang").addEventListener("click", () => {
    const sortedProducts = sortProductsByPrice(productList, true);
    renderList(sortedProducts);
});

getEle("SapXepGiam").addEventListener("click", () => {
    const sortedProducts = sortProductsByPrice(productList, false);
    renderList(sortedProducts);
});