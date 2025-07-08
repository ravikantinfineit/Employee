import React, { useEffect, useState } from "react";
import { InvoiceItem, invoiceItemTableColumns } from "./Items";
import { getInvoiceItems, deleteInvoiceItem } from "./ItemsApis";
import { getServices } from "../../Services/ServiceApi"; // Adjust path to your Units API
import { Service } from "../../Services/Services";
import DynamicTable from "../../../components/DynamicTable";
import Modal from "../../../components/Modal";
import InvoiceItemFormPage from "./ItemsFormPages";
import { useLocation } from "react-router-dom";

const InvoicesItemsListPage: React.FC = () => {
  const [invoicesItems, setInvoicesItems] = useState<InvoiceItem[]>([]);
  const [servicesMap, setServicesMap] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInvoiceItem, setEditingInvoiceItem] =
    useState<InvoiceItem | null>(null);
  const location = useLocation();
  const { client, invoice_id, invoice_sight } =
    location.state.invoice_details || {};

  useEffect(() => {
    loadServicesAndInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const loadServicesAndInvoices = async () => {
    const [invoicesData, servicesData] = await Promise.all([
      getInvoiceItems(invoice_id),
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
const totalAmount = invoicesItems.reduce((sum, item) => {
      const total = parseFloat(
        item.total_price !== undefined && item.total_price !== null
          ? String(item.total_price)
          : "0"
      );
      return sum + (isNaN(total) ? 0 : total);
    }, 0);
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {/* Top Title */}
      <h2 className="text-2xl font-bold mb-2">Service List</h2>

      {/* Header Info and Add Button */}
      <div className="flex justify-between items-start mb-6">
        {/* Left: Client Name and Site */}
        <div className="space-y-1">
          <div className="text-m text-gray-600">
            <span className="font-semibold">Client:</span>{" "}
            {client?.name || "N/A"}
          </div>
          <div className="text-m text-gray-600">
            <span className="font-semibold">Invoice Site:</span>{" "}
            {invoice_sight || "N/A"}
          </div>
        </div>

        {/* Right: Add Invoice Button */}
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
          {/* <InvoiceItemFormPage
            key={editingInvoiceItem?.invoice_item_id || "new"}
            initialValues={editingInvoiceItem || {}}
            onClose={() => setModalOpen(false)}
            onSuccess={handleFormSubmit}
          /> */}
          <InvoiceItemFormPage
            key={editingInvoiceItem?.invoice_item_id || "new"}
            initialValues={{
              ...location.state, // ✅ This gives client, invoice_id, invoice_sight
              ...editingInvoiceItem,
              //invoice_id: invoice_id, // ✅ Inject invoice_id into form
            }}
            onClose={() => setModalOpen(false)}
            onSuccess={handleFormSubmit}
          />
        </Modal>
      )}
       <div className="space-y-1 mt-6">
          <div className="text-m text-black-600">
           <h3 className="text-1xl font-bold mb-2"> Grand Total : {totalAmount || "N/A"}</h3>
          </div>
        </div>
    </div>
  );
};

export default InvoicesItemsListPage;
