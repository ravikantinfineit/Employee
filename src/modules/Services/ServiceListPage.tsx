import React, { useEffect, useState } from "react";
import { Service, serviceTableColumns } from "./Services";
import { getServices, deleteService } from "./ServiceApi";
import { getUnits } from "../Units/UnitApi";
import { Unit } from "../Units/Units";
import DynamicTable from "../../components/DynamicTable";
import Modal from "../../components/Modal";
import ServiceFormPage from "./ServiceFormPage";
import { useLocation } from "react-router-dom";

const ServicesListPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [unitsMap, setUnitsMap] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const location = useLocation();

  useEffect(() => {
    loadUnitsAndServices();
  }, [location.state]);

  const loadUnitsAndServices = async () => {
    const [servicesData, unitsData] = await Promise.all([getServices(), getUnits()]);

    const unitNameMap = unitsData.reduce((acc: Record<string, string>, unit: Unit) => {
      acc[unit.unit_id] = unit.name;
      return acc;
    }, {});
    setUnitsMap(unitNameMap);

    // Replace unit_id with unit_name for display
    const enrichedServices = servicesData.map((service) => ({
      ...service,
      unit_id: unitNameMap[service.unit_id] || service.unit_id,
    }));
    setServices(enrichedServices);
  };

  const handleDelete = async (service_id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteService(service_id);
      await loadUnitsAndServices();
    }
  };

  const handleEdit = (row: Record<string, any>) => {
    // Convert unit name back to unit_id using the map
    const serviceToEdit = {
      ...row,
      unit_id: Object.keys(unitsMap).find((key) => unitsMap[key] === row.unit_id) || row.unit_id,
    } as Service;

    setEditingService(serviceToEdit);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setModalOpen(false);
    await loadUnitsAndServices();
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
