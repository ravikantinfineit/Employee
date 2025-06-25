import React, { useEffect, useState } from "react";
import { Unit ,unitTableColumns} from "./Units";
import { getUnits, deleteUnit } from "./UnitApi";
import DynamicTable from "../../components/DynamicTable";
import Modal from "../../components/Modal";
import UnitFormPage from "./UnitFormPage";
import { useLocation } from "react-router-dom";

const UnitsListPage: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const location = useLocation();
  console.log("UnitsListPage location state:", location);
  useEffect(() => {
    loadUnits();
  }, [location.state]);

  const loadUnits = async () => {
    const data = await getUnits();
    setUnits(data);
  };

  const handleDelete = async (unit_id: string) => {
    if (window.confirm("Are you sure you want to delete this unit?")) {
      await deleteUnit(unit_id);
      loadUnits();
    }
  };

  const handleEdit = (row: Record<string, any>) => {
    setEditingUnit(row as Unit);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUnit(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setModalOpen(false);
    await loadUnits();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Unit List</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Unit
        </button>
      </div>

      <DynamicTable
        columns={unitTableColumns}
        data={units}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <UnitFormPage
            key={editingUnit?.unit_id || "new"}
            initialValues={editingUnit || {}}
            onClose={() => setModalOpen(false)}
            onSuccess={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default UnitsListPage;
