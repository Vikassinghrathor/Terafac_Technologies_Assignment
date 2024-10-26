// src/components/JsonEditor.jsx
import React, { useState, useEffect } from "react";

const JsonEditor = ({ initialJson, onJsonChange }) => {
  const [jsonText, setJsonText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialJson) {
      setJsonText(JSON.stringify(initialJson, null, 2));
    }
  }, [initialJson]);

  const handleTextChange = (text) => {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text);
      onJsonChange({ data: parsed });
    } catch (error) {
      onJsonChange({ error: "Invalid JSON format" });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">JSON Editor</h2>
        <button
          onClick={copyToClipboard}
          className={`px-4 py-1 rounded-md transition-colors duration-200 ${
            copied
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="p-4">
        <textarea
          value={jsonText}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full h-[400px] font-mono text-sm p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter or edit JSON here..."
        />
      </div>
    </div>
  );
};

export default JsonEditor;
