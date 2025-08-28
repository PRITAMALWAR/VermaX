import React from "react";

const ProductPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-10 space-x-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50`}
      >
        Prev
      </button>

      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50`}
      >
        Next 
      </button>
    </div>
  );
};

export default ProductPagination;
