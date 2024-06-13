import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { Menu } from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";

interface Action {
  label: string;
  onClick: (id: number) => void;
}

interface MainAction {
  label: string;
  onClick: () => void;
}

interface Heading {
  title: string;
  dataKey: string;
}

interface TableProps {
  data: Array<Record<string, any>>;
  itemsPerPage: number;
  actions?: Action[];
  mainActions?: MainAction[];
  csvExport?: boolean;
  fullCsv?: boolean;
  csvFileName?: string;
  headings: Heading[];
  striped?: boolean;
  bordered?: boolean;
  hovered?: boolean;
}

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
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMembers = data.filter((member) =>
    Object.values(member).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg flex-wrap focus:border-none mr-5"
        />
        <div className="flex">
          {mainActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="bg-primary p-2 mr-4 rounded"
            >
              {action.label}
            </button>
          ))}
          {csvExport && (
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename={csvFileName}
              className="bg-primary p-2 rounded"
            >
              Export to CSV
            </CSVLink>
          )}
        </div>
      </div>
      <table className="min-w-full bg-transparent rounded-lg overflow-hidden">
        <thead className="bg-slate-900 text-white">
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="py-2 first:rounded-tl-lg last:rounded-tr-lg"
              >
                {heading.title}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="py-2 first:rounded-tl-lg last:rounded-tr-lg">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((member, index) => (
            <tr
              key={index}
              className={`text-center ${rowClasses(
                index
              )} border-b border-slate-900`}
            >
              {headings.map((heading, index) => (
                <td key={index} className="py-4">
                  {getNestedValue(member, heading.dataKey)}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="py-4 ">
                  <Menu as="div" className="inline-block text-left">
                    <Menu.Button className="inline-flex justify-center w-full rounded-md bg-black bg-opacity-20 px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <HiDotsVertical className="w-5 h-5" aria-hidden="true" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      {actions.map((action, index) => (
                        <div key={index} className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => action.onClick(member.id)}
                                className={`${
                                  active ? "bg-primary" : "text-gray-900"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
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
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`bg-primary p-2 rounded ${
            currentPage === 1 ? "hidden" : ""
          }`}
        >
          Previous
        </button>
        <span className="flex-1 text-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`bg-primary p-2 rounded ${
            currentPage === totalPages ? "hidden" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoopTable;
