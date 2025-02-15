const marketProducts = [
    {
        id: 1,
        name: "Organic Coffee",
        price: 12.99,
        image: "images/coffee.jpg",
        category: "beverages"
    },
    {
        id: 2,
        name: "Fresh Fruits Pack",
        price: 24.99,
        image: "images/fruits.jpg",
        category: "food"
    },
    {
        id: 3,
        name: "Cleaning Set",
        price: 19.99,
        image: "images/cleaning.jpg",
        category: "household"
    },
    {
        id: 4,
        name: "Breakfast Cereals",
        price: 8.99,
        image: "images/cereals.jpg",
        category: "food"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(marketProducts);
    setupFilters();
    updateCartCount();
});

function displayProducts(products) {
    const grid = document.getElementById('market-products');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');

    function filterProducts() {
        let filtered = [...marketProducts];
        
        if (categoryFilter.value !== 'all') {
            filtered = filtered.filter(p => p.category === categoryFilter.value);
        }

        switch(sortFilter.value) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
        }

        displayProducts(filtered);
    }

    categoryFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);
}

function addToCart(productId) {
    const product = marketProducts.find(p => p.id === productId);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}
