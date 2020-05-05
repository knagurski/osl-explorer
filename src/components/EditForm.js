import React, { useEffect, useState } from "react";
import { useLibraries } from "../hooks/libraries";
import LibraryForm from "./LibraryForm";
import { navigate } from "@reach/router";

const EditForm = ({ id }) => {
  const { getLibrary, updateLibrary, deleteLibrary } = useLibraries();
  const [library, setLibrary] = useState({});

  useEffect(() => {
    getLibrary(id).then((lib) => setLibrary(lib));
  }, [id]);

  return (
    <>
      <h2>Edit library</h2>
      <LibraryForm
        library={library}
        onSubmit={(updates) => {
          updateLibrary(library._id, updates);
          navigate("/");
        }}
        onCancel={() => navigate("/")}
        submitButtonText="Save changes"
        deleteButton={
          <button
            className="osl-button osl-button--delete"
            onClick={(e) => {
              e.preventDefault();
              if (confirm(`Are you sure you want to delete ${library.name}?`)) {
                deleteLibrary(library._id);
                navigate("/");
              }
            }}
          >
            Delete
          </button>
        }
      />
    </>
  );
};

export default EditForm;
