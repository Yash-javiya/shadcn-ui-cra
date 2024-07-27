import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link to="#" className="flex items-center gap-2 font-semibold">
        <ClipboardList className="h-6 w-6" />
        <span className="">Task Manager</span>
      </Link>
    </div>
  );
}

export default Logo;
