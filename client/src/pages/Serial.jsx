import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatients,
  addVisit,
  deleteVisit,
  updatePatient,
} from "../store/slice/patientsSlice";
import { fetchDoctors } from "../store/slice/doctorSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiEdit,
  FiPlus,
  FiUser,
  FiClock,
  FiClipboard,
  FiHeart,
  FiArrowLeft,
  FiCalendar,
  FiTrash2,
  FiPrinter,
} from "react-icons/fi";
import AddVisitModal from "../components/AddVisitModal";
import EditPatientModal from "../components/EditPatientModal";
import EditSymptomsModal from "../components/EditSymptomsModal";
import EditPrescriptionsModal from "../components/EditPrescriptionsModal";
import Prescription from "../components/Prescription";
import { useReactToPrint } from "react-to-print";

// Sub-components
const PatientHeader = ({ patient, onBack }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <FiArrowLeft className="text-xl text-gray-600" />
      </button>
      <div className="flex items-center gap-3">
        <FiUser className="text-3xl text-sky-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {patient.patientName}
          </h1>
          <p className="text-sm text-gray-500">
            Serial No: {patient.patientSerial} • Age: {patient.patientAge}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const InfoCard = ({ title, icon, children, onEdit }) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-bold text-gray-700">{title}</h3>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <FiEdit className="text-gray-500" />
        </button>
      )}
    </div>
    {children}
  </div>
);

