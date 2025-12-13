function BottomNavBar({ active }) {
    return (
        <nav className="bottomnav fixed bottom-0 font-mono text-white left-0 right-0 bg-gray-700 border-2 rounded-lg hover:shadow-lg  flex justify-around items-center ">
            <div className={`hover:bg-cyan-300 p-5 rounded-lg hover:text-xl hover:text-black ${active === 'home' ? 'bg-cyan-300 text-xl text-black' : ''} `}><a href="/"><p className=" text-4xl flex justify-center ">🏠</p> Home</a></div>

            <div className={`hover:bg-cyan-300 p-5 rounded-lg hover:text-xl hover:text-black ${active === 'directory' ? 'bg-cyan-300 text-xl text-black' : ''} `}><a href="/directory"><p className=" text-4xl flex justify-center ">📋</p> Inventory Directory</a></div>

            <div className={`hover:bg-cyan-300 p-5 rounded-lg hover:text-xl hover:text-black ${active === 'purchases' ? 'bg-cyan-300 text-xl text-black' : ''} `}><a href="/purchases"><p className=" text-4xl flex justify-center ">⬇️</p> Purchases</a></div>

            <div className={`hover:bg-cyan-300 p-5 rounded-lg hover:text-xl hover:text-black ${active === 'sales' ? 'bg-cyan-300 text-xl text-black' : ''} `}><a href="/sales"><p className=" text-4xl flex justify-center ">⬆️</p> Sales</a></div>

            <div className={`hover:bg-cyan-300 p-5 rounded-lg hover:text-xl hover:text-black ${active === 'inventory' ? 'bg-cyan-300 text-xl text-black' : ''} `}><a href="/inventory"><p className=" text-4xl flex justify-center ">📦</p> Inventory Left</a></div>

            <div className={`hover:bg-cyan-300 p-5 rounded-lg hover:text-xl hover:text-black ${active === 'loi' ? 'bg-cyan-300 text-xl text-black' : ''} `}><a href="/tbo"> <p className=" text-4xl flex justify-center ">⚠️</p> Low on Inventory</a></div>

            <div className={`hover:bg-cyan-300 p-5 rounded-lg hover:text-xl hover:text-black ${active === 'pl' ? 'bg-cyan-300 text-xl text-black' : ''} `}><a href="/pl">
            <p className=" text-4xl flex justify-center ">📊</p>Profit & Loss</a></div>
        </nav>
    )
}
export default BottomNavBar;