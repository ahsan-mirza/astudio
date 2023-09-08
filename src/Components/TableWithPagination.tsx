import Select from "react-select";

import React, { useState } from "react";
import Table from "./Table";

import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Product, User } from "../type";


const options = [
  { label: 5, value: 1 },
  { label: 10, value: 2 },
  { label: 20, value: 3 },
  { label: 50, value: 4 },
];

const TableWithPagination = ({ data, layout }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<User[] | Product[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [usersPerPage, setUsersPerPage] = useState<number>(options[0].label);
  // Assuming you have a list of users
  const users: any = data;

  // Function to handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    const filtered = users.filter((record:any) => 
      Object.values(record).some(val => 
        typeof val === 'string' && val.toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const sortedRecords = sortBy
    ? [...(filteredData.length > 0 ? filteredData : users)].sort((a, b) => {
        if (sortOrder === "asc") {
          if (typeof a[sortBy] == "number" || typeof b[sortBy] == "number") {
            return a[sortBy] - b[sortBy];
          } else {
            return a[sortBy].localeCompare(b[sortBy]);
          }
        } else if (sortOrder === "desc") {
          if (typeof a[sortBy] == "number" || typeof b[sortBy] == "number") {
            return b[sortBy] - a[sortBy];
          } else {
            return b[sortBy].localeCompare(a[sortBy]);
          }
        }
        return 0;
      })
    : filteredData.length > 0
    ? filteredData
    : users;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedRecords.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(sortedRecords.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const visiblePageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => index + 1
  );

  const handleSort = (key: any) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleOption = (selections: any) => {
    setUsersPerPage(selections!?.label);
    // const list = fetchUsers(selections, 5, 1, "").then((res) => res);
  };
  return (
    <div className="mt-5">
      <div className="d-flex align-items-center mb-3">
        <Select
          className="w-10"
          options={options}
          onChange={handleOption}
          value={options[usersPerPage]}
        />

        <span className="mx-2 h2"> | </span>
        <SearchBar changeHandle={handleSearch} />
        <span className="mx-2 h2"> | </span>
        {Object.values(layout.sort).map((i: any, index: number) => (
          <button
            key={index}
            className="btn me-2 fw-bold"
            onClick={() => handleSort(i.toLowerCase())}
          >
            {i} <FontAwesomeIcon icon={faCaretDown} />
          </button>
        ))}
  
      </div>

      <Table data={currentUsers} tableData={layout.table} />

      <div className="mt-2">
        <button
          className="btn btn-primary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {visiblePageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={
              currentPage === pageNumber
                ? "mx-1 btn btn-primary active"
                : "mx-1 btn btn-primary"
            }
          >
            {pageNumber}
          </button>
        ))}
        {totalPages > 5 && currentPage <= totalPages - 3 && (
          <span className="mx-1 btn ">...</span>
        )}
        {totalPages > 5 && currentPage >= totalPages - 2 && (
          <button
            className="mx-1 btn btn-primary"
            onClick={() => paginate(currentPage + 2)}
          >
            {currentPage + 2}
          </button>
        )}
        {totalPages > 5 && currentPage <= totalPages - 1 && (
          <button
            className="mx-1 btn btn-primary"
            onClick={() => paginate(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="mx-1 btn btn-primary"
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TableWithPagination;
