const featuredProducts = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        currentPrice: 129.99,
        originalPrice: 199.99,
        image: "images/headphones.jpg",
        category: "electronics",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Luxury Watch Collection",
        currentPrice: 299.99,
        originalPrice: 399.99,
        image: "images/watch.jpg",
        category: "accessories",
        badge: "New"
    },
    {
        id: 3,
        name: "Designer Sunglasses",
        currentPrice: 89.99,
        originalPrice: 149.99,
        image: "images/sunglasses.jpg",
        category: "accessories",
        badge: "Hot"
    },
    {
        id: 4,
        name: "Smart Fitness Tracker",
        currentPrice: 79.99,
        originalPrice: 99.99,
        image: "images/fitness-tracker.jpg",
        category: "electronics",
        badge: "Popular"
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function displayFeaturedProducts() {
    const container = document.querySelector('.featured-products');
    container.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <span class="product-badge">${product.badge}</span>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.currentPrice}</span>
                    <span class="original-price">$${product.originalPrice}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
    updateCartCount();
});