let data = {
    categories: JSON.parse(localStorage.getItem('categories')) || [],
    products: JSON.parse(localStorage.getItem('products')) || []
};

const loadData = () => {
    updateCategorySelect();
    updateDeleteCategorySelect();
    updateProductList();
};

const updateCategorySelect = () => {
    const categorySelect = document.getElementById('category-select');
    if (!categorySelect) return;

    categorySelect.innerHTML = ''; 
    data.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
};

const updateDeleteCategorySelect = () => {
    const categoryDeleteSelect = document.getElementById('category-delete-select');
    if (!categoryDeleteSelect) return;

    categoryDeleteSelect.innerHTML = ''; 
    data.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categoryDeleteSelect.appendChild(option);
    });
};

const categoryForm = document.getElementById('category-form');
if (categoryForm) {
    categoryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const categoryName = document.getElementById('category-name').value.trim();

        if (!categoryName) return;

        data.categories = JSON.parse(localStorage.getItem('categories')) || [];
        const newCategory = { id: data.categories.length + 1, name: categoryName };
        data.categories.push(newCategory);

        localStorage.setItem('categories', JSON.stringify(data.categories));
        updateCategorySelect();
        updateDeleteCategorySelect(); 
        categoryForm.reset();
    });
}

const deleteCategoryForm = document.getElementById('delete-category-form');
if (deleteCategoryForm) {
    deleteCategoryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const categoryName = document.getElementById('category-delete-select').value;

        if (!categoryName) return;

        data.categories = data.categories.filter(category => category.name !== categoryName);
        
        localStorage.setItem('categories', JSON.stringify(data.categories));

        updateCategorySelect();
        updateDeleteCategorySelect();

        alert('Категорію успішно видалено!');
    });
}

const productForm = document.getElementById('product-form');
if (productForm) {
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productName = document.getElementById('product-name').value.trim();
        const productCategory = document.getElementById('category-select').value;
        const productPrice = document.getElementById('product-price').value;
        const productDescription = document.getElementById('product-description').value.trim();
        const productImage = document.getElementById('product-image').files[0];

        if (!productName || !productCategory || !productPrice || !productImage) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const newProduct = {
                id: data.products.length + 1,
                name: productName,
                category: productCategory,
                price: productPrice,
                description: productDescription,
                image: e.target.result
            };
            data.products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(data.products));
            updateProductList();
            productForm.reset();
            alert('Товар успішно додано!');
        };
        reader.readAsDataURL(productImage);
    });
}

const loadCategoriesForMainPage = () => {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    let categories = JSON.parse(localStorage.getItem('categories')) || [];

    const allCategory = { name: 'Усі', id: 'all' };
    categories.unshift(allCategory);

    if (categories.length > 0) {
        displayCategories(categories);
    } else {
        const noCategoriesMessage = document.createElement('li');
        noCategoriesMessage.textContent = 'Категорії не знайдено.';
        categoryList.appendChild(noCategoriesMessage);
    }

    function displayCategories(categories) {
        categories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.textContent = category.name;
            listItem.setAttribute('data-category', category.name); 
            listItem.addEventListener('click', () => filterProducts(category.name)); 
            categoryList.appendChild(listItem);
        });
    }
};

const filterProducts = (categoryName) => {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';

    const products = JSON.parse(localStorage.getItem('products')) || [];

    const filteredProducts = categoryName === 'Усі'
        ? products
        : products.filter(product => product.category === categoryName);

    console.log('Відфільтровані товари:', filteredProducts);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p class="product-title">${product.name}</p>
            <p class="product-price">${product.price} грн</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart">У кошик</button>
        `;
        const addToCartButton = productCard.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
            alert(`Товар "${product.name}" додано до кошика!`);
        });

        productsContainer.appendChild(productCard);
    });

    if (filteredProducts.length === 0) {
        const noProductsMessage = document.createElement('p');
        noProductsMessage.textContent = 'Немає товарів у цій категорії';
        productsContainer.appendChild(noProductsMessage);
    }
};


window.addEventListener('load', loadCategoriesForMainPage);

const updateProductList = () => {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';
    data.products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p class="product-title">${product.name}</p>
            <p class="product-price">${product.price} грн</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart">У кошик</button>
        `;
        const addToCartButton = productCard.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
            alert(`Товар "${product.name}" додано до кошика!`);
        });

        productsContainer.appendChild(productCard);
    });
};

const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Товар "${product.name}" додано до кошика!`);
};

document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    alert("Ви вийшли!");
    window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", () => {
    const adminLink = document.getElementById("admin-link");

    if (adminLink) {
        adminLink.addEventListener("click", function (event) {
            const isAdmin = localStorage.getItem("isAdmin") === "true";

            if (!isAdmin) {
                event.preventDefault();
                alert("Доступ лише для адміна!");
            }
        });
    }
});

window.onload = loadData;
