import React from "react";
import "./Filters.scss";
export default function Filters({
  doneFilter,
  editedFilter,
  ongoingFilter,
  allFilter,
}) {
  return (
    <div className="filters">
      <h5 className="filters__heading">Filters:</h5>
      <button
        className="filters__button done"
        onClick={() => {
          doneFilter();
        }}
      >
        done
      </button>
      <button
        className="filters__button edited"
        onClick={() => {
          editedFilter();
        }}
      >
        edited
      </button>
      <button
        className="filters__button ongoing"
        onClick={() => {
          ongoingFilter();
        }}
      >
        ongoing
      </button>
      <button
        className="filters__button all"
        onClick={() => {
          allFilter();
        }}
      >
        all
      </button>
    </div>
  );
}
