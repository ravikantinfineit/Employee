import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Invoice, invoiceTableColumns } from "./Invoice";
import { getInvoices, deleteInvoice } from "./InvoiceApi";
import { getClients } from "../Clients/ClientApi";
import { Client } from "../Clients/Clients";

import DynamicTable from "../../components/DynamicTable";
import Modal from "../../components/Modal";
import InvoiceFormPage from "./InvoiceFormPage";

const InvoicesListPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clientsMap, setClientsMap] = useState<Record<string, Client>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    const [invoicesData, clientsData] = await Promise.all([
      getInvoices(),
      getClients(),
    ]);

    const clientMap = clientsData.reduce<Record<string, Client>>((acc, client) => {
      acc[client.client_id] = client;
      return acc;
    }, {});

    setClientsMap(clientMap);

    const enrichedInvoices = invoicesData.map((invoice) => ({
      ...invoice,
      client: clientMap[invoice.client_id] || {
        client_id: invoice.client_id,
        name: "Unknown",
      },
    }));

    setInvoices(enrichedInvoices);
  }, []);

  useEffect(() => {
    loadData();
  }, [location.state, loadData]);

  const handleDelete = async (invoice_id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      await deleteInvoice(invoice_id);
      await loadData();
    }
  };

  const handleEdit = (row: Record<string, any>) => {
    const invoice = row as Invoice;
    const invoiceToEdit: Invoice = {
      ...invoice,
      invoice_id: invoice.invoice_id || invoice.id || '',
      client_id: invoice.client?.client_id ?? invoice.client_id,
    };

    if (!invoiceToEdit.invoice_id) {
      console.error("Invoice missing ID:", invoice);
      return;
    }

    setEditingInvoice(invoiceToEdit);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingInvoice(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setModalOpen(false);
    await loadData();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Invoice List</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Invoice
        </button>
      </div>

      <DynamicTable
        columns={invoiceTableColumns}
        data={invoices}
        onEdit={handleEdit}
        onDelete={handleDelete}
        customActions={[
          {
            label: "View",
            colorClass: "bg-indigo-500",
            onClick: (item) => navigate("/dashboard/invoices/items", { state: { invoice_details: item }, }),
          },
          {
            label: "Download",
            colorClass: "bg-yellow-500",
            onClick: (item) => console.log("Download invoice:", item),
          },
        ]}
      />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <InvoiceFormPage
            key={editingInvoice?.invoice_id || "new"}
            initialValues={editingInvoice || {}}
            onClose={() => setModalOpen(false)}
            onSuccess={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default InvoicesListPage;