# Fit n Style - Fashion & Lifestyle E-commerce Website

A modern and responsive e-commerce website for fashion and lifestyle products. The website features a clean design, product listings, brand showcases, and a shopping cart system.

## Features

- Responsive design that works on all devices
- Product catalog with categories
- Brand showcase section
- Shopping cart functionality
- Newsletter subscription
- User reviews and ratings
- Mobile-friendly navigation
- Modern UI with smooth animations

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fit-n-style.git
```

2. Navigate to the project directory:
```bash
cd fit-n-style
```

3. Open the project in your preferred code editor.

4. Create the following directory structure for images:
```
images/
├── products/
├── brands/
└── hero-bg.jpg
```

5. Add your product and brand images to the respective directories.

6. Open `index.html` in your web browser to view the website.

## Project Structure

```
fit-n-style/
├── index.html
├── styles.css
├── script.js
├── README.md
└── images/
    ├── products/
    ├── brands/
    └── hero-bg.jpg
```

## Customization

### Adding Products
To add new products, modify the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        price: 29.99,
        image: "images/products/product.jpg",
        category: "category",
        brand: "Brand Name",
        rating: 4.5,
        reviews: 100
    }
    // Add more products...
];
```

### Adding Brands
To add new brands, modify the `brands` array in `script.js`:

```javascript
const brands = [
    {
        name: "Brand Name",
        logo: "images/brands/logo.png"
    }
    // Add more brands...
];
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/fit-n-style 