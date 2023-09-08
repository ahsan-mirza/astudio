import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

function Table({ data, tableData }: any) {
  const [records, setRecoreds] = useState<any>([]);
  const { state } = useAppContext();
  
  console.log("State", state)
  useEffect(() => {
    setRecoreds(data);
  });
  return (
    <table className="user-table">
      <thead>
        <tr>
          {Object!?.values(tableData)!?.map((item: any, index: any) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {records!?.map((item: any, index: number) => (
          <tr key={index}>
            {Object.keys(tableData).map((i: any, index: number) => {
              return <td key={index}>{item[i]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
