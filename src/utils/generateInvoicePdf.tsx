// utils/generateInvoicePdf.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface InvoiceData {
  invoiceId: string;
  clientName: string;
  clientAddress: string;
  companyName: string;
  companyAddress: string;
  items: InvoiceItem[];
  taxRate: number;
}

export const generateInvoicePDF = (data: InvoiceData) => {
  const doc = new jsPDF();

  // Company Name and Address (Top Right)
  doc.setFontSize(12);
  doc.text(data.companyName, 150, 20, { align: "right" });
  doc.text(data.companyAddress, 150, 26, { align: "right" });

  // Invoice Title and ID
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 14, 20);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice #${data.invoiceId}`, 14, 28);

  // Bill To
  doc.setFont("helvetica", "bold");
  doc.text("Bill To:", 14, 40);
  doc.setFont("helvetica", "normal");
  doc.text(data.clientName, 14, 46);
  doc.text(data.clientAddress, 14, 52);

  // Table
  const tableBody = data.items.map((item) => [
    item.description,
    item.quantity,
    `$${item.unit_price.toFixed(2)}`,
    `$${item.total.toFixed(2)}`,
  ]);

  autoTable(doc, {
    head: [["Description", "Quantity / Size", "Unit Price", "Total"]],
    body: tableBody,
    startY: 65,
    theme: "grid",
    styles: { halign: "left" },
    headStyles: { fillColor: [220, 220, 220] },
  });

  // Totals
  const subtotal = data.items.reduce((sum, item) => sum + item.total, 0);
  const tax = data.taxRate;
  const total = subtotal + tax;

  // Get the last Y position after the table
  // @ts-ignore
  const finalY = (doc as any).lastAutoTable?.finalY || 80;

  doc.text(`Subtotal`, 150, finalY + 10, { align: "right" });
  doc.text(`$${subtotal.toFixed(2)}`, 200, finalY + 10, { align: "right" });

  doc.text(`Tax`, 150, finalY + 16, {
    align: "right",
  });
  doc.text(`$${tax.toFixed(2)}`, 200, finalY + 16, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.text(`Total`, 150, finalY + 24, { align: "right" });
  doc.text(`$${total.toFixed(2)}`, 200, finalY + 24, { align: "right" });

  // Save
  doc.save(`Invoice_${data.invoiceId}.pdf`);
};
