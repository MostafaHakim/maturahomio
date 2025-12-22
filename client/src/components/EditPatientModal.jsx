import React from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";

const EditPatientModal = ({
  isOpen,
  onClose,
  onSave,
  section,
  defaultValues,
}) => {
  const { register, handleSubmit } = useForm({ defaultValues });

  if (!isOpen) return null;

  const renderFields = () => {
    switch (section) {
      case "condition":
        return (
          <>
            <input {...register("condition")} className="input w-full" />
            <input {...register("duration")} className="input w-full" />
            <input {...register("problem")} className="input w-full" />
          </>
        );
      case "symptoms":
        return <textarea {...register("symptoms")} className="input w-full" />;
      case "prescriptions":
        return (
          <textarea {...register("prescriptions")} className="input w-full" />
        );
      case "history":
        return (
          <>
            <input
              {...register("history.presentHistory")}
              className="input w-full"
            />
            <input
              {...register("history.pastHistory")}
              className="input w-full"
            />
            <input
              {...register("history.familyHistory")}
              className="input w-full"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Edit {section}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <FiX className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          {renderFields()}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-gray-700 bg-gray-100 font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
