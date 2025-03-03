import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const StepsChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="steps" stroke="#8884d8" strokeWidth={3} />
        <ReferenceLine y={8000} stroke="red" strokeDasharray="5 5" strokeWidth={3}/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StepsChart;