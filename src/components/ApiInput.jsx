// src/components/ApiInput.jsx
import React, { useState } from "react";

const ApiInput = ({ onFetch }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!url) {
      onFetch({ error: "Please enter a valid URL" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      onFetch({ data });
    } catch (error) {
      onFetch({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        JSON Viewer & Editor
      </h1>
      <div className="flex gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter API Endpoint URL"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className={`px-6 py-2 rounded-lg font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } transition-colors duration-200`}
        >
          {loading ? "Loading..." : "GET"}
        </button>
      </div>
    </div>
  );
};

export default ApiInput;
