import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import Sales from "./Sales";

function Homepage(){
    const [navbar,setNavbar] = useState(true);
    return (
        <div className="bg-gray-50">
            <div className="flex">
                <Navbar/>
                
                <TopBar/>
            </div>
            
            
        </div>
    )
}

export default Homepage;