import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/api";
import TableWithPagination from "../Components/TableWithPagination";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";



const layout = {
  sort: {
    username: "userName",
    email: "Email",
    age: "Age",
    gender: "Gender",
  },
  table: {
    firstName: "First Name",
    lastName: "Last Name",
    maidenName: "Maiden Name ",
    age: "Age",
    gender: "Gender",
    email: "Email",
    username: "User Name",
    bloodGroup: "Blood Group",
    eyeColor: "Eye Color"
  },
};

const User = () => {
  const [data, setData] = useState<any>([]);
  const { state, setState } = useAppContext();

  useEffect(() => {
    const fetchData = async (
      limit: number,
      pageSize: number,
      page: number,
      search: string
    ) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/users?limit=${limit}&pageSize=${pageSize}&page=${page}&search=${search}`
        ); 
        setState({User:response.data.users, Products:state.Products})
        setData(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(100, 1, 1, "");
  }, []);
  return (
    <div className="App p-5">
        <h2>User Data</h2>
      <TableWithPagination data={data} layout={layout}/>
      <Link to='/products' className="mt-10"> Products Data </Link>
    </div>
  );
};

export default User;
