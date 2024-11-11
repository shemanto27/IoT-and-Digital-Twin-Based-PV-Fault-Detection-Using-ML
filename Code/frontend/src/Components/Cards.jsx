import { LiaTemperatureHighSolid } from "react-icons/lia";
import { TbTemperatureCelsius } from "react-icons/tb";
import { MdSunny } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa";

import { ref, getDatabase, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import app from "./Firebase";

function Cards() {
    const [data, setData] = useState({});

  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    const database = getDatabase(app);
    
    // Reference to the specific collection in the database
    const collectionRef = ref(database, "Sensors");

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();
        

        // Check if dataItem exists
        if (dataItem) {
          setData(dataItem);
        }
      });
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  const {Current, Irradiance, Temperature, Voltage} = data;
  const Power = (Current*Voltage).toFixed(2);
  

  return (
    <>
      {/* Data Cards */}
      <div className="flex flex-wrap">
        {/* Temperature */}
        <div className="card bg-[#DA3E27] w-fit h-40 shadow-xl text-white flex flex-col justify-center items-center m-5 p-5">
        <div className="flex justify-center items-center text-3xl gap-2"><LiaTemperatureHighSolid className="text-5xl" /><p>Cell Temp.</p></div>
        <div className="flex justify-center items-center text-4xl"><p>{Temperature}</p><TbTemperatureCelsius /></div>
      </div>

      {/* Current & Voltage */}
      <div className="card bg-[#FF9241] w-fit h-40 shadow-xl text-white flex flex-col justify-center items-center m-5 p-5">
        <div className="flex justify-center items-center text-3xl gap-2"><AiFillThunderbolt className="text-5xl" /><p>Current & Voltage</p></div>
        <div className="flex justify-center items-center text-4xl"><p>I: {Current}A | V: {Voltage}V</p></div>
      </div>

      {/* Irradiance */}
      <div className="card bg-[#FAB627] w-fit h-40 shadow-xl text-white flex flex-col justify-center items-center m-5 p-5">
        <div className="flex justify-center items-center text-3xl gap-2"><MdSunny className="text-5xl" /><p>Irradiance</p></div>
        <div className="flex justify-center items-center text-4xl"><p>{Irradiance} W/m<sup>2</sup></p></div>
      </div>

      {/* Power */}
      <div className="card bg-[#34C687] w-fit h-40 shadow-xl text-white flex flex-col justify-center items-center m-5 p-5">
        <div className="flex justify-center items-center text-3xl gap-2"><FaPowerOff className="text-5xl" /><p>Power</p></div>
        <div className="flex justify-center items-center text-4xl"><p>{Power} Watt</p></div>
      </div>
      </div>
    </>
  )
}

export default Cards
