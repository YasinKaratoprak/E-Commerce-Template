const mensProducts = [
    {
        id: 1,
        name: "Classic Denim Jeans",
        price: 59.99,
        image: "../images/men/jeans.jpg",
        category: "clothing"
    },
    {
        id: 2,
        name: "Leather Dress Shoes",
        price: 89.99,
        image: "../images/men/dress-shoes.jpg",
        category: "shoes"
    },
    {
        id: 3,
        name: "Cotton Casual Shirt",
        price: 34.99,
        image: "images/men/casual-shirt.jpg",
        category: "clothing"
    },
    {
        id: 4,
        name: "Leather Belt",
        price: 29.99,
        image: "images/men/belt.jpg",
        category: "accessories"
    },
    {
        id: 5,
        name: "Sports Sneakers",
        price: 79.99,
        image: "images/men/sneakers.jpg",
        category: "shoes"
    },
    {
        id: 6,
        name: "Formal Blazer",
        price: 129.99,
        image: "images/men/blazer.jpg",
        category: "clothing"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(mensProducts);
    setupFilters();
    updateCartCount();
});

function displayProducts(products) {
    const grid = document.getElementById('mens-products');
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
        let filtered = [...mensProducts];
        
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
    const product = mensProducts.find(p => p.id === productId);
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
