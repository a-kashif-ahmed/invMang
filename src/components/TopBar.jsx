import { useState,useEffect } from "react";

function TopBar(){
    return (
        <div className="shadow-md w-screen h-20 flex "> 
            <h1 className="text-xl p-5 font-serif">Mushroom Inventory Managemant App</h1>
                <input
                type="text"
                placeholder="Search Name or Part No."
                className="flex justify-end m-5 w-screen/30 h-10  max-w-4xl rounded-3xl px-7 py-2 border-2 border-gray-400 focus:border-blue-500 outline-none text-lg shadow-sm"/>
                <img src="" alt="profile" className="w-10 h-7 rounded-full border-t bg-gray-300 p-5 m-5"/>
              
        </div>
    )
}

export default TopBar;