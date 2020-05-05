import React, { useEffect } from "react";
import { Link } from "@reach/router";
import { useLibraries } from "../hooks/libraries";

const AppHeader = () => {
  const { loadLibraries } = useLibraries();

  useEffect(loadLibraries, []);

  return (
    <header className="osl-header osl__section">
      <h1 className="osl-header__heading">
        <Link to="/">
          <span>OSL</span>
          <small className="osl-header__sub-heading">
            the Open Source Library explorer
          </small>
        </Link>
      </h1>
    </header>
  );
};

export default AppHeader;
