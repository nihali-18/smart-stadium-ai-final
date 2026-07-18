import React, { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Flame,
  HeartPulse,
  Wrench,
  CheckCircle,
  Eye,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const initialIncidents = [
  {
    id: "INC-001",
    type: "Medical Emergency",
    location: "North Stand",
    time: "10:25 AM",
    priority: "High",
    assigned: "Team A",
    status: "Active",
    description: "Fan feeling unconscious near Gate A.",
  },
  {
    id: "INC-002",
    type: "Security Alert",
    location: "Gate B",
    time: "10:40 AM",
    priority: "Medium",
    assigned: "Security Team",
    status: "Active",
    description: "Unauthorized access attempt.",
  },
  {
    id: "INC-003",
    type: "Fire Alert",
    location: "Food Court",
    time: "11:00 AM",
    priority: "High",
    assigned: "Fire Unit",
    status: "Resolved",
    description: "Minor smoke detected and cleared.",
  },
  {
    id: "INC-004",
    type: "Crowd Emergency",
    location: "South Stand",
    time: "11:15 AM",
    priority: "Medium",
    assigned: "Crowd Control",
    status: "Active",
    description: "Crowd congestion near Exit 3.",
  },
  {
    id: "INC-005",
    type: "Equipment Failure",
    location: "East Stand",
    time: "11:35 AM",
    priority: "Low",
    assigned: "Maintenance Team",
    status: "Active",
    description: "Display board not responding.",
  },
];

export default function EmergencyAssistance() {
  const { t } = useTranslation();

  const [incidents, setIncidents] = useState(initialIncidents);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const resolveIncident = (id) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id
          ? { ...incident, status: "Resolved" }
          : incident
      )
    );
  };

  const totalIncidents = incidents.length;
  const activeIncidents = incidents.filter(
    (item) => item.status === "Active"
  ).length;
  const resolvedIncidents = incidents.filter(
    (item) => item.status === "Resolved"
  ).length;
  const highPriority = incidents.filter(
    (item) => item.priority === "High"
  ).length;

  const getIcon = (type) => {
    switch (type) {
      case "Medical Emergency":
        return <HeartPulse className="w-5 h-5 text-red-500" />;
      case "Security Alert":
        return <ShieldAlert className="w-5 h-5 text-yellow-500" />;
      case "Fire Alert":
        return <Flame className="w-5 h-5 text-orange-500" />;
      case "Crowd Emergency":
        return <AlertTriangle className="w-5 h-5 text-purple-500" />;
      default:
        return <Wrench className="w-5 h-5 text-blue-500" />;
    }
  };
        return (
    <div className="p-6 space-y-6">

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">
          {t("ground.emergency.title", "Emergency Assistance")}
        </h1>
        <p className="text-gray-400 mt-1">
          {t(
            "ground.emergency.subtitle",
            "Monitor and resolve stadium emergency incidents."
          )}
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-slate-800 rounded-xl p-5">
          <p className="text-gray-400">
            {t("ground.totalIncidents", "Total Incidents")}
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {totalIncidents}
          </h2>
        </div>

        <div className="bg-red-900/30 rounded-xl p-5">
          <p className="text-red-300">
            {t("ground.activeIncidents", "Active")}
          </p>
          <h2 className="text-3xl font-bold mt-2 text-red-400">
            {activeIncidents}
          </h2>
        </div>

        <div className="bg-green-900/30 rounded-xl p-5">
          <p className="text-green-300">
            {t("ground.resolvedIncidents", "Resolved")}
          </p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {resolvedIncidents}
          </h2>
        </div>

        <div className="bg-orange-900/30 rounded-xl p-5">
          <p className="text-orange-300">
            {t("ground.highPriority", "High Priority")}
          </p>
          <h2 className="text-3xl font-bold mt-2 text-orange-400">
            {highPriority}
          </h2>
        </div>

      </div>

      {/* Incident List */}

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-5">
          {t("ground.incidentList", "Emergency Incident List")}
        </h2>

        <div className="space-y-4">

          {incidents.map((incident) => (

            <div
              key={incident.id}
              className="bg-slate-800 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
            >

              <div>

                <div className="flex items-center gap-2 mb-2">

                  {getIcon(incident.type)}

                  <h3 className="font-semibold text-lg">
                    {t(`ground.emergency.type.${incident.type.replace(/\s+/g, '')}`, incident.type)}
                  </h3>

                </div>

                <p className="text-gray-400 text-sm">
                  {t(`ground.emergency.loc.${incident.location.replace(/\s+/g, '')}`, incident.location)}
                </p>

                <p className="text-gray-400 text-sm">
                  {incident.time}
                </p>

                <p className="mt-2 text-sm">
                  {t(`ground.emergency.desc.${incident.id}`, incident.description)}
                </p>

                <div className="flex gap-3 mt-3">

                  <span className="px-3 py-1 rounded-full bg-blue-600 text-xs">
                    {t(`ground.emergency.priority.${incident.priority}`, incident.priority)}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      incident.status === "Resolved"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {t(`ground.emergency.status.${incident.status}`, incident.status)}
                  </span>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => setSelectedIncident(incident)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  <Eye size={18} />
                  {t("common.viewDetails", "View Details")}
                </button>

                {incident.status !== "Resolved" && (

                  <button
                    onClick={() => resolveIncident(incident.id)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                  >
                    <CheckCircle size={18} />
                    {t("ground.resolve", "Resolve")}
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* View Details Modal */}

      {selectedIncident && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg p-6">

            <div className="flex items-center gap-3 mb-4">
              {getIcon(selectedIncident.type)}
              <h2 className="text-2xl font-bold">
                {t("ground.incidentDetails", "Incident Details")}
              </h2>
            </div>

            <div className="space-y-3">

              <div>
                <span className="font-semibold">
                  {t("ground.incidentId", "Incident ID")}:
                </span>{" "}
                {selectedIncident.id}
              </div>

              <div>
                <span className="font-semibold">
                  {t("ground.type", "Type")}:
                </span>{" "}
                {t(`ground.emergency.type.${selectedIncident.type.replace(/\s+/g, '')}`, selectedIncident.type)}
              </div>

              <div>
                <span className="font-semibold">
                  {t("ground.location", "Location")}:
                </span>{" "}
                {t(`ground.emergency.loc.${selectedIncident.location.replace(/\s+/g, '')}`, selectedIncident.location)}
              </div>

              <div>
                <span className="font-semibold">
                  {t("ground.time", "Time")}:
                </span>{" "}
                {selectedIncident.time}
              </div>

              <div>
                <span className="font-semibold">
                  {t("ground.assignedStaff", "Assigned Staff")}:
                </span>{" "}
                {t(`ground.emergency.team.${selectedIncident.assigned.replace(/\s+/g, '')}`, selectedIncident.assigned)}
              </div>

              <div>
                <span className="font-semibold">
                  {t("ground.priority", "Priority")}:
                </span>{" "}
                {t(`ground.emergency.priority.${selectedIncident.priority}`, selectedIncident.priority)}
              </div>

              <div>
                <span className="font-semibold">
                  {t("ground.status", "Status")}:
                </span>{" "}
                {t(`ground.emergency.status.${selectedIncident.status}`, selectedIncident.status)}
              </div>

              <div>
                <span className="font-semibold">
                  {t("ground.description", "Description")}:
                </span>
                <p className="mt-2 text-gray-300">
                  {t(`ground.emergency.desc.${selectedIncident.id}`, selectedIncident.description)}
                </p>
              </div>

            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedIncident(null)}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
              >
                {t("common.close", "Close")}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
    );
}
