import React from "react";

interface Props {
  columns: string[];
  data: Record<string, any>[];
  onEdit?: (item: Record<string, any>) => void;
  onDelete?: (id: number) => void;
}

const DynamicTable: React.FC<Props> = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col} className="p-2 text-left capitalize">{col}</th>
          ))}
          {(onEdit || onDelete) && <th className="p-2">Actions</th>}
        </tr>
      </thead>
<tbody>
  {data.map((row) => (
    <tr key={row.id} className="border-t hover:bg-gray-50 transition">
      {columns.map((col) => (
        <td key={col} className="p-2 text-gray-800">{row[col]}</td>
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
            {onEdit && onDelete && <span className="text-gray-400">|</span>}
            {onDelete && (
              <button
                onClick={() => onDelete(row.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  ))}
</tbody>


    </table>
  );
};

export default DynamicTable;
