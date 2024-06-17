import React from "react";
import RoopTable from "@/components/common/CustomTable/table";
import Heading from "@/components/common/Headings/Heading";

const data = [
  {
    id: 1,
    name: "John Doe EAHFJKBAEKFB AEGFYAE IUFHUIAEFAEY FAEF FGAEUIF GUIAEGFIUAEG FIEAEGIUF GAEUIF IUAFUIE FIEAUGF IAEUVHD VAVIU AEIV AIV IUV AEIwrui giura iu fiufe eafu ruifiu",
    status: "active",
  },
  { id: 2, name: "Jane Smith", status: "inactive" },
  // More data...
];

const headings = [
  { title: "ID", dataKey: "id" },
  { title: "Name", dataKey: "name" },
  { title: "Name", dataKey: "name" },
  { title: "Name", dataKey: "name" },
  { title: "Name", dataKey: "name" },
  {
    title: "Status",
    dataKey: "status",
    render: (status: string) => (
      <button
        onClick={() => alert(`Status: ${status}`)}
        className={`p-2 rounded ${
          status === "active" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {status}
      </button>
    ),
  },
];

const App = () => {
  return (
    <div className="container mx-auto px-2">
      <Heading highlight="User Management" />
      <RoopTable
        data={data}
        itemsPerPage={5}
        headings={headings}
        actions={[{ label: "Edit", onClick: (id) => alert(`Edit ${id}`) }]}
        mainActions={[{ label: "Add New", onClick: () => alert("Add New") }]}
        filterable={true}
      />
    </div>
  );
};

export default App;
