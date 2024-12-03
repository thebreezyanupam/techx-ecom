import { router } from '../utils/router.js';
import { authService } from '../services/auth.service.js';
import { invoiceService } from '../services/invoice.service.js';

const Orders = {
    orders: [
        {
            id: 'ORD-001',
            date: '2024-02-20',
            status: 'Delivered',
            total: 599.99,
            items: [
                { title: 'Sony WH-1000XM4', quantity: 1, price: 349.99 },
                { title: 'Apple AirPods Pro', quantity: 1, price: 249.99 }
            ]
        },
        {
            id: 'ORD-002',
            date: '2024-02-15',
            status: 'Processing',
            total: 159.99,
            items: [
                { title: 'Samsung T7 SSD', quantity: 1, price: 159.99 }
            ]
        }
    ],

    render: async () => {
        // Redirect if not logged in
        if (!authService.isLoggedIn()) {
            router.navigate('/login');
            return '';
        }

        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-3xl font-bold mb-8">Your Orders</h1>
                
                ${Orders.orders.length === 0 ? `
                    <div class="text-center py-12">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                        <p class="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
                        <div class="mt-6">
                            <a href="/products" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                Browse Products
                            </a>
                        </div>
                    </div>
                ` : `
                    <div class="space-y-6">
                        ${Orders.orders.map(order => `
                            <div class="bg-white rounded-lg shadow-md overflow-hidden" data-order-id="${order.id}">
                                <div class="px-6 py-4 border-b bg-gray-50">
                                    <div class="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <p class="text-sm text-gray-600">Order ID</p>
                                            <p class="font-medium">${order.id}</p>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-600">Order Date</p>
                                            <p class="font-medium">${new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-600">Status</p>
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                                                'bg-gray-100 text-gray-800'}">
                                                ${order.status}
                                            </span>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-600">Total Amount</p>
                                            <p class="font-medium">$${order.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="px-6 py-4">
                                    <h3 class="text-sm font-medium text-gray-900 mb-4">Order Items</h3>
                                    <div class="space-y-4">
                                        ${order.items.map(item => `
                                            <div class="flex items-center justify-between">
                                                <div class="flex-1">
                                                    <h4 class="text-sm font-medium text-gray-900">${item.title}</h4>
                                                    <p class="text-sm text-gray-500">Quantity: ${item.quantity}</p>
                                                </div>
                                                <p class="text-sm font-medium text-gray-900">$${item.price.toFixed(2)}</p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                                
                                <div class="px-6 py-4 bg-gray-50 border-t">
                                    <div class="flex justify-between items-center">
                                        <button class="text-sm text-blue-600 hover:text-blue-800 track-order-btn">
                                            Track Order
                                        </button>
                                        <button class="text-sm text-gray-600 hover:text-gray-800 download-invoice-btn">
                                            Download Invoice
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
    },

    init: () => {
        // Handle button clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('track-order-btn')) {
                e.preventDefault();
                alert('Order tracking feature coming soon!');
            } 
            else if (e.target.classList.contains('download-invoice-btn')) {
                e.preventDefault();
                const orderElement = e.target.closest('[data-order-id]');
                const orderId = orderElement.dataset.orderId;
                const order = Orders.orders.find(o => o.id === orderId);
                
                if (order) {
                    try {
                        // Add customer details from auth service
                        order.customerName = authService.getUser()?.name;
                        order.customerEmail = authService.getUser()?.email;
                        
                        // Generate and download the invoice
                        invoiceService.generateInvoice(order);
                    } catch (error) {
                        console.error('Error generating invoice:', error);
                        alert('Failed to generate invoice. Please try again.');
                    }
                }
            }
        });
    }
};

export default Orders; 