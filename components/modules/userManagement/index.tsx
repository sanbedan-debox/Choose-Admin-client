// import React from "react";
// import RoopTable from "@/components/common/CustomTable/table";

// const UserManagement: React.FC = () => {
//   const members = [
//     {
//       id: 1,
//       name: "John Michael",
//       email: "john@creative-tim.com",
//       function: "Manager",
//       status: "ONLINE",
//       employed: "23/04/18",
//     },
//     {
//       id: 2,
//       name: "Alexa Liras",
//       email: "alexa@creative-tim.com",
//       function: "Programator",
//       status: "OFFLINE",
//       employed: "23/04/18",
//     },
//     {
//       id: 3,
//       name: "Laurent Perrier",
//       email: "laurent@creative-tim.com",
//       function: "Executive",
//       status: "OFFLINE",
//       employed: "19/09/17",
//     },
//     {
//       id: 4,
//       name: "Michael Levi",
//       email: "michael@creative-tim.com",
//       function: "Programator",
//       status: "ONLINE",
//       employed: "24/12/08",
//     },
//     {
//       id: 5,
//       name: "Richard Gran",
//       email: "richard@creative-tim.com",
//       function: "Manager",
//       status: "OFFLINE",
//       employed: "04/10/21",
//     },
//   ];

//   const actions = [
//     {
//       label: "Delete",
//       onClick: (id: number) => {
//         alert(`Delete member with ID: ${id}`);
//       },
//     },
//     {
//       label: "Access Email",
//       onClick: (id: number) => {
//         alert(`Access roles for member ID: ${id}`);
//       },
//     },
//   ];
//   const mainActions = [
//     {
//       label: "Add User",
//       onClick: () => {
//         alert("Main Action 1 clicked");
//       },
//     },
//   ];
//   const headings = [
//     { title: "Name", dataKey: "name" },
//     { title: "Email", dataKey: "email" },
//     { title: "Function", dataKey: "function" },
//     { title: "Status", dataKey: "status" },
//     { title: "Employed", dataKey: "employed" },
//     { title: "Employed", dataKey: "employed" },
//     { title: "Employed", dataKey: "employed" },
//     { title: "Employed", dataKey: "employed" },
//   ];

//   return (
//     <div>
//       <h1 className="text-2xl font-bold">User Management</h1>
//       <p>Welcome to the User Management section!</p>
//       <RoopTable
//         data={members}
//         itemsPerPage={5}
//         actions={actions}
//         mainActions={mainActions}
//         csvExport
//         headings={headings}
//         filterable
//         hovered
//       />
//     </div>
//   );
// };

// export default UserManagement;
import RoopTable from "@/components/common/CustomTable/table";
import React from "react";

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
    <div className="App">
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
