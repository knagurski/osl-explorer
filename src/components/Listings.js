import React, { Fragment, useEffect } from "react";
import { useLibraries } from "../hooks/libraries";
import { Link } from "@reach/router";
import LibraryCard from "./LibraryCard";

const Listings = ({ onEdit, onDelete }) => {
  const { libraries, loadLibraries } = useLibraries();

  return (
    <section className="osl-listings">
      <header className="osl-listings__header">
        <h2>Libraries</h2>
        <Link to="create" className="osl-button osl-button--submit">
          Add library
        </Link>
      </header>

      {libraries.length === 0 ? (
        <p>Looks like there aren't any libraries</p>
      ) : (
        <>
          <p>We have {libraries.length} libraries</p>
          <ul className="osl-listings__cards">
            {libraries.map((library) => (
              <LibraryCard library={library} key={library._id} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Listings;
