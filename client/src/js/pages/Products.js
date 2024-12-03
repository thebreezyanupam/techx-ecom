import { ProductsService } from '../api/products.service.js';
import { showLoading, hideLoading, showError, hideError } from '../utils/loading.js';

const Products = {
    render: async () => {
        try {
            showLoading();
            const products = await ProductsService.getAllProducts();
            hideLoading();
            hideError();

            if (!products.length) {
                return `
                    <div class="max-w-7xl mx-auto px-4 py-12 text-center">
                        <p class="text-gray-600">No products found.</p>
                    </div>
                `;
            }

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 class="text-3xl font-bold mb-8 text-center">Our Products</h1>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        ${products.map(product => `
                            <a 
                                href="/products/${product.id}" 
                                class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div class="h-48 p-4 bg-gray-100">
                                    <img 
                                        src="${product.image}" 
                                        alt="${product.title}"
                                        class="w-full h-full object-contain"
                                    >
                                </div>
                                <div class="p-4">
                                    <h2 class="text-lg font-semibold mb-2 line-clamp-2">${product.title}</h2>
                                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">${product.description}</p>
                                    <div class="flex justify-between items-center">
                                        <span class="text-xl font-bold text-blue-600">$${product.price}</span>
                                        <span class="text-blue-600 hover:text-blue-800">
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error rendering products:', error);
            showError();
            return `
                <div class="max-w-7xl mx-auto px-4 py-12 text-center">
                    <p class="text-red-600">Failed to load products. Please try again later.</p>
                </div>
            `;
        }
    }
};

export default Products; 