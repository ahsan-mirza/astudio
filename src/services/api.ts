import axios from "axios";

export const API_BASE_URL = "https://dummyjson.com";

export const fetchUsers = async (
  limit: number,
  pageSize: number,
  page: number,
  search: string
) => {
  const data = await axios.get(
      `${API_BASE_URL}/users?limit=${limit}&pageSize=${pageSize}&page=${page}&search=${search}`
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });


  return data;
};

// export const fetchUsers = () => {
//   return axios.get(`${API_BASE_URL}/users`);
// };

export const fetchProducts = (
  pageSize: number,
  page: number,
  search: string
) => {
  return axios.get(
    `${API_BASE_URL}/products?pageSize=${pageSize}&page=${page}&search=${search}`
  );
};
