import { fetchData } from "../axios_URL";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import CountUp from "react-countup";

import "./Home.css"; // import CSS file

function Home() {
  const [statistics, setStatistics] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetchData("GET", "/admin/settings/statistics")
      .then((response) => setStatistics(response.data))
      .catch((error) => console.error(error));
  }, []);

  if (!statistics) {
    return <div>Loading...</div>;
  }
  const formatNumber = (number) => {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 9,
      useGrouping: true,
    });
  };
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };
  return (
    <div className="home-container"> 
      <h1>
        Number of Users:{" "}
        <CountUp
          end={statistics.number_of_users}
          duration={2}
          separator=","
          formattingFn={formatNumber}
        />
      </h1>
      <PieChart width={400} height={400}>
        <Pie
          data={[
            { name: "Events", value: statistics.number_of_events },
            { name: "Tours", value: statistics.number_of_tours },
            { name: "Hotels", value: statistics.number_of_hotels },
            { name: "Restaurants", value: statistics.number_of_restaurants },
          ]}
          cx={200}
          cy={200}
          innerRadius={100}
          outerRadius={150}
          paddingAngle={5}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          <Cell key="events" fill="#82ca9d" />
          <Cell key="tours" fill="#ffc658" />
          <Cell key="hotels" fill="#8884d8" />
          <Cell key="restaurants" fill="#ff7f50" />
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="booking-container"> {/* add a class to the container */}
        <p>Number of Bookings Tour: {statistics.number_of_bookings_tour}</p>
        <p>Number of Bookings Event: {statistics.number_of_bookings_event}</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={[
            {
              name: "Events Booking",
              value: statistics.number_of_bookings_tour,
            },
            {
              name: "Tours Booking",
              value: statistics.number_of_bookings_event,
            },
          ]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="value"
            fill="#8884d8"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Home;