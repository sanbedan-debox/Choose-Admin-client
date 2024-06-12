import { useState } from "react";
import { CSVLink } from "react-csv";

interface Member {
  id: number;
  name: string;
  email: string;
  function: string;
  status: string;
  employed: string;
}

const MembersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "John Michael",
      email: "john@creative-tim.com",
      function: "Manager",
      status: "ONLINE",
      employed: "23/04/18",
    },
    {
      id: 2,
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      function: "Programator",
      status: "OFFLINE",
      employed: "23/04/18",
    },
    {
      id: 3,
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      function: "Executive",
      status: "OFFLINE",
      employed: "19/09/17",
    },
    {
      id: 4,
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      function: "Programator",
      status: "ONLINE",
      employed: "24/12/08",
    },
    {
      id: 5,
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      function: "Manager",
      status: "OFFLINE",
      employed: "04/10/21",
    },
  ]);

  const itemsPerPage = 2;

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const displayedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleRoleAccess = (id: number) => {
    alert(`Access roles for member ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <CSVLink
          data={members}
          filename={"members.csv"}
          className="btn btn-primary"
        >
          Export to CSV
        </CSVLink>
      </div>
      <table className="min-w-full bg-transparent">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Function</th>
            <th className="py-2">Status</th>
            <th className="py-2">Employed</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedMembers.map((member) => (
            <tr key={member.id} className="text-center">
              <td className="py-2">{member.name}</td>
              <td className="py-2">{member.email}</td>
              <td className="py-2">{member.function}</td>
              <td className="py-2">{member.status}</td>
              <td className="py-2">{member.employed}</td>
              <td className="py-2">
                <button
                  onClick={() => handleDelete(member.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleRoleAccess(member.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Access Roles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-primary p-2 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-primary p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MembersList;
