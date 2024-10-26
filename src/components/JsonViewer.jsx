// src/components/JsonViewer.jsx
import React, { useState } from "react";

const JsonViewer = ({ jsonData }) => {
  const [viewMode, setViewMode] = useState("html");

  const renderHtmlView = (data) => {
    const renderValue = (value) => {
      if (Array.isArray(value)) {
        return (
          <ul className="list-disc pl-6">
            {value.map((item, index) => (
              <li key={index} className="my-1">
                {renderValue(item)}
              </li>
            ))}
          </ul>
        );
      }

      if (value && typeof value === "object") {
        return renderObject(value);
      }

      return <span className="text-gray-700">{String(value)}</span>;
    };

    const renderObject = (obj) => (
      <div className="space-y-2">
        {Object.entries(obj).map(([key, value]) => (
          <div key={key} className="ml-4">
            <span className="font-semibold text-gray-900">{key}:</span>{" "}
            {renderValue(value)}
          </div>
        ))}
      </div>
    );

    return jsonData ? renderObject(data) : null;
  };

  const renderMarkdownView = (data) => {
    const convertToMarkdown = (obj, level = 0) => {
      if (!obj || typeof obj !== "object") return String(obj);

      let md = "";
      const indent = "#".repeat(Math.min(level + 1, 6)) + " ";

      Object.entries(obj).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          md += `${indent}${key}\n`;
          value.forEach((item) => {
            md += `- ${
              typeof item === "object"
                ? "\n" + convertToMarkdown(item, level + 1)
                : item
            }\n`;
          });
        } else if (typeof value === "object" && value !== null) {
          md += `${indent}${key}\n${convertToMarkdown(value, level + 1)}\n`;
        } else {
          md += `${indent}${key}: ${value}\n`;
        }
      });

      return md;
    };

    return jsonData ? (
      <pre className="whitespace-pre-wrap font-mono text-sm">
        {convertToMarkdown(data)}
      </pre>
    ) : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Rendered View
        </h2>
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setViewMode("html")}
            className={`pb-2 px-4 transition-colors duration-200 ${
              viewMode === "html"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            HTML
          </button>
          <button
            onClick={() => setViewMode("markdown")}
            className={`pb-2 px-4 transition-colors duration-200 ${
              viewMode === "markdown"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Markdown
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="h-[400px] overflow-auto border rounded-lg bg-gray-50 p-4">
          {viewMode === "html"
            ? renderHtmlView(jsonData)
            : renderMarkdownView(jsonData)}
        </div>
      </div>
    </div>
  );
};

export default JsonViewer;
