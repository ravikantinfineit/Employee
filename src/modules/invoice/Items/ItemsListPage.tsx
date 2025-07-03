import React, { useEffect, useState } from "react";
import { InvoiceItem, invoiceItemTableColumns } from "./Items";
import { getInvoiceItems, deleteInvoiceItem } from "./ItemsApis";
import { getServices } from "../../Services/ServiceApi"; // Adjust path to your Units API
import { Service } from "../../Services/Services"; 
import DynamicTable from "../../../components/DynamicTable";
import Modal from "../../../components/Modal";
import InvoiceItemFormPage from "./ItemsFormPages";
import { useLocation, } from "react-router-dom";

const InvoicesItemsListPage: React.FC = () => {
  const [invoicesItems, setInvoicesItems] = useState<InvoiceItem[]>([]);
  const [servicesMap, setServicesMap] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInvoiceItem, setEditingInvoiceItem] = useState<InvoiceItem | null>(null);
  const location = useLocation();


  useEffect(() => {
    loadServicesAndInvoices();
  }, [location.state]);

  const loadServicesAndInvoices = async () => {
    const [invoicesData, servicesData] = await Promise.all([
      getInvoiceItems(),
      getServices(),
    ]);

    const serviceNameMap = servicesData.reduce(
      (acc: Record<string, string>, service: Service) => {
        acc[service.service_id] = service.service_name;
        return acc;
      },
      {}
    );
    setServicesMap(serviceNameMap);

    // Replace client_id with client_name for display
    const enrichedInvoicesItems = invoicesData.map((invoice) => ({
      ...invoice,
      service_id: serviceNameMap[invoice.service_id] || invoice.service_id,
    }));
    setInvoicesItems(enrichedInvoicesItems);
  };

  const handleDelete = async (invoice_id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      await deleteInvoiceItem(invoice_id);
      await loadServicesAndInvoices();
    }
  };

  const handleEdit = (row: Record<string, any>) => {
    // Convert unit name back to unit_id using the map
    const invoiceItemToEdit = {
      ...row,
      service_id:
        Object.keys(servicesMap).find(
          (key) => servicesMap[key] === row.service_id
        ) || row.service_id,
    } as InvoiceItem;

    setEditingInvoiceItem(invoiceItemToEdit);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingInvoiceItem(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setModalOpen(false);
    await loadServicesAndInvoices();
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
        columns={invoiceItemTableColumns}
        data={invoicesItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <InvoiceItemFormPage
            key={editingInvoiceItem?.invoice_item_id || "new"}
            initialValues={editingInvoiceItem || {}}
            onClose={() => setModalOpen(false)}
            onSuccess={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default InvoicesItemsListPage;
