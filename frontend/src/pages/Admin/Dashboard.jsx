import React from "react";
import Chart from "../../components/Chart";

export default function Dashboard() {
  return (
    <div className="">
      <div className="flex gap-7">
        <div className="card w-50 bg-base-100 card-sm shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Total Salse</h2>
          </div>
        </div>
        <div className="card w-50 bg-base-100 card-sm shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Total Revinew</h2>
          </div>
        </div>
      </div>
      <div>
        <Chart/>
         </div>
    </div>
  );
}
