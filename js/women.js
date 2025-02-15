const womensProducts = [
    {
        id: 101,
        name: "Summer Floral Dress",
        price: 49.99,
        image: "images/women/dress.jpg",
        category: "clothing"
    },
    {
        id: 102,
        name: "High Heel Sandals",
        price: 69.99,
        image: "images/women/sandals.jpg",
        category: "shoes"
    },
    {
        id: 103,
        name: "Designer Handbag",
        price: 89.99,
        image: "images/women/handbag.jpg",
        category: "accessories"
    },
    {
        id: 104,
        name: "Skinny Jeans",
        price: 54.99,
        image: "images/women/jeans.jpg",
        category: "clothing"
    },
    {
        id: 105,
        name: "Silver Necklace",
        price: 39.99,
        image: "images/women/necklace.jpg",
        category: "accessories"
    },
    {
        id: 106,
        name: "Casual Blouse",
        price: 34.99,
        image: "images/women/blouse.jpg",
        category: "clothing"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(womensProducts);
    setupFilters();
    updateCartCount();
});

function displayProducts(products) {
    const grid = document.getElementById('womens-products');
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
        let filtered = [...womensProducts];
        
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
            case 'popularity':
                // Default sorting (could be enhanced with actual popularity metrics)
                break;
        }

        displayProducts(filtered);
    }

    categoryFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);
}

function addToCart(productId) {
    const product = womensProducts.find(p => p.id === productId);
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
