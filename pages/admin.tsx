import AuthenticatedRoute from "@/util/AuthenticatedRoute";

// Define components for each sidebar item
const AdminComponent: React.FC = () => {
  return (
    <AuthenticatedRoute>
      <div>Admin Management Component</div>;
    </AuthenticatedRoute>
  );
};
export default AdminComponent;
