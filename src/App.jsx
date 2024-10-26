// src/App.jsx
import React, { useState } from "react";
import ApiInput from "./components/ApiInput";
import JsonEditor from "./components/JsonEditor";
import JsonViewer from "./components/JsonViewer";
import StatusMessage from "./components/StatusMessage";

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  const [status, setStatus] = useState({ message: "", type: "info" });

  const handleApiResponse = ({ data, error }) => {
    if (error) {
      setStatus({ message: error, type: "error" });
      return;
    }
    setJsonData(data);
    setStatus({ message: "Data fetched successfully", type: "success" });
  };

  const handleJsonChange = ({ data, error }) => {
    if (error) {
      setStatus({ message: error, type: "error" });
      return;
    }
    setJsonData(data);
    setStatus({ message: "JSON is valid", type: "success" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <ApiInput onFetch={handleApiResponse} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <JsonEditor initialJson={jsonData} onJsonChange={handleJsonChange} />
          <JsonViewer jsonData={jsonData} />
        </div>
        <StatusMessage message={status.message} type={status.type} />
      </div>
    </div>
  );
};

export default App;
