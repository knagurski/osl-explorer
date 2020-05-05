import React, { useReducer, useContext, createContext } from "react";

const LibrariesContext = createContext(null);

const endpoint = "/.netlify/functions";

const librariesReducer = (libraries, action) => {
  switch (action.type) {
    case "CREATE_LIBRARY":
      fetch(`${endpoint}/createLibrary`, {
        method: "POST",
        body: JSON.stringify(action.payload),
      })
        .then((res) => res.json())
        .then((library) =>
          action.dispatch({
            ...action,
            type: "CREATE_LIBRARY_SUCCESS",
            payload: library,
          })
        );
      return libraries;

    case "CREATE_LIBRARY_SUCCESS":
      return [...libraries, action.payload];

    case "UPDATE_LIBRARY":
      fetch(`${endpoint}/updateLibrary?id=${action.payload.id}`, {
        method: "PUT",
        body: JSON.stringify(action.payload.updates),
      })
        .then((res) => res.json())
        .then((library) =>
          action.dispatch({
            ...action,
            type: "UPDATE_LIBRARY_SUCCESS",
            payload: library,
          })
        );
      return libraries;

    case "UPDATE_LIBRARY_SUCCESS": {
      const libs = [...libraries];
      libs.splice(
        libs.findIndex((lib) => lib._id === action.payload._id),
        1,
        action.payload
      );
      return libs;
    }

    case "DELETE_LIBRARY":
      fetch(`${endpoint}/deleteLibrary?id=${action.payload.id}`, {
        method: "DELETE",
      }).then(() =>
        action.dispatch({
          ...action,
          type: "DELETE_LIBRARY_SUCCESS",
        })
      );
      return libraries;

    case "DELETE_LIBRARY_SUCCESS": {
      const libs = [...libraries];
      libs.splice(
        libs.findIndex((lib) => lib._id === action.payload.id),
        1
      );
      return libs;
    }

    case "LOAD_LIBRARIES":
      fetch(`${endpoint}/getLibraries`)
        .then((res) => res.json())
        .then((libs) =>
          action.dispatch({
            ...action,
            type: "LOAD_LIBRARIES_SUCCESS",
            payload: libs,
          })
        );
      return [];

    case "LOAD_LIBRARIES_SUCCESS":
      return action.payload;

    default:
      return libraries;
  }
};

export const LibrariesContextProvider = ({ children }) => {
  const [libraries, dispatch] = useReducer(librariesReducer, []);

  const contextApi = {
    libraries,
    createLibrary(payload) {
      return dispatch({ type: "CREATE_LIBRARY", payload, dispatch });
    },
    loadLibraries() {
      return dispatch({ type: "LOAD_LIBRARIES", dispatch });
    },
    updateLibrary(id, updates) {
      return dispatch({
        type: "UPDATE_LIBRARY",
        payload: { id, updates },
        dispatch,
      });
    },
    deleteLibrary(id) {
      return dispatch({ type: "DELETE_LIBRARY", payload: { id }, dispatch });
    },
    async getLibrary(id) {
      return Promise.resolve(libraries.find(({ _id }) => _id === id));
    },
  };

  return (
    <LibrariesContext.Provider value={contextApi}>
      {children}
    </LibrariesContext.Provider>
  );
};

export const useLibraries = () => useContext(LibrariesContext);
