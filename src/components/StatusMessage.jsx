// src/components/StatusMessage.jsx
import React from "react";

const StatusMessage = ({ message, type = "info" }) => {
  if (!message) return null;

  const styles = {
    error: "bg-red-100 border-red-400 text-red-700",
    success: "bg-green-100 border-green-400 text-green-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} mt-6`}>
      {message}
    </div>
  );
};

export default StatusMessage;
