import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./DataTablePlugin.css";

// Regular expressions for date formats
const formatRegex = {
  "dd/mm/yyyy": /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/,
  "mm/dd/yyyy": /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/,
  "yyyy/mm/dd": /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/,
  "dd-mm-yyyy": /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-\d{4}$/,
  "mm-dd-yyyy": /^(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-\d{4}$/,
  "yyyy-mm-dd": /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
  "dd.mm.yyyy": /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.\d{4}$/,
  "mm.dd.yyyy": /^(0?[1-9]|1[012])\.(0?[1-9]|[12][0-9]|3[01])\.\d{4}$/,
  "yyyy.mm.dd": /^\d{4}\.(0?[1-9]|1[012])\.(0?[1-9]|[12][0-9]|3[01])$/,
  ISO: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{4}$/,
};

const DataTablePlugin = React.memo(({ data, columns, dateFormat }) => {
  // State hooks for managing table data
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const pageSizeOptions = useMemo(() => [10, 25, 50, 100], []);

  // Function to check date format
  const isDateFormat = useCallback(
    (dateString) => {
      for (const format in formatRegex) {
        if (
          formatRegex[format].test(dateString) &&
          dateFormat.toLowerCase() === format
        ) {
          return format;
        }
      }
      return null;
    },
    [dateFormat]
  );

  // Function to convert date string to a standard format
  const convertDate = useCallback(
    (dateString) => {
      const format = isDateFormat(dateString);
      if (!format) return null;
      const parts = dateString.split(/[-/.T:+]/);
      switch (format) {
        // Conversion for different date formats
        case "dd/mm/yyyy":
        case "dd-mm-yyyy":
        case "dd.mm.yyyy":
          return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
            2,
            "0"
          )}`;
        case "mm/dd/yyyy":
        case "mm-dd-yyyy":
        case "mm.dd.yyyy":
          return `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(
            2,
            "0"
          )}`;
        case "yyyy/mm/dd":
        case "yyyy-mm-dd":
        case "yyyy.mm.dd":
        case "ISO":
          return `${parts[0]}-${parts[1].padStart(2, "0")}-${parts[2].padStart(
            2,
            "0"
          )}`;
        default:
          return dateString;
      }
    },
    [isDateFormat]
  );

  // Function to compare values for sorting
  const compareValues = useCallback(
    (a, b, field, order) => {
      if (!a[field] || !b[field]) return 0;
      const dateA = convertDate(a[field]);
      const dateB = convertDate(b[field]);
      if (dateA && dateB) {
        return order === "asc"
          ? new Date(dateA) - new Date(dateB)
          : new Date(dateB) - new Date(dateA);
      }
      const valueA = a[field].toString().toLowerCase();
      const valueB = b[field].toString().toLowerCase();
      if (valueA < valueB) return order === "asc" ? -1 : 1;
      if (valueA > valueB) return order === "asc" ? 1 : -1;
      return 0;
    },
    [convertDate]
  );

  // Effects for resetting current page and filtering data
  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize, searchTerm]);

  useEffect(() => {
    const filtered = data
      .filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => compareValues(a, b, sortField, sortOrder));
    setFilteredItems(filtered);
  }, [searchTerm, data, sortField, sortOrder, compareValues]);

  // Memoization for page count and items to show
  const pageCount = useMemo(
    () => Math.ceil(filteredItems.length / pageSize),
    [filteredItems.length, pageSize]
  );
  const itemsToShow = useMemo(
    () =>
      filteredItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize),
    [currentPage, pageSize, filteredItems]
  );

  // Callback for handling sort changes
  const handleSort = useCallback(
    (field) => {
      const order = field === sortField && sortOrder === "asc" ? "desc" : "asc";
      setSortField(field);
      setSortOrder(order);
    },
    [sortField, sortOrder]
  );

  // Function to render table headers
  const renderHeader = useCallback(
    () =>
      columns.map((column) => (
        <th key={column.data} onClick={() => handleSort(column.data)}>
          {column.title}
          {sortField === column.data ? (
            <i
              className={`fas fa-sort-${sortOrder === "asc" ? "up" : "down"}`}
            ></i>
          ) : (
            <i className="fas fa-sort"></i>
          )}
        </th>
      )),
    [columns, sortField, sortOrder, handleSort]
  );

  // Function to render pagination buttons
  const renderPaginationButtons = useCallback(() => {
    let buttons = [];
    let startPage, endPage;
    if (pageCount <= 5) {
      startPage = 0;
      endPage = pageCount;
    } else {
      startPage = Math.max(currentPage - 2, 0);
      endPage = Math.min(startPage + 5, pageCount);
    }
    if (startPage > 0) {
      buttons.push(
        <button key="start" onClick={() => setCurrentPage(0)}>
          1
        </button>,
        <span key="ellipsis1">...</span>
      );
    }
    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          disabled={currentPage === i}
        >
          {i + 1}
        </button>
      );
    }
    if (endPage < pageCount) {
      buttons.push(
        <span key="ellipsis2">...</span>,
        <button key="end" onClick={() => setCurrentPage(pageCount - 1)}>
          {pageCount}
        </button>
      );
    }
    return buttons;
  }, [currentPage, pageCount]);

  // Main component rendering
  return (
    <>
      <div className="search-and-size">
        <div className="page-size-selector">
          Show
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          entries
        </div>
        <div className="search-box">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="item-table-container">
        <table className="item-table">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>
            {itemsToShow.map((item, index) => (
              <tr key={item.id || `itemId-${index}`}>
                {columns.map((column) => (
                  <td key={`${item.id || `itemId-${index}`}-${column.data}`}>
                    {item[column.data]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <p>
          Showing {Math.max(1, currentPage * pageSize + 1)} to{" "}
          {Math.min(filteredItems.length, (currentPage + 1) * pageSize)} of{" "}
          {filteredItems.length} entries
        </p>
        <div className="bloc-nav">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= pageCount - 1}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
});

export default DataTablePlugin;
