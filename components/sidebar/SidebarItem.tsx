interface SidebarItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  active,
  onClick,
}) => {
  return (
    <div
      className={`py-2 cursor-pointer ${active ? "bg-gray-700" : ""}`}
      onClick={onClick}
    >
      <span className="ml-4">{label}</span>
    </div>
  );
};

export default SidebarItem;
