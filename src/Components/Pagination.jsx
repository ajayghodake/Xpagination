import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import style from "./pagination.module.css";

export default function Pagination() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = res.data;
        setUserData(data);
      } catch (error) {
        alert("Failed to fetch data");
        console.error("failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(userData.length / dataPerPage);
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const displayedData = userData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className={style.container}>
        <h2>Employee Data Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={style.buttonContainer}>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </button>
          <p className={style.pageNo}>
            {currentPage}
          </p>
          {/* <span> Page {currentPage} of {totalPages} </span> */}
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
