// Sample bestselling products data
const bestsellingProducts = [
    {
        id: 1,
        name: "Wireless Earbuds Pro",
        currentPrice: 129.99,
        originalPrice: 199.99,
        image: "images/earbuds.jpg",
        category: "electronics",
        badge: "Best Seller",
        discount: 35
    },
    {
        id: 2,
        name: "Premium Leather Wallet",
        currentPrice: 49.99,
        originalPrice: 79.99,
        image: "images/wallet.jpg",
        category: "accessories",
        badge: "Top Rated",
        discount: 37
    },
    {
        id: 3,
        name: "Smart Fitness Watch",
        currentPrice: 199.99,
        originalPrice: 299.99,
        image: "images/smartwatch.jpg",
        category: "electronics",
        badge: "Best Seller",
        discount: 33
    },
    // Add more products as needed
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(bestsellingProducts);
    setupFilters();
    updateCartCount();
});

function displayProducts(products) {
    const grid = document.querySelector('.bestsellers-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <span class="product-badge">${product.badge}</span>
            <span class="discount-tag">-${product.discount}%</span>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.currentPrice.toFixed(2)}</span>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');

    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
    const category = document.getElementById('category-filter').value;
    const sortBy = document.getElementById('sort-filter').value;

    let filteredProducts = [...bestsellingProducts];

    // Apply category filter
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Apply sorting
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.currentPrice - b.currentPrice);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.currentPrice - a.currentPrice);
            break;
        case 'popularity':
            // In a real app, this would sort by actual popularity metrics
            filteredProducts.sort((a, b) => b.discount - a.discount);
            break;
    }

    displayProducts(filteredProducts);
}

function addToCart(productId) {
    const product = bestsellingProducts.find(p => p.id === productId);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Add visual feedback
    showAddedToCartFeedback();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function showAddedToCartFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'cart-feedback';
    feedback.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Added to cart!
    `;
    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 2000);
}