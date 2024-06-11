import AuthenticatedRoute from "@/util/AuthenticatedRoute";

const RestaurantComponent: React.FC = () => {
  return (
    <AuthenticatedRoute>
      <div>Restaurant Management Component</div>
    </AuthenticatedRoute>
  );
};
export default RestaurantComponent;
