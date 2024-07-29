/* eslint-disable no-unused-vars */
import React from "react";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 5) * 5;
    let pages = [];
    for (let i = start; i < start + 5; i++) {
      if (i + 1 <= totalPages) {
      
        pages.push(i + 1);
      }
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="effect"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {currentPage > 3 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          <span className="dots">...</span>
        </>
      )}

      {getPaginationGroup().map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          <span className="dots">...</span>
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        className="effect"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
