import React from "react";

export default function Pagination() {
  return (
    <div className="join">
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="«"
        checked="checked"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="1"
        checked="checked"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="2"
        checked="checked"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="3"
        checked="checked"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="4"
        checked="checked"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="»"
        checked="checked"
      />
    </div>
  );
}
