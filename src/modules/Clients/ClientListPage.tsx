import React, { useEffect, useState } from "react";
import { Client ,clientTableColumns} from "./Clients";
import { getClients, deleteClient } from "./ClientApi";
import DynamicTable from "../../components/DynamicTable";
import Modal from "../../components/Modal";
import ClientFormPage from "./ClientFormPage";
import { useLocation } from "react-router-dom";

const ClientsListPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const location = useLocation();
  useEffect(() => {
    loadClients();
  }, [location.state]);

  const loadClients = async () => {
    const data = await getClients();
    setClients(data);
  };

  const handleDelete = async (client_id: string) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      await deleteClient(client_id);
      loadClients();
    }
  };

  const handleEdit = (row: Record<string, any>) => {
    setEditingClient(row as Client);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingClient(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setModalOpen(false);
    await loadClients();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Client List</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Client
        </button>
      </div>

      <DynamicTable
        columns={clientTableColumns}
        data={clients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <ClientFormPage
            key={editingClient?.client_id || "new"}
            initialValues={editingClient || {}}
            onClose={() => setModalOpen(false)}
            onSuccess={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default ClientsListPage;
