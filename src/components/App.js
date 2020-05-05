import React from "react";
import Listings from "./Listings";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import { Router } from "@reach/router";
import AppHeader from "./AppHeader";
import AppBody from "./AppBody";
import { LibrariesContextProvider } from "../hooks/libraries";

const App = () => (
  <LibrariesContextProvider>
    <AppHeader />
    <AppBody>
      <Router>
        <Listings path="/" />
        <CreateForm path="create" />
        <EditForm path="edit/:id" />
      </Router>
    </AppBody>
  </LibrariesContextProvider>
);

export default App;
