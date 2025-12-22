import React from "react";
import PropTypes from "prop-types";

const Prescription = React.forwardRef(({ patient, visit, doctor }, ref) => {
  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 md:p-10 print:p-4"
    >
      {/* Main prescription container */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl shadow-blue-100 border border-blue-200 overflow-hidden print:shadow-none print:border print:border-gray-300">
        {/* Header with doctor info */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center ">
            <div className="text-center md:text-left md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {doctor.doctorName}
              </h1>
              <p className="text-lg text-blue-100 mt-2">{doctor.medicalName}</p>
              <p className="text-blue-100 mt-1">
                {doctor.specialization || "General Physician"}
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm text-blue-100">License No:</p>
              <p className="text-xl font-bold">
                {doctor.license || "MD-12345"}
              </p>
            </div>
          </div>

          {/* Doctor contact info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{doctor.phone || "Not Provided"}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{doctor.email || "doctor@clinic.com"}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{doctor.address || "Medical Center, City"}</span>
            </div>
          </div>
        </div>

        {/* Patient and visit info */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient Name</p>
                  <p className="text-xl font-bold text-gray-800">
                    {patient.patientName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-teal-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age & Gender</p>
                  <p className="text-xl font-bold text-gray-800">
                    {patient.patientAge} years •{" "}
                    {patient.gender || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visit Date</p>
                  <p className="text-xl font-bold text-gray-800">
                    {new Date(visit.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient ID</p>
                  <p className="text-xl font-bold text-gray-800">
                    {patient.patientSerial ||
                      "PID-" +
                        Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Problem section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Chief Complaint
              </h2>
            </div>
            <div className="ml-11 p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-lg text-gray-700">
                {visit.problem || "No specific problem mentioned"}
              </p>
            </div>
          </div>

          {/* Symptoms section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Symptoms Observed
              </h2>
            </div>
            <div className="ml-11">
              {visit.symtoms &&
              visit.symtoms.subSymtoms &&
              visit.symtoms.subSymtoms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {visit.symtoms.subSymtoms.map((symptom, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100 hover:bg-yellow-100 transition-colors"
                    >
                      <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-yellow-700">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-gray-700">
                        {symptom.subSymtomsName}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl text-gray-500 italic">
                  No specific symptoms recorded
                </div>
              )}
            </div>
          </div>

          {/* Prescriptions section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Prescription</h2>
            </div>
            <div className="ml-11">
              {visit.prescriptions && visit.prescriptions.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-green-50 to-emerald-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Medicine
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Dosage
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Frequency
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {visit.prescriptions.map((prescription, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-green-50/30"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-sm font-bold text-green-700">
                                  M
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {prescription.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {prescription.type || "Tablet"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">
                              {prescription.dose}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {prescription.frequency || "After meals"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {prescription.duration || "7 days"}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl text-gray-500 italic">
                  No prescriptions given
                </div>
              )}
            </div>
          </div>

          {/* Footer notes */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Doctor's Instructions
                </h3>
                <p className="text-sm text-gray-600">
                  {visit.instructions ||
                    "• Take medications as prescribed\n• Follow up if symptoms persist\n• Maintain a healthy diet\n• Get adequate rest"}
                </p>
              </div>
              <div className="p-4 bg-teal-50 rounded-xl">
                <h3 className="font-bold text-teal-700 mb-2 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Next Appointment
                </h3>
                <p className="text-sm text-gray-600">
                  {visit.nextAppointment
                    ? new Date(visit.nextAppointment).toLocaleDateString()
                    : "Follow-up as needed or if symptoms worsen"}
                </p>
              </div>
            </div>

            {/* Signature area */}
            <div className="mt-8 text-right">
              <div className="inline-block border-t border-gray-400 pt-2">
                <p className="text-lg font-bold text-gray-800">
                  {doctor.doctorName}
                </p>
                <p className="text-sm text-gray-600">
                  {doctor.qualification || "MD, MBBS"}
                </p>
                <p className="text-xs text-gray-500">Signature</p>
              </div>
            </div>

            {/* Print notice */}
            <div className="mt-6 text-center text-xs text-gray-400 print:hidden">
              <p>
                This is a computer-generated prescription. For printing, use
                Ctrl+P or the print button.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Prescription.propTypes = {
  patient: PropTypes.object.isRequired,
  visit: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
};

Prescription.displayName = "Prescription";

export default Prescription;
