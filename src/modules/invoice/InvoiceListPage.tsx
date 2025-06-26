import React, { useEffect, useState } from "react";
import { Invoice, invoiceTableColumns } from "./Invoice";
import { getInvoices, deleteInvoice } from "./InvoiceApi";
import { getClients } from "../Clients/ClientApi";
import { Client } from "../Clients/Clients";
import DynamicTable from "../../components/DynamicTable";
import Modal from "../../components/Modal";
import InvoiceFormPage from "./InvoiceFormPage";
import { useLocation } from "react-router-dom";

const InvoicesListPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clientsMap, setClientsMap] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const location = useLocation();

  useEffect(() => {
    loadClientsAndInvoices();
  }, [location.state]);

  const loadClientsAndInvoices = async () => {
    const [invoicesData, clientsData] = await Promise.all([getInvoices(), getClients()]);

    const clientNameMap = clientsData.reduce((acc: Record<string, string>, client: Client) => {
      acc[client.client_id] = client.name;
      return acc;
    }, {});
    setClientsMap(clientNameMap);

    // Replace client_id with client_name for display
    const enrichedInvoices = invoicesData.map((invoice) => ({
      ...invoice,
      client_id: clientNameMap[invoice.client_id] || invoice.client_id,
    }));
    setInvoices(enrichedInvoices);
  };


  const handleDelete = async (invoice_id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      await deleteInvoice(invoice_id);
      await loadClientsAndInvoices();
    }
  };

  const handleEdit = (row: Record<string, any>) => {
    // Convert unit name back to unit_id using the map
    const invoiceToEdit = {
      ...row,
      client_id: Object.keys(clientsMap).find((key) => clientsMap[key] === row.client_id) || row.client_id,
    } as Invoice;

    setEditingInvoice(invoiceToEdit);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingInvoice(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setModalOpen(false);
    await loadClientsAndInvoices();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Service List</h2>
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
