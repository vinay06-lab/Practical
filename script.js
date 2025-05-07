// Sample product data with model images
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "images/products/tshirt.jpg",
        modelImage: "images/models/model1.jpg",
        category: "men",
        brand: "Nike",
        rating: 4.5,
        reviews: 128,
        description: "Premium cotton t-shirt with a modern fit"
    },
    {
        id: 2,
        name: "Summer Dress",
        price: 49.99,
        image: "images/products/dress.jpg",
        modelImage: "images/models/model2.jpg",
        category: "women",
        brand: "Zara",
        rating: 4.8,
        reviews: 256,
        description: "Light and flowy summer dress with floral pattern"
    },
    {
        id: 3,
        name: "Leather Watch",
        price: 99.99,
        image: "images/products/watch.jpg",
        modelImage: "images/models/model3.jpg",
        category: "accessories",
        brand: "Fossil",
        rating: 4.3,
        reviews: 89,
        description: "Classic leather strap watch with minimalist design"
    },
    {
        id: 4,
        name: "Denim Jacket",
        price: 79.99,
        image: "images/products/jacket.jpg",
        modelImage: "images/models/model4.jpg",
        category: "men",
        brand: "Levi's",
        rating: 4.6,
        reviews: 167,
        description: "Classic denim jacket with modern styling"
    },
    {
        id: 5,
        name: "Summer Hat",
        price: 24.99,
        image: "images/products/hat.jpg",
        modelImage: "images/models/model5.jpg",
        category: "accessories",
        brand: "H&M",
        rating: 4.2,
        reviews: 45,
        description: "Straw hat perfect for summer days"
    }
];

// Sample brand data
const brands = [
    {
        name: "Nike",
        logo: "images/brands/nike.png"
    },
    {
        name: "Adidas",
        logo: "images/brands/adidas.png"
    },
    {
        name: "Zara",
        logo: "images/brands/zara.png"
    },
    {
        name: "H&M",
        logo: "images/brands/hm.png"
    }
];

// Function to create product cards with model images
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}" data-brand="${product.brand.toLowerCase()}" data-price="${product.price}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <img src="${product.modelImage}" alt="${product.name} on model" class="model-image">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="brand">${product.brand}</p>
                <div class="rating">
                    ${createStarRating(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <p class="price">$${product.price}</p>
                <p class="description">${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// Function to create star rating
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Function to create brand cards
function createBrandCard(brand) {
    return `
        <div class="brand-card">
            <img src="${brand.logo}" alt="${brand.name}">
        </div>
    `;
}

// Function to load featured products
function loadFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.innerHTML = products.map(product => createProductCard(product)).join('');
    }
}

// Function to load products with filtering
function loadProducts() {
    const productsContainer = document.querySelector('.products-container');
    if (productsContainer) {
        productsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
        initializeFilters();
    }
}

// Function to initialize filters
function initializeFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const brandFilter = document.getElementById('brand-filter');
    const priceFilter = document.getElementById('price-filter');

    if (categoryFilter && brandFilter && priceFilter) {
        categoryFilter.addEventListener('change', filterProducts);
        brandFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
    }
}

// Function to filter products
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const brand = document.getElementById('brand-filter').value;
    const price = document.getElementById('price-filter').value;

    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardBrand = card.dataset.brand;
        const cardPrice = parseFloat(card.dataset.price);

        const categoryMatch = category === 'all' || cardCategory === category;
        const brandMatch = brand === 'all' || cardBrand === brand;
        let priceMatch = true;

        if (price !== 'all') {
            const [min, max] = price.split('-').map(Number);
            if (max) {
                priceMatch = cardPrice >= min && cardPrice <= max;
            } else {
                priceMatch = cardPrice >= min;
            }
        }

        if (categoryMatch && brandMatch && priceMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Shopping cart functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification('Product added to cart!');
    }
}

function updateCartCount() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', cart.length);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            showNotification('Thank you for subscribing!');
            this.reset();
        }
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    loadProducts();
    loadBrands();
    
    // Add mobile menu button
    const navbar = document.querySelector('.navbar');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.onclick = toggleMobileMenu;
    navbar.insertBefore(mobileMenuButton, navbar.firstChild);

    // Initialize cart count
    let cartCount = 0;
    const cartIcon = document.querySelector('.cart-icon');

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartIcon.setAttribute('data-count', cartCount);
            
            // Add animation to the button
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
            
            // Show notification
            showNotification('Item added to cart!');
        });
    });

    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view button');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            showQuickView(productName, productPrice);
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing!');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.product-card, .model-card, .newsletter-content').forEach(el => {
        observer.observe(el);
    });

    // Helper Functions
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function showQuickView(name, price) {
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${name}</h2>
                <p class="price">${price}</p>
                <div class="product-details">
                    <p>Product Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div class="size-options">
                        <h3>Select Size</h3>
                        <div class="size-buttons">
                            <button>S</button>
                            <button>M</button>
                            <button>L</button>
                            <button>XL</button>
                        </div>
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 