const VisitHistory = ({ visits = [], onAddVisit, onDeleteVisit }) => (
  <InfoCard title="Visit History" icon={<FiClock className="text-cyan-500" />}>
    <div className="space-y-4">
      {visits.map((visit) => (
        <div
          key={visit._id}
          className="flex justify-between items-start p-3 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div>
            <p className="font-semibold text-gray-800">
              {new Date(visit.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">{visit.problem}</p>
          </div>
          <button
            onClick={() => onDeleteVisit(visit._id)}
            className="p-1 rounded-full hover:bg-red-100 transition"
          >
            <FiTrash2 className="text-red-500 h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
    <button
      onClick={onAddVisit}
      className="mt-4 flex items-center gap-2 text-sm font-semibold text-sky-600 hover:underline"
    >
      <FiPlus /> Add New Visit
    </button>
  </InfoCard>
);

const VisitAccordion = ({ visit, index, handleEdit, onPrint }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer flex justify-between items-center p-3 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 transition"
      >
        <div>
          <p className="font-semibold text-gray-800">
            Visit {index + 1} - {new Date(visit.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">{visit.problem}</p>
        </div>
        <div>
          {isExpanded ? (
            <span className="text-gray-500">▲</span>
          ) : (
            <span className="text-gray-500">▼</span>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <InfoCard
            title="General Info"
            icon={<FiClipboard className="text-blue-500" />}
            onEdit={() => handleEdit("general", visit, visit._id)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-600">Condition</p>
                <p>{visit.condition}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Duration</p>
                <p>{visit.duration}</p>
              </div>
            </div>
          </InfoCard>

          <InfoCard
            title="Symptoms"
            icon={<FiHeart className="text-red-500" />}
            onEdit={() =>
              handleEdit("symptoms", { symtoms: visit.symtoms }, visit._id)
            }
          >
            <div className="mb-2">
              <p className="font-semibold text-gray-600">Main Symptom:</p>
              <p className="text-gray-800">
                {visit.symtoms.symtomsName || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-600 mb-2">Sub-symptoms:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {visit.symtoms.subSymtoms?.length > 0 ? (
                  visit.symtoms.subSymtoms.map((s, i) => (
                    <li key={i}>{s.subSymtomsName}</li>
                  ))
                ) : (
                  <li>No sub-symptoms recorded.</li>
                )}
              </ul>
            </div>
          </InfoCard>

          <InfoCard
            title="Prescriptions"
            icon={<FiCalendar className="text-purple-500" />}
            onEdit={() =>
              handleEdit(
                "prescriptions",
                { prescriptions: visit.prescriptions },
                visit._id
              )
            }
          >
            <ul className="space-y-2 text-sm">
              {visit.prescriptions?.length > 0 ? (
                visit.prescriptions.map((p, i) => (
                  <li
                    key={i}
                    className="flex justify-between p-2 bg-gray-50 rounded-md"
                  >
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-gray-600">{p.dose}</span>
                  </li>
                ))
              ) : (
                <li>No prescriptions recorded.</li>
              )}
            </ul>
          </InfoCard>
          <button
            onClick={onPrint}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-sky-600 hover:underline"
          >
            <FiPrinter /> Create PDF
          </button>
        </div>
      )}
    </div>
  );
};

const Serial = () => {
  const { patientSerialNumber } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { patients = [], isLoading } = useSelector((state) => state.patient);
  const { doctors = [] } = useSelector((state) => state.doctor);
  const [isVisitModalOpen, setVisitModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSymptomsModalOpen, setSymptomsModalOpen] = useState(false);
  const [isPrescriptionsModalOpen, setPrescriptionsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [defaultValues, setDefaultValues] = useState({});
  const [editingVisitId, setEditingVisitId] = useState(null);
  const [selectedVisit, setSelectedVisit] = useState(null);

  const patient = useMemo(
    () => patients.find((p) => p.patientSerial === Number(patientSerialNumber)),
    [patients, patientSerialNumber]
  );

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  useEffect(() => {
    if (patients.length === 0) {
      dispatch(fetchPatients());
    }
    if (doctors.length === 0) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, patients.length, doctors.length]);

  useEffect(() => {
    if (selectedVisit && componentRef) {
      setTimeout(() => {
        handlePrint();
      }, 200); // DOM ready wait
    }
  }, [selectedVisit]);

  const handleAddVisit = async (visitData) => {
    try {
      await dispatch(addVisit({ patientId: patient._id, visitData })).unwrap();
      toast.success("New visit added successfully!");
    } catch (error) {
      toast.error(`Failed to add visit: ${error.message}`);
    }
  };

  const handleDeleteVisit = async (visitId) => {
    if (window.confirm("Are you sure you want to delete this visit?")) {
      try {
        await dispatch(
          deleteVisit({ patientId: patient._id, visitId })
        ).unwrap();
        toast.success("Visit deleted successfully!");
      } catch (error) {
        toast.error(`Failed to delete visit: ${error.message}`);
      }
    }
  };

  const handleEdit = (section, data, visitId = null) => {
    setEditingSection(section);
    setDefaultValues(data);
    setEditingVisitId(visitId);
    if (section === "symptoms") {
      setSymptomsModalOpen(true);
    } else if (section === "prescriptions") {
      setPrescriptionsModalOpen(true);
    } else {
      setEditModalOpen(true);
    }
  };

  const handleSave = async (data) => {
    try {
      let updatedVisits = [...patient.visits];

      if (editingSection === "prescriptions") {
        updatedVisits = updatedVisits.map((v) =>
          v._id === editingVisitId
            ? { ...v, prescriptions: data.prescriptions }
            : v
        );
      } else if (editingSection === "symptoms") {
        updatedVisits = updatedVisits.map((v) =>
          v._id === editingVisitId ? { ...v, symtoms: data.symtoms } : v
        );
      } else if (editingSection === "history") {
        patient.history = { ...data.history };
      } else {
        // For 'general' section
        updatedVisits = updatedVisits.map((v) =>
          v._id === editingVisitId ? { ...v, ...data } : v
        );
      }

      const updatedData = { ...patient, visits: updatedVisits };

      await dispatch(
        updatePatient({ id: patient._id, data: updatedData })
      ).unwrap();
      toast.success("Patient updated successfully!");
      setEditModalOpen(false);
      setSymptomsModalOpen(false);
      setPrescriptionsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update patient");
    }
  };

  const handlePrintClick = (visit) => {
    setSelectedVisit(visit);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Patient not found
        </h2>
        <button
          onClick={() => navigate("/patients")}
          className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-lg"
        >
          Back to Patients
        </button>
      </div>
    );
  }

  const { history = {}, visits = [], patientDate } = patient;
  const doctor = doctors[0] || {}; // Use the first doctor for now

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen">
      <PatientHeader patient={patient} onBack={() => navigate("/patients")} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Visits Accordion */}
          {visits.map((visit, index) => (
            <VisitAccordion
              key={visit._id}
              visit={visit}
              index={index}
              handleEdit={handleEdit}
              onPrint={() => handlePrintClick(visit)}
            />
          ))}
        </div>

        <div className="space-y-6">
          <VisitHistory
            visits={visits}
            onAddVisit={() => setVisitModalOpen(true)}
            onDeleteVisit={handleDeleteVisit}
          />

          <InfoCard
            title="Patient History"
            icon={<FiClock className="text-green-500" />}
            onEdit={() => handleEdit("history", { history })}
          >
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold">Present</p>
                <p className="text-gray-600">
                  {history.presentHistory || "N/A"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Past</p>
                <p className="text-gray-600">{history.pastHistory || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Family</p>
                <p className="text-gray-600">
                  {history.familyHistory || "N/A"}
                </p>
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
      {selectedVisit && (
        <div style={{ display: "none" }}>
          {console.log(patient, selectedVisit, doctor)}
          <Prescription
            ref={componentRef}
            patient={patient}
            visit={selectedVisit}
            doctor={doctor}
          />
        </div>
      )}

      <AddVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        onSave={handleAddVisit}
      />
      <EditPatientModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
        section={editingSection}
        defaultValues={defaultValues}
      />
      <EditSymptomsModal
        isOpen={isSymptomsModalOpen}
        onClose={() => setSymptomsModalOpen(false)}
        onSave={handleSave}
        defaultValues={defaultValues}
      />
      <EditPrescriptionsModal
        isOpen={isPrescriptionsModalOpen}
        onClose={() => setPrescriptionsModalOpen(false)}
        onSave={handleSave}
        defaultValues={defaultValues}
      />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Serial;
