const API_URL = 'http://localhost:3001';

export const ProductsService = {
    async getAllProducts() {
        try {
            const response = await fetch(`${API_URL}/api/products`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    async getProduct(id) {
        try {
            const response = await fetch(`${API_URL}/api/products/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    }
}; 