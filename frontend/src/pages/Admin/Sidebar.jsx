import React from "react";
import { Link, Outlet } from "react-router";

export default function Sidebar() {
  return (
    <div className="flex gap-4">
      <div>
        <h1>
          <Link to="dashboard">Dashboard</Link>
        </h1>
        <Link to="courses">Courses</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
