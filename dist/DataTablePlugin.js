"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// Regular expressions for date formats
var formatRegex = {
  "dd/mm/yyyy": /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/,
  "mm/dd/yyyy": /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/,
  "yyyy/mm/dd": /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/,
  "dd-mm-yyyy": /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-\d{4}$/,
  "mm-dd-yyyy": /^(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-\d{4}$/,
  "yyyy-mm-dd": /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
  "dd.mm.yyyy": /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.\d{4}$/,
  "mm.dd.yyyy": /^(0?[1-9]|1[012])\.(0?[1-9]|[12][0-9]|3[01])\.\d{4}$/,
  "yyyy.mm.dd": /^\d{4}\.(0?[1-9]|1[012])\.(0?[1-9]|[12][0-9]|3[01])$/,
  ISO: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{4}$/
};
var DataTablePlugin = /*#__PURE__*/_react["default"].memo(function (_ref) {
  var data = _ref.data,
    columns = _ref.columns,
    dateFormat = _ref.dateFormat;
  // Check for valid dateFormat
  if (!dateFormat || typeof dateFormat !== "string" || dateFormat.trim() === "") {
    dateFormat = "dd/mm/yyyy";
  }

  // State hooks for managing table data
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    filteredItems = _useState2[0],
    setFilteredItems = _useState2[1];
  var _useState3 = (0, _react.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    searchTerm = _useState4[0],
    setSearchTerm = _useState4[1];
  var _useState5 = (0, _react.useState)(10),
    _useState6 = _slicedToArray(_useState5, 2),
    pageSize = _useState6[0],
    setPageSize = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    currentPage = _useState8[0],
    setCurrentPage = _useState8[1];
  var _useState9 = (0, _react.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    sortField = _useState10[0],
    setSortField = _useState10[1];
  var _useState11 = (0, _react.useState)("asc"),
    _useState12 = _slicedToArray(_useState11, 2),
    sortOrder = _useState12[0],
    setSortOrder = _useState12[1];
  var pageSizeOptions = (0, _react.useMemo)(function () {
    return [10, 25, 50, 100];
  }, []);

  // Function to check date format
  var isDateFormat = (0, _react.useCallback)(function (dateString) {
    for (var format in formatRegex) {
      if (formatRegex[format].test(dateString) && dateFormat.toLowerCase() === format) {
        return format;
      }
    }
    return null;
  }, [dateFormat]);

  // Function to convert date string to a standard format
  var convertDate = (0, _react.useCallback)(function (dateString) {
    var format = isDateFormat(dateString);
    if (!format) return null;
    var parts = dateString.split(/[-/.T:+]/);
    switch (format) {
      // Conversion for different date formats
      case "dd/mm/yyyy":
      case "dd-mm-yyyy":
      case "dd.mm.yyyy":
        return "".concat(parts[2], "-").concat(parts[1].padStart(2, "0"), "-").concat(parts[0].padStart(2, "0"));
      case "mm/dd/yyyy":
      case "mm-dd-yyyy":
      case "mm.dd.yyyy":
        return "".concat(parts[2], "-").concat(parts[0].padStart(2, "0"), "-").concat(parts[1].padStart(2, "0"));
      case "yyyy/mm/dd":
      case "yyyy-mm-dd":
      case "yyyy.mm.dd":
      case "ISO":
        return "".concat(parts[0], "-").concat(parts[1].padStart(2, "0"), "-").concat(parts[2].padStart(2, "0"));
      default:
        return dateString;
    }
  }, [isDateFormat]);

  // Function to compare values for sorting
  var compareValues = (0, _react.useCallback)(function (a, b, field, order) {
    if (!a[field] || !b[field]) return 0;
    var dateA = convertDate(a[field]);
    var dateB = convertDate(b[field]);
    if (dateA && dateB) {
      return order === "asc" ? new Date(dateA) - new Date(dateB) : new Date(dateB) - new Date(dateA);
    }
    var valueA = a[field].toString().toLowerCase();
    var valueB = b[field].toString().toLowerCase();
    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;
    return 0;
  }, [convertDate]);

  // Effects for resetting current page and filtering data
  (0, _react.useEffect)(function () {
    setCurrentPage(0);
  }, [pageSize, searchTerm]);
  (0, _react.useEffect)(function () {
    var filtered = data.filter(function (item) {
      return Object.values(item).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    }).sort(function (a, b) {
      return compareValues(a, b, sortField, sortOrder);
    });
    setFilteredItems(filtered);
  }, [searchTerm, data, sortField, sortOrder, compareValues]);

  // Memoization for page count and items to show
  var pageCount = (0, _react.useMemo)(function () {
    return Math.ceil(filteredItems.length / pageSize);
  }, [filteredItems.length, pageSize]);
  var itemsToShow = (0, _react.useMemo)(function () {
    return filteredItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }, [currentPage, pageSize, filteredItems]);

  // Callback for handling sort changes
  var handleSort = (0, _react.useCallback)(function (field) {
    var order = field === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  }, [sortField, sortOrder]);

  // Function to render table headers
  var renderHeader = (0, _react.useCallback)(function () {
    return columns.map(function (column) {
      return /*#__PURE__*/_react["default"].createElement("th", {
        key: column.data,
        onClick: function onClick() {
          return handleSort(column.data);
        },
        role: "columnheader"
      }, column.title, " ", sortField === column.data ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: sortOrder === "asc" ? _freeSolidSvgIcons.faSortUp : _freeSolidSvgIcons.faSortDown,
        "aria-hidden": "true"
      }) : /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faSort,
        "aria-hidden": "true"
      }));
    });
  }, [columns, sortField, sortOrder, handleSort]);
  var baseColumnWidth = 150; // Base column width in pixels
  var maxWidth = columns.length * baseColumnWidth;

  // Function to render pagination buttons
  var renderPaginationButtons = (0, _react.useCallback)(function () {
    var buttons = [];
    var startPage, endPage;
    if (pageCount <= 5) {
      startPage = 0;
      endPage = pageCount;
    } else {
      startPage = Math.max(currentPage - 2, 0);
      endPage = Math.min(startPage + 5, pageCount);
    }
    if (startPage > 0) {
      buttons.push( /*#__PURE__*/_react["default"].createElement("button", {
        key: "start",
        onClick: function onClick() {
          return setCurrentPage(0);
        }
      }, "1"), /*#__PURE__*/_react["default"].createElement("span", {
        key: "ellipsis1"
      }, "..."));
    }
    var _loop = function _loop(i) {
      buttons.push( /*#__PURE__*/_react["default"].createElement("button", {
        key: i,
        onClick: function onClick() {
          return setCurrentPage(i);
        },
        disabled: currentPage === i
      }, i + 1));
    };
    for (var i = startPage; i < endPage; i++) {
      _loop(i);
    }
    if (endPage < pageCount) {
      buttons.push( /*#__PURE__*/_react["default"].createElement("span", {
        key: "ellipsis2"
      }, "..."), /*#__PURE__*/_react["default"].createElement("button", {
        key: "end",
        onClick: function onClick() {
          return setCurrentPage(pageCount - 1);
        }
      }, pageCount));
    }
    return buttons;
  }, [currentPage, pageCount]);

  // Main component rendering
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "plugin-container",
    style: {
      maxWidth: "".concat(maxWidth, "px")
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "search-and-size"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "page-size-selector"
  }, "Show", /*#__PURE__*/_react["default"].createElement("select", {
    value: pageSize,
    onChange: function onChange(e) {
      return setPageSize(Number(e.target.value));
    },
    "aria-label": "Page size selector"
  }, pageSizeOptions.map(function (size) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: size,
      value: size
    }, size);
  })), "entries"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "search-box"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "search"
  }, "Search:"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: "search",
    value: searchTerm,
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    },
    "aria-label": "Search box"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-table-container"
  }, /*#__PURE__*/_react["default"].createElement("table", {
    className: "item-table",
    role: "grid"
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, renderHeader())), /*#__PURE__*/_react["default"].createElement("tbody", null, itemsToShow.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: item.id || "itemId-".concat(index)
    }, columns.map(function (column) {
      return /*#__PURE__*/_react["default"].createElement("td", {
        key: "".concat(item.id || "itemId-".concat(index), "-").concat(column.data),
        role: "gridcell"
      }, item[column.data]);
    }));
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "pagination-container"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Showing ", Math.max(1, currentPage * pageSize + 1), " to", " ", Math.min(filteredItems.length, (currentPage + 1) * pageSize), " of", " ", filteredItems.length, " entries"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bloc-nav",
    role: "navigation"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setCurrentPage(currentPage - 1);
    },
    disabled: currentPage === 0,
    "aria-label": "Previous page"
  }, "Previous"), renderPaginationButtons(), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setCurrentPage(currentPage + 1);
    },
    disabled: currentPage >= pageCount - 1,
    "aria-label": "Next page"
  }, "Next"))));
});
var _default = exports["default"] = DataTablePlugin;