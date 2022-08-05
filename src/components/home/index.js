import React, { useEffect, useState } from "react";
import axios from "axios";

import "./home.css";
import { Table } from "antd";
import Loading from "../loading";

const Home = () => {
  const [foods, setFoods] = useState("");

  const getFoodDetails = async () => {
    const req = await axios.get("http://18.159.132.68/foods");
    const res = await req.data;
    setFoods(res);
  };

  const deleteFood = async (id) => {
    const req = await axios.delete(`http://localhost:5000/deleteFood/${id}`);
    const res = await req.data;
    setFoods(res);
  };

  useEffect(() => {
    getFoodDetails();
    deleteFood();
  }, []);

  const columns = [
    { key: "1", title: "Food Name", dataIndex: "name" },
    { key: "2", title: "Food Description", dataIndex: "description" },
    {
      title: "Action",
      dataIndex: "",
      key: "3",
      render: () => <a>Delete</a>,
    },
  ];

  return (
    <div className="container">
      <div className="table">
        {foods ? <Table dataSource={foods} columns={columns} /> : <Loading />}
      </div>
    </div>
  );
};

export default Home;
