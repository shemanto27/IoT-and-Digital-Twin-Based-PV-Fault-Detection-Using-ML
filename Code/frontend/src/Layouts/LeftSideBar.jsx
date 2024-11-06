import { IoHome } from "react-icons/io5";
import { MdOutlineHistory, MdAddAlert } from "react-icons/md";

function LeftSideBar() {
  return (
    <>
      <div className="w-60 h-screen bg-gray-100">
        <div className="flex items-center gap-2 mx-5  pt-5"><IoHome className="text-2xl" /> Home</div>
        <div className="flex items-center gap-2 mx-5  pt-5"> <MdOutlineHistory className="text-2xl" />History</div>
        <div className="flex items-center gap-2 mx-5 pt-5"><MdAddAlert className="text-2xl" /> Alert</div>
      </div>
    </>
  )
}

export default LeftSideBar
