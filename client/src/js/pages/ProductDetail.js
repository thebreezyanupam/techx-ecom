import { ProductsService } from '../api/products.service.js';
import { cartService } from '../services/cart.service.js';
import { showLoading, hideLoading } from '../utils/loading.js';

const ProductDetail = {
    render: async () => {
        try {
            showLoading();
            const id = parseInt(window.location.pathname.split('/products/')[1]);
            const product = await ProductsService.getProduct(id);
            hideLoading();

            if (!product) {
                return `
                    <div class="max-w-7xl mx-auto px-4 py-12 text-center">
                        <p class="text-gray-600">Product not found</p>
                        <a href="/products" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
                            ← Back to Products
                        </a>
                    </div>
                `;
            }

            return `
                <div class="max-w-7xl mx-auto px-4 py-12">
                    <a href="/products" class="inline-block mb-8 text-blue-600 hover:text-blue-800">
                        ← Back to Products
                    </a>
                    
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div class="md:flex">
                            <div class="md:w-1/2">
                                <div class="h-96 p-8 bg-gray-50">
                                    <img 
                                        src="${product.image}" 
                                        alt="${product.title}"
                                        class="w-full h-full object-contain"
                                    >
                                </div>
                            </div>
                            <div class="md:w-1/2 p-8">
                                <div class="mb-4">
                                    <span class="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                                        ${product.category}
                                    </span>
                                </div>
                                <h1 class="text-3xl font-bold mb-4">${product.title}</h1>
                                <p class="text-gray-600 mb-8">${product.description}</p>
                                
                                <div class="mb-8">
                                    <div class="text-3xl font-bold text-blue-600 mb-2">
                                        $${product.price}
                                    </div>
                                    <div class="text-sm text-gray-600">
                                        ${product.stock} units in stock
                                    </div>
                                </div>

                                <button 
                                    id="add-to-cart"
                                    class="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
                                    ${product.stock === 0 ? 'disabled' : ''}
                                >
                                    ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error rendering product:', error);
            return `
                <div class="max-w-7xl mx-auto px-4 py-12 text-center">
                    <p class="text-red-600">Failed to load product. Please try again later.</p>
                </div>
            `;
        }
    },

    init: () => {
        const addToCartBtn = document.getElementById('add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', async () => {
                const id = parseInt(window.location.pathname.split('/products/')[1]);
                const product = await ProductsService.getProduct(id);
                
                if (product) {
                    cartService.addToCart(product);
                    
                    // Show feedback
                    addToCartBtn.textContent = 'Added to Cart!';
                    addToCartBtn.disabled = true;
                    setTimeout(() => {
                        addToCartBtn.textContent = 'Add to Cart';
                        addToCartBtn.disabled = false;
                    }, 2000);
                }
            });
        }
    }
};

export default ProductDetail; 