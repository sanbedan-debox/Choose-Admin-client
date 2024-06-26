import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { Menu } from "@headlessui/react";
import {
  HiDotsVertical,
  HiChevronLeft,
  HiChevronRight,
  HiFilter,
} from "react-icons/hi";
import Select from "react-select";
import useGlobalStore from "@/store/global";
import CButton from "../button/button";
import { ButtonType } from "../button/interface";
import ReusableModal from "../modal/modal";

interface TableProps {
  data: any[];
  itemsPerPage: number;
  actions?: { label: string; onClick: (data: any) => void; style?: string }[];
  mainActions?: { label: string; onClick: () => void }[];
  csvExport?: boolean;
  fullCsv?: boolean;
  csvFileName?: string;
  headings: {
    title: string;
    dataKey: string;
    render?: (value: any) => React.ReactNode;
  }[];
  striped?: boolean;
  bordered?: boolean;
  hovered?: boolean;
  filterable?: boolean;
}

const RoopTable: React.FC<TableProps> = ({
  data = [],
  itemsPerPage,
  actions = [],
  mainActions = [],
  csvExport = true,
  fullCsv = true,
  csvFileName = "data.csv",
  headings,
  striped = false,
  bordered = false,
  hovered = false,
  filterable = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [filterColumn, setFilterColumn] = useState<string>("");
  const [operator, setOperator] = useState<string>("contains");
  const [filterValue, setFilterValue] = useState<string>("");
  const [options, setOptions] = useState<any[]>([]);
  const { isSidebarExpanded } = useGlobalStore();
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  useEffect(() => {
    const columnOptions = headings.map((heading) => ({
      value: heading.dataKey,
      label: heading.title,
    }));
    setOptions(columnOptions);
  }, [headings]);

  useEffect(() => {
    setCurrentPage(1);
    setIsFilterApplied(!!filterColumn && !!filterValue);
  }, [filterColumn, filterValue, searchTerm]);

  const operatorOptions = [
    { value: "contains", label: "Contains" },
    { value: "equals", label: "Equals" },
    { value: "startswith", label: "Starts With" },
    { value: "endswith", label: "Ends With" },
    { value: "isempty", label: "Is Empty" },
    { value: "isnotempty", label: "Is Not Empty" },
    { value: "isanyof", label: "Is Any Of" },
  ];

  const filteredMembers = data
    ? data
        .filter((member) =>
          Object.values(member).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
        .filter((member) => {
          if (!filterColumn || !filterValue) {
            return true;
          }

          const memberValue = member[filterColumn];

          switch (operator) {
            case "contains":
              return String(memberValue)
                .toLowerCase()
                .includes(filterValue.toLowerCase());
            case "equals":
              return (
                String(memberValue).toLowerCase() === filterValue.toLowerCase()
              );
            case "startswith":
              return String(memberValue)
                .toLowerCase()
                .startsWith(filterValue.toLowerCase());
            case "endswith":
              return String(memberValue)
                .toLowerCase()
                .endsWith(filterValue.toLowerCase());
            case "isempty":
              return !memberValue;
            case "isnotempty":
              return !!memberValue;
            case "isanyof":
              const filterValues = filterValue
                .split(",")
                .map((value) => value.trim().toLowerCase());
              return filterValues.includes(String(memberValue).toLowerCase());
            default:
              return true;
          }
        })
    : [];

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const displayedData = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const csvData = fullCsv ? data : displayedData;

  const csvHeaders = headings.map((heading) => ({
    label: heading.title,
    key: heading.dataKey,
  }));

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((value, key) => value?.[key] ?? "", obj);
  };

  const rowClasses = (index: number) => {
    let classes = "";
    if (striped && index % 2 === 0) classes += "bg-slate-900 ";
    if (bordered) classes += "border ";
    if (hovered) classes += "hover:bg-primary hover:bg-opacity-10 ";
    return classes.trim();
  };

  const clearFilter = () => {
    setFilterColumn("");
    setOperator("contains");
    setFilterValue("");
    setCurrentPage(1);
    setIsFilterApplied(false);
  };

  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  };

  const applyFilter = () => {
    setShowFilterModal(false);
    setCurrentPage(1);
    setIsFilterApplied(true);
  };

  const handleExportClick = () => {
    if (isFilterApplied) {
      setShowExportModal(true);
    } else {
      document.getElementById("csvLink")?.click();
    }
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-black text-2xl">
        No data to display.
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto rounded-lg p-4 bg-white text-black ${
        isSidebarExpanded ? "max-w-[76rem]" : "max-w-[85rem]"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-secondary bg-opacity-30 text-sm rounded-lg block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent w-96"
          />

          {filterable && (
            <div className="flex items-center ml-4">
              <HiFilter
                className="text-white cursor-pointer hover:text-primary transition-colors duration-300"
                onClick={() => setShowFilterModal(true)}
                style={{ height: "2rem", width: "2rem" }}
              />
            </div>
          )}
        </div>

        <div className="flex">
          {mainActions.map((action, index) => (
            <CButton
              key={index}
              type={ButtonType.Outlined}
              onClick={action.onClick}
            >
              {action.label}
            </CButton>
          ))}
          {csvExport && (
            <div className="flex space-x-2">
              <CButton type={ButtonType.Primary} onClick={handleExportClick}>
                Export to CSV
              </CButton>
              {/* Hidden CSVLink for full data export */}
              <CSVLink
                id="csvLink"
                data={data}
                headers={csvHeaders}
                filename={csvFileName}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-dot-white/[0.12] md:bg-dot-white/[0.10]">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent rounded-lg overflow-hidden">
            <thead className="bg-primary bg-opacity-80 text-white">
              <tr>
                {headings.map((heading, index) => (
                  <th
                    key={index}
                    className="py-2 px-4 first:rounded-tl-lg last:rounded-tr-lg"
                  >
                    {heading.title}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="py-2 px-4 first:rounded-tl-lg last:rounded-tr-lg">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {displayedData.map((rowData, index) => (
                <tr
                  key={index}
                  className={`text-center ${rowClasses(
                    index
                  )} border-b border-red text-black`}
                >
                  {headings.map((heading, colIndex) => (
                    <td
                      key={colIndex}
                      className="py-4 px-4 first:rounded-bl-lg last:rounded-br-lg"
                    >
                      {heading.render
                        ? heading.render(
                            getNestedValue(rowData, heading.dataKey)
                          )
                        : truncateString(
                            getNestedValue(rowData, heading.dataKey),
                            65
                          )}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="py-4 px-4">
                      <Menu as="div" className="inline-block text-left">
                        <Menu.Button className="inline-flex justify-center w-full rounded-md bg-black bg-opacity-20 px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          <HiDotsVertical
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                          {actions.map((action, menuIndex) => (
                            <div key={menuIndex} className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => action.onClick(rowData)}
                                    className={`${
                                      active
                                        ? "bg-primary text-white"
                                        : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm ${
                                      action.style
                                    }`}
                                  >
                                    {action.label}
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          ))}
                        </Menu.Items>
                      </Menu>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ReusableModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filter Data"
        width="md"
      >
        <div className="flex items-center space-x-2">
          <Select
            options={options}
            value={options.find((opt) => opt.value === filterColumn)}
            onChange={(selected) => setFilterColumn(selected?.value || "")}
          />
          <Select
            options={operatorOptions}
            value={operatorOptions.find((opt) => opt.value === operator)}
            onChange={(selected) => setOperator(selected?.value || "")}
          />
          <input
            type="text"
            placeholder="Filter Value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="bg-secondary bg-opacity-30 text-sm rounded-lg p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
          />
          <CButton type={ButtonType.Warning} onClick={clearFilter}>
            Clear
          </CButton>
        </div>
        <div className="flex justify-end mt-4">
          <CButton type={ButtonType.Primary} onClick={applyFilter}>
            Apply Filter
          </CButton>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Data"
        width="md"
      >
        <div className="flex flex-col space-y-4">
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={csvFileName}
            className="flex items-center justify-center h-10 px-4 py-2 m-1 text-white text-sm transition-colors duration-300 transform bg-primary rounded-full hover:bg-white hover:text-primary md:w-auto w-32"
          >
            Export Full Table
          </CSVLink>
          <CSVLink
            data={displayedData}
            headers={csvHeaders}
            filename={`filtered_${csvFileName}`}
            className="h-10 px-4 py-2 m-1 text-white text-sm transition-colors duration-300 transform bg-primary rounded-full hover:bg-white hover:text-primary"
          >
            Export Filtered Table
          </CSVLink>
        </div>
      </ReusableModal>
      <div className="bg-dot-white/[0.12] md:bg-dot-white/[0.10]">
        <div className="flex justify-between items-center mt-4">
          {currentPage !== 1 && (
            <HiChevronLeft
              className="cursor-pointer text-white text-2xl"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
          )}
          <span className="flex-1 text-center">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage !== totalPages && (
            <HiChevronRight
              className="cursor-pointer text-white text-2xl"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoopTable;
