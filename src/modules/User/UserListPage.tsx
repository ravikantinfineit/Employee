import React, { useEffect, useState } from "react";
import { User ,userTableColumns} from "./Users";
import { getUsers, deleteUser } from "./UsersApi";
import DynamicTable from "../../components/DynamicTable";
import Modal from "../../components/Modal";
import UserFormPage from "./UserFormPage";
import { useLocation } from "react-router-dom";

const UsersListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const location = useLocation();
  console.log("UsersListPage location state:", location);
  useEffect(() => {
    loadUsers();
  }, [location.state]);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (user_id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(user_id);
      loadUsers();
    }
  };

  const handleEdit = (row: Record<string, any>) => {
    setEditingUser(row as User);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setModalOpen(false);
    await loadUsers();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User List</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add User
        </button>
      </div>

      <DynamicTable
        columns={userTableColumns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <UserFormPage
            key={editingUser?.user_id || "new"}
            initialValues={editingUser || {}}
            onClose={() => setModalOpen(false)}
            onSuccess={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default UsersListPage;
