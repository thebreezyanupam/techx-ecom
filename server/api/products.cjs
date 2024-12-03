const express = require('express');
const router = express.Router();

let products = [
    {
        id: 1,
        title: "Sony WH-1000XM4 Wireless Headphones",
        description: "Industry-leading noise cancellation, exceptional sound quality, and long battery life make these headphones perfect for music lovers.",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1600086827875-a63b01f1335c?w=500",
        category: "Headphones",
        featured: true,
        stock: 15
    },
    {
        id: 2,
        title: "Apple AirPods Pro",
        description: "Active noise cancellation, transparency mode, and spatial audio deliver an immersive sound experience.",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=500",
        category: "Earbuds",
        featured: true,
        stock: 20
    },
    {
        id: 3,
        title: "Samsung T7 Portable SSD - 1TB",
        description: "Ultra-fast external storage with read/write speeds up to 1,050/1,000 MB/s and secure encryption.",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1617469165786-8007eda3caa7?w=500",
        category: "Storage",
        featured: false,
        stock: 30
    },
    {
        id: 4,
        title: "Logitech MX Master 3",
        description: "Advanced wireless mouse with ultra-fast scrolling and ergonomic design for maximum productivity.",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
        category: "Accessories",
        featured: true,
        stock: 25
    },
    {
        id: 5,
        title: "LG 27-inch 4K UHD Monitor",
        description: "Crystal clear 4K resolution, HDR support, and professional color accuracy make this monitor perfect for content creators.",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=500",
        category: "Monitors",
        featured: true,
        stock: 10
    },
    {
        id: 6,
        title: "Razer BlackWidow V3 Mechanical Keyboard",
        description: "Premium mechanical switches, RGB lighting, and durable construction for the ultimate gaming experience.",
        price: 139.99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        category: "Gaming",
        featured: false,
        stock: 40
    },
    {
        id: 7,
        title: "Blue Yeti USB Microphone",
        description: "Professional-grade USB microphone perfect for streaming, podcasting, and video conferencing.",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500",
        category: "Audio",
        featured: false,
        stock: 18
    },
    {
        id: 8,
        title: "Anker PowerCore 26800 Power Bank",
        description: "Massive 26800mAh capacity, triple USB output, and fast charging capability for all your devices.",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
        category: "Accessories",
        featured: false,
        stock: 50
    },
    {
        id: 9,
        title: "Ring Light with Stand",
        description: "18-inch LED ring light with adjustable tripod stand and phone holder for perfect lighting in videos and photos.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1622223611896-1f091c81f47a?w=500",
        category: "Photography",
        featured: false,
        stock: 22
    },
    {
        id: 10,
        title: "DJI Mini 2 Drone",
        description: "Lightweight, portable drone with 4K camera, 31-minute flight time, and intelligent shooting modes.",
        price: 449.99,
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
        category: "Drones",
        featured: true,
        stock: 8
    },
    {
        id: 11,
        title: "Elgato Stream Deck",
        description: "15 customizable LCD keys for streamlined content creation and streaming control.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1561883088-039e53143d73?w=500",
        category: "Streaming",
        featured: false,
        stock: 15
    },
    {
        id: 12,
        title: "Philips Hue Starter Kit",
        description: "Smart LED lighting system with bridge and three color-changing bulbs for perfect ambiance.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1557005762-8ac11cbba85e?w=500",
        category: "Smart Home",
        featured: true,
        stock: 12
    }
];

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

module.exports = router; 