import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg text-gray-300 shadow-md"
    >
      ← Back
    </button>
  );
};

export default BackButton;
