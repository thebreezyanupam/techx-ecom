import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

class InvoiceService {
    generateInvoice(order) {
        const doc = new jsPDF();
        
        // Add company logo/header
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text('TechX', 20, 20);
        
        // Add invoice details
        doc.setFontSize(12);
        doc.text('INVOICE', 20, 40);
        doc.setFontSize(10);
        doc.text(`Invoice Number: ${order.id}`, 20, 50);
        doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 20, 55);
        doc.text(`Status: ${order.status}`, 20, 60);
        
        // Add customer details
        doc.text('Bill To:', 20, 70);
        doc.setFont(undefined, 'normal');
        doc.text(`${order.customerName || 'Customer'}`, 20, 75);
        doc.text(`${order.customerEmail || ''}`, 20, 80);
        
        // Add items table
        const tableColumn = ['Item', 'Quantity', 'Price', 'Total'];
        const tableRows = order.items.map(item => [
            item.title,
            item.quantity,
            `$${item.price.toFixed(2)}`,
            `$${(item.quantity * item.price).toFixed(2)}`
        ]);
        
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 90,
            theme: 'grid',
            styles: {
                fontSize: 8,
                cellPadding: 3
            },
            headStyles: {
                fillColor: [66, 139, 202],
                textColor: 255
            }
        });
        
        // Add total
        const finalY = doc.lastAutoTable.finalY || 90;
        doc.text(`Subtotal: $${order.total.toFixed(2)}`, 150, finalY + 10);
        doc.text(`Tax: $${(order.total * 0.1).toFixed(2)}`, 150, finalY + 15);
        doc.setFont(undefined, 'bold');
        doc.text(`Total: $${(order.total * 1.1).toFixed(2)}`, 150, finalY + 20);
        
        // Add footer
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        doc.text('Thank you for shopping with TechX!', 20, finalY + 30);
        doc.text('For any questions, please contact support@techx.com', 20, finalY + 35);
        
        // Save the PDF
        doc.save(`Invoice-${order.id}.pdf`);
    }
}

export const invoiceService = new InvoiceService(); 