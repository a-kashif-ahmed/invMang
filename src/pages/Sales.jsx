import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import SalesRoom from "./SalesRoom";
import { useState} from "react";

function Sales() {
  const [tabs, setTabs] = useState([
    { id: 1, title: "Room 1" },
    { id: 2, title: "Room 2" },
    { id: 3, title: "Room 3" },
    { id: 4, title: "Room 4" },
    { id: 5, title: "Room 5" },
    { id: 6, title: "Room 6" },
  ]);
  const [activeTab, setActiveTab] = useState(1);

  const addTab = () => {
    const newId = Date.now();
    setTabs([...tabs, { id: newId, title: `Room ${tabs.length + 1}` }]);
    setActiveTab(newId);
  };

  const closeTab = (id) => {
    const filtered = tabs.filter(tab => tab.id !== id);
    setTabs(filtered);

    if (id === activeTab && filtered.length) {
      setActiveTab(filtered[filtered.length - 1].id);
    }
  };

  return (
    <div className="bg-gray-50 h-screen overflow-hidden">
      <div className="flex h-full">

        <Navbar />

        {/* MAIN CONTENT */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopBar />

          {/* Tabs */}
          <div className="flex items-center bg-gray-200 border-b overflow-x-auto">
            {tabs.map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer border-r whitespace-nowrap
                ${activeTab === tab.id
                  ? "bg-white font-semibold"
                  : "bg-gray-200 hover:bg-gray-300"}`}
              >
                {tab.title}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </span>
              </div>
            ))}

            <button
              onClick={addTab}
              className="px-4 text-xl hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Room Content */}
          <div className="flex-1 overflow-auto">
            {tabs.map(tab =>
              tab.id === activeTab ? <SalesRoom key={tab.id} /> : null
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sales;