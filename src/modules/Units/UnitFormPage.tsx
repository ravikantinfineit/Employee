import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import { getUnit, createUnit, updateUnit } from "./UnitApi";
import { unitFields, Unit } from "./Units";

interface Props {
  initialValues?: Partial<Unit>;
  onClose?: () => void;
  onSuccess?: (unit: Unit) => void;
}

const UnitFormPage: React.FC<Props> = ({
  initialValues = {},
  onClose,
  onSuccess,
}) => {
  const { unit_id } = useParams<{ unit_id: string }>();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<Partial<Unit>>(initialValues);
  const [loading, setLoading] = useState(!!unit_id);
  const isEditFromRoute = !!unit_id && !initialValues?.unit_id;

  useEffect(() => {
    if (isEditFromRoute) {
      getUnit(unit_id).then((data) => {
        if (data) setFormValues(data);
        setLoading(false);
      });
    } else {
      setFormValues(initialValues);
      setLoading(false);
    }
  }, [unit_id, initialValues, isEditFromRoute]);

  const handleSubmit = async (formData: Record<string, any>) => {
    const unitData = formData as Omit<Unit, "unit_id">;

    if (unit_id) {
      await updateUnit(unit_id, unitData);
    } else if (initialValues?.id) {
      await updateUnit(initialValues.id as string, unitData);
    } else {
      const newUnit = await createUnit(unitData);
      onSuccess?.(newUnit.data);
    }
    debugger;
    onClose?.();
    if (onClose) {
      navigate("/dashboard/units", {
        replace: true,
        state: { refresh: true },
      });
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {unit_id || initialValues?.unit_id ? "Edit" : "Add"} Unit
      </h2>
      <DynamicForm
        fields={unitFields}
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UnitFormPage;
