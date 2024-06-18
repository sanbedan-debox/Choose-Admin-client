import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { Menu } from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";
import Select from "react-select";
import RoundedButton from "../button/RoundedButton";

const RoopTable: React.FC<TableProps> = ({
  data,
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
  hscroll = false,
  filterable = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const [filterColumn, setFilterColumn] = useState<string>("");
  const [operator, setOperator] = useState<string>("contains");
  const [filterValue, setFilterValue] = useState<string>("");
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const columnOptions = headings.map((heading) => ({
      value: heading.dataKey,
      label: heading.title,
    }));
    setOptions(columnOptions);
  }, [headings]);

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
    });

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
    if (hovered) classes += "hover:bg-slate-900 ";
    return classes.trim();
  };

  const clearFilter = () => {
    setFilterColumn("");
    setOperator("contains");
    setFilterValue("");
    setCurrentPage(1);
  };

  return (
    <div
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
      className={`container mx-auto rounded-lg p-4 ${
        hscroll ? "max-w-[76rem]" : ""
      }`}
    >
      <div className="bg-dot-white/[0.12] md:bg-dot-white/[0.10]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-secondary bg-opacity-30 text-sm rounded-lg focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
            />
            {filterable && (
              <div className="flex items-center ml-4 max-h-10">
                <RoundedButton onClick={() => setShowFilter((prev) => !prev)}>
                  Filter
                </RoundedButton>
                {showFilter && (
                  <div className="flex items-center space-x-2">
                    <Select
                      classNames={{
                        placeholder: (state) => "!text-gray-400",
                        control: (state) =>
                          "!bg-secondary !bg-opacity-30 !border-none !text-sm !rounded-lg  !w-full  transition duration-150 ease-in-out !shadow-none ",
                        menu: (state) => "z-[100] !bg-[#142D5F] ",
                        singleValue: (state) => "!text-white",
                        option: (state) =>
                          `!text-sm hover:!bg-white hover:!text-black focus:!bg-transparent  ${
                            state.isFocused || state.isSelected
                              ? "!bg-transparent"
                              : ""
                          }`,
                      }}
                      classNamePrefix="react-select"
                      options={options}
                      value={options.find(
                        (option) => option.value === filterColumn
                      )}
                      onChange={(selectedOption) =>
                        setFilterColumn(selectedOption?.value || "")
                      }
                    />
                    {/* Operator dropdown */}
                    <Select
                      classNames={{
                        placeholder: (state) => "!text-gray-400",
                        control: (state) =>
                          "!bg-secondary !bg-opacity-30 !border-none !text-sm !rounded-lg  !w-full  transition duration-150 ease-in-out !shadow-none ",
                        menu: (state) => "z-[100] !bg-[#142D5F] ",
                        singleValue: (state) => "!text-white",
                        option: (state) =>
                          `!text-sm hover:!bg-white hover:!text-black focus:!bg-transparent  ${
                            state.isFocused || state.isSelected
                              ? "!bg-transparent"
                              : ""
                          }`,
                      }}
                      classNamePrefix="react-select"
                      options={operatorOptions}
                      value={operatorOptions.find(
                        (option) => option.value === operator
                      )}
                      onChange={(selectedOption) =>
                        setOperator(selectedOption?.value || "")
                      }
                    />
                    {/* Filter value input */}
                    <input
                      type="text"
                      placeholder="Filter Value"
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                      className="bg-secondary bg-opacity-30 text-sm rounded-lg focus:outline-none p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
                    />
                    <RoundedButton
                      onClick={clearFilter}
                      className="bg-red-500 p-2 rounded"
                    >
                      Clear
                    </RoundedButton>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex">
            {mainActions.map((action, index) => (
              <RoundedButton
                key={index}
                onClick={action.onClick}
                className="bg-primary p-2 mr-4 rounded"
              >
                {action.label}
              </RoundedButton>
            ))}
            {csvExport && (
              <CSVLink
                data={csvData}
                headers={csvHeaders}
                filename={csvFileName}
                className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-primary rounded-full hover:bg-white hover:text-primary focus:outline-none focus:bg-blue-400 md:w-auto w-32"
              >
                Export to CSV
              </CSVLink>
            )}
          </div>
        </div>
      </div>
      <div className="bg-dot-white/[0.12] md:bg-dot-white/[0.10]">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent rounded-lg overflow-hidden">
            <thead className="bg-slate-900 text-white">
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
              {displayedData.map((data, index) => (
                <tr
                  key={index}
                  className={`text-center ${rowClasses(
                    index
                  )} border-b border-slate-900`}
                >
                  {headings.map((heading, index) => (
                    <td key={index} className="py-4 px-4">
                      {heading.render
                        ? heading.render(getNestedValue(data, heading.dataKey))
                        : getNestedValue(data, heading.dataKey)}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="py-4 px-4">
                      <Menu as="div" className="inline-block text-left">
                        <Menu.Button className="inline-flex justify-center w-full rounded-md bg-black bg-opacity-20 px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          <HiDotsVertical
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          {actions.map((action, index) => (
                            <div key={index} className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => action.onClick(data)}
                                    className={`${
                                      active ? "bg-primary" : "text-gray-900"
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
      <div className="bg-dot-white/[0.12] md:bg-dot-white/[0.10]">
        <div className="flex justify-between items-center mt-4">
          <RoundedButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`bg-primary p-2 rounded ${
              currentPage === 1 ? "hidden" : ""
            }`}
          >
            Previous
          </RoundedButton>
          <span className="flex-1 text-center">
            Page {currentPage} of {totalPages}
          </span>
          <RoundedButton
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`bg-primary p-2 rounded ${
              currentPage === totalPages ? "hidden" : ""
            }`}
          >
            Next
          </RoundedButton>
        </div>
      </div>
    </div>
  );
};

export default RoopTable;
