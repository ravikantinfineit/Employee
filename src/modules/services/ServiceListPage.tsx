import React, { useEffect, useState } from "react";
import { Service ,serviceTableColumns} from "./Services";
import { getServices, deleteService } from "./ServiceApi";
import DynamicTable from "../../components/DynamicTable";
import Modal from "../../components/Modal";
import ServiceFormPage from "./ServiceFormPage";
import { useLocation } from "react-router-dom";

const ServicesListPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const location = useLocation();

  useEffect(() => {
    loadServices();
  }, [location.state]);

  const loadServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  const handleDelete = async (service_id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteService(service_id);
      loadServices();
    }
  };

  const handleEdit = (row: Record<string, any>) => {
    setEditingService(row as Service);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setModalOpen(false);
    await loadServices();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Service List</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Service
        </button>
      </div>

      <DynamicTable
        columns={serviceTableColumns}
        data={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <ServiceFormPage
            key={editingService?.service_id || "new"}
            initialValues={editingService || {}}
            onClose={() => setModalOpen(false)}
            onSuccess={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default ServicesListPage;
