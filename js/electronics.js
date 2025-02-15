const electronicsProducts = [
    {
        id: 1,
        name: "Wireless Earbuds",
        price: 99.99,
        image: "images/earbuds.jpg",
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "images/smartwatch.jpg",
    },
    {
        id: 3,
        name: "4K Smart TV",
        price: 699.99,
        image: "images/tv.jpg",
    },
    {
        id: 4,
        name: "Laptop Pro",
        price: 1299.99,
        image: "images/laptop.jpg",
    }
];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(electronicsProducts);
    setupFilters();
    updateCartCount();
});

function displayProducts(products) {
    const grid = document.getElementById('electronics-products');
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
    const sortFilter = document.getElementById('sort-filter');
    sortFilter.addEventListener('change', () => {
        const sortedProducts = [...electronicsProducts];
        switch(sortFilter.value) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'popularity':
                // In a real app, this would sort by actual popularity metrics
                break;
        }
        displayProducts(sortedProducts);
    });
}

function addToCart(productId) {
    const product = electronicsProducts.find(p => p.id === productId);
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
