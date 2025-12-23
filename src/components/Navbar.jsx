import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-blue-800 text-white transition-all duration-300 
      ${open ? "w-48" : "w-14"} flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        {open && (
          <h5 className="text-lg font-semibold whitespace-nowrap">
            Sidebar
          </h5>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-blue-700"
        >
          {open ? "⟨" : "⟩"}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 p-2">
        {menuItem("Home", open,'/')}
        {menuItem("Purchases", open,'/purchases')}
        {menuItem("Sales", open,'/sales')}
        {/* {menuItem("Profile", open)}
        {menuItem("Settings", open)}
        {menuItem("Logout", open)}  */}
      </nav>
    </div>
  );
}

function menuItem(label, open,link) {
  return (
    <div
      role="button"
      className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
    >
      <span className="w-6 h-6 bg-white/30 rounded" />
      {open && <a href={link} ><span className="whitespace-nowrap">{label}</span></a>}
    </div>
  );
}

export default Navbar;
