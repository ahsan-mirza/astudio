import axios from "axios";
import React, { useEffect, useState } from "react";
import TableWithPagination from "../Components/TableWithPagination";
import { API_BASE_URL } from "../services/api";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const layout = {
  sort: {
    title: "Title",
    price: "Price",
    brand: "Brand",
    category: "Category",
  },
  table: {
    id: "Id",
    title: "Title",
    brand: "Brand",
    description: "Description",
    category: "Category",
    discountPercentage: "Discount Percentage",
    price: "Price",
    stock: "Stock",
    rating: "Rating",
  },
};
const Product = () => {
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
          `${API_BASE_URL}/products?limit=${limit}&pageSize=${pageSize}&page=${page}&search=${search}`
        ); 

        setState({User:state.User, Products:response.data.products})
        setData(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(100, 1, 1, "");
  }, []);
  return (
    <div className="App p-5">
      <h2>Products Data</h2>
      <TableWithPagination data={data} layout={layout} />
      <Link to='/' className="mt-5"> User Data </Link>
    </div>
  );
};

export default Product;
