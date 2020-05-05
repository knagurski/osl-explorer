import React from "react";
import { useLibraries } from "../hooks/libraries";
import LibraryForm from "./LibraryForm";
import { navigate } from "@reach/router";

const CreateForm = () => {
  const { createLibrary } = useLibraries();

  return (
    <>
      <h2>Add library</h2>
      <LibraryForm
        onSubmit={(libraryData) => {
          createLibrary(libraryData);
          navigate("/");
        }}
        onCancel={() => navigate("/")}
        submitButtonText="Add library"
      />
    </>
  );
};

export default CreateForm;
