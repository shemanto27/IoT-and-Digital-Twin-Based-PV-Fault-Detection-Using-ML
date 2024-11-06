import { LiaTemperatureHighSolid } from "react-icons/lia";
import { TbTemperatureCelsius } from "react-icons/tb";
import { MdSunny } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,ReferenceLine, Legend, ResponsiveContainer } from 'recharts';

function Home() {
  const ivData = [
    { voltage: 0, current: 8.36 },          // Short circuit
    { voltage: 10, current: 8.35 },
    { voltage: 20, current: 8.34 },
    { voltage: 29.7, current: 8.33 },        // Maximum power point
    { voltage: 35.6, current: 0 },           // Open circuit
  ];
  
  return (
    <>
    {/* Data Cards */}
      <div className="flex flex-wrap">
        {/* Temperature */}
        <div className="card bg-[#DA3E27] w-fit h-40 shadow-xl text-white flex flex-col justify-center items-center m-5 p-5">
        <div className="flex justify-center items-center text-3xl gap-2"><LiaTemperatureHighSolid className="text-5xl" /><p>Cell Temp.</p></div>
        <div className="flex justify-center items-center text-4xl"><p>25</p><TbTemperatureCelsius /></div>
      </div>

      {/* Current & Voltage */}
      <div className="card bg-[#FF9241] w-fit h-40 shadow-xl text-white flex flex-col justify-center items-center m-5 p-5">
        <div className="flex justify-center items-center text-3xl gap-2"><AiFillThunderbolt className="text-5xl" /><p>Current & Voltage</p></div>
        <div className="flex justify-center items-center text-4xl"><p>I: 2A | V: 5V</p></div>
      </div>

      {/* Irradiance */}
      <div className="card bg-[#FAB627] w-fit h-40 shadow-xl text-white flex flex-col justify-center items-center m-5 p-5">
        <div className="flex justify-center items-center text-3xl gap-2"><MdSunny className="text-5xl" /><p>Irradiance</p></div>
        <div className="flex justify-center items-center text-4xl"><p>25 W/m<sup>2</sup></p></div>
      </div>

      {/* Power */}
      <div className="card bg-[#34C687] w-fit h-40 shadow-xl text-white flex flex-col justify-center items-center m-5 p-5">
        <div className="flex justify-center items-center text-3xl gap-2"><FaPowerOff className="text-5xl" /><p>Power</p></div>
        <div className="flex justify-center items-center text-4xl"><p>25 Watt</p></div>
      </div>
      </div>

    {/* Chart */}
    
    <div className="md:w-1/2 w-fit h-96 my-5 shadow-xl card flex flex-col justify-center items-center m-5 p-5">
    <ResponsiveContainer>
      <LineChart data={ivData} margin={{ top: 20, right: 50, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="voltage" 
          label={{ value: 'Voltage (V)', position: 'insideBottomRight', offset: -5 }} 
          type="number" 
          domain={[0, 40]} 
        />
        <YAxis 
          label={{ value: 'Current (A)', angle: -90, position: 'insideLeft' }} 
          type="number" 
          domain={[0, 10]}
          ticks={[0, 2, 4, 6, 8, 9, 10]} 
        />
        <Tooltip />
        
        {/* Dashed I-V Curve Line */}
        <Line 
          type="monotone" 
          dataKey="current" 
          stroke="#FF7300" 
          strokeDasharray="5 5"  // Dashed line
          dot={{ stroke: '#FF7300', strokeWidth: 2 }} 
        />

        {/* Reference Lines for Important Points */}
        
        {/* Short Circuit Current (Isc) */}
        <ReferenceLine 
          x={0} 
          y={8.36} 
          label={{ value: "Isc = 8.36 A", position: 'top', offset: 20 }} 
          stroke="blue" 
          strokeDasharray="3 3" 
        />
        
        {/* Open Circuit Voltage (Voc) */}
        <ReferenceLine 
          x={35.6} 
          y={0} 
          label={{ value: "Voc = 35.6 V", position: 'bottom', offset: -70 }} 
          stroke="red" 
          strokeDasharray="3 3" 
        />

        {/* Maximum Power Current (Imp) */}
        <ReferenceLine 
          x={29.7} 
          y={8.33} 
          label={{ value: "Imp = 8.33 A", position: 'top', offset: -20 }} 
          stroke="green" 
          strokeDasharray="3 3" 
        />

        {/* Maximum Power Voltage (Vmp) */}
        <ReferenceLine 
          x={29.7} 
          label={{ value: "Vmp = 29.7 V", position: 'top', offset: 5 }} 
          stroke="purple" 
          strokeDasharray="3 3" 
        />
        
        {/* Peak Power (Pmax) */}
        <ReferenceLine 
          x={29.7} 
          y={8.33} 
          label={{ value: "Pmax = 250 W", position: 'right', offset: 10 }} 
          stroke="orange" 
          strokeDasharray="3 3" 
        />

      </LineChart>
    </ResponsiveContainer>
</div>


    </>
  )
}

export default Home
