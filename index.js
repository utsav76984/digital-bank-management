// ===== GLOBAL VARIABLES =====
let products = JSON.parse(localStorage.getItem("products")) || [];
let editId = null;

// ===== ADD / UPDATE PRODUCT =====
function addProduct() {
  let title = document.getElementById("title").value.trim();
  let price = document.getElementById("price").value;
  let image = document.getElementById("image").value.trim();
  let category = document.getElementById("category").value.trim();

  if (title === "" || price === "") {
    alert("Product title and price are required");
    return;
  }

  if (editId !== null) {
    // UPDATE PRODUCT
    products = products.map(product =>
      product.id === editId
        ? { ...product, title, price, image, category }
        : product
    );
    editId = null;
  } else {
    // ADD PRODUCT
    let newProduct = {
      id: Date.now(), // unique id
      title,
      price: Number(price),
      image,
      category
    };
    products.push(newProduct);
  }

  localStorage.setItem("products", JSON.stringify(products));
  clearInputs();
  displayProducts(products);
}

// ===== DISPLAY PRODUCTS =====
function displayProducts(data) {
  let container = document.getElementById("productList");
  container.innerHTML = "";

  data.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image || 'https://via.placeholder.com/80'}" />
        <h4>${product.title}</h4>
        <p>Price: ₹${product.price}</p>
        <p>Category: ${product.category}</p>
        <button onclick="editProduct(${product.id})">Edit</button>
        <button onclick="deleteProduct(${product.id})">Delete</button>
      </div>
    `;
  });
}

// ===== EDIT PRODUCT =====
function editProduct(id) {
  let product = products.find(p => p.id === id);

  document.getElementById("title").value = product.title;
  document.getElementById("price").value = product.price;
  document.getElementById("image").value = product.image;
  document.getElementById("category").value = product.category;

  editId = id;
}

// ===== DELETE PRODUCT =====
function deleteProduct(id) {
  products = products.filter(product => product.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts(products);
}

// ===== SEARCH PRODUCT =====
function searchProduct() {
  let searchValue = document.getElementById("search").value.toLowerCase();
  let filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchValue)
  );
  displayProducts(filteredProducts);
}

// ===== SORT PRODUCT =====
function sortProduct(order) {
  let sortedProducts = [...products];

  if (order === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (order === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(sortedProducts);
}

// ===== FILTER BY CATEGORY =====
function filterCategory(cat) {
  if (cat === "") {
    displayProducts(products);
  } else {
    let filtered = products.filter(p => p.category === cat);
    displayProducts(filtered);
  }
}

// ===== CLEAR INPUTS =====
function clearInputs() {
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
  document.getElementById("category").value = "";
}

// ===== LOAD DATA ON PAGE LOAD =====
window.onload = function () {
  displayProducts(products);
};
