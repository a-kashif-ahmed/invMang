import { useEffect, useState } from 'react';
import StatusSphere from './StatusSphere';
function TopNavBar() {
  const [dbStatus, setDbStatus] = useState('');
  useEffect(() => {
    const checkDB =() =>{fetch('http://localhost:8017/health').then(res => {
      
      if (res.ok) {
        setDbStatus("Connected");
      } else {
        setDbStatus("Not Connected");
      }
    }); };
    checkDB();

    
    const interval = setInterval(checkDB, 5000);

    
    return () => clearInterval(interval);
  }, []);
  return (
    <nav className="topnav fixed top-0 left-0 right-0 bg-cyan-300 border-2 rounded-lg shadow-lg p-7 flex items-center justify-between">


      <div className="flex items-center gap-3">
        {/* <img src="" alt="logo" className="w-20 h-10" /> */}
        <h1 className="italic text-3xl">Inventory Management</h1>
      </div>


      <StatusSphere
        text={dbStatus}
        color={dbStatus === 'Connected' ? 'bg-teal-700' : 'bg-red-500'}
      />


    </nav>

  )
}

export default TopNavBar