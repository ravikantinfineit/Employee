import React, { useState } from "react";

interface Props {
  columns: string[];
  data: Record<string, any>[];
  onEdit?: (item: Record<string, any>) => void;
  onDelete?: (id: string) => void;
  rowsPerPage?: number;
}

const DynamicTable: React.FC<Props> = ({
  columns,
  data,
  onEdit,
  onDelete,
  rowsPerPage = 10, // Default to 10 per page
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col} className="p-2 text-left capitalize">
                {col}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-50 transition">
              {columns.map((col) => (
                <td key={col} className="p-2 text-gray-800">
                  {row[col]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="p-2 text-center">
                  <div className="inline-flex items-center gap-2 justify-center">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Edit
                      </button>
                    )}
                    {onEdit && onDelete && (
                      <span className="text-gray-400">|</span>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row.id)}
                        className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="p-4 text-center text-gray-500"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-gray-800 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
