import React, { useEffect, useState } from "react";

const LibraryForm = ({
  onSubmit,
  onCancel = () => {},
  submitButtonText,
  library = null,
  deleteButton = null,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [repository, setRepository] = useState("npm");
  const [downloads, setDownloads] = useState(0);
  const [author, setAuthor] = useState("");
  const [homepage, setHomepage] = useState("");
  const [color, setColor] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  const [isColorSupported, setIsColorSupported] = useState(false);

  // useEffect(() => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "color");
  //   setIsColorSupported(input.getAttribute("type") === "color");
  // }, []);

  useEffect(() => {
    if (library) {
      setName(library.name || "");
      setDescription(library.description || "");
      setRepository(library.repository || "npm");
      setDownloads(library.downloads || 0);
      setAuthor(library.author || "");
      setHomepage(library.homepage || "");
      setColor(library.color || "");
      setIconUrl(library.iconUrl || "");
    }
  }, [library]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setRepository("npm");
    setDownloads(0);
    setAuthor("");
    setHomepage("");
    setColor("");
    setIconUrl("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          name,
          description,
          repository,
          downloads,
          author,
          homepage,
          color,
          iconUrl,
        });
      }}
      autoComplete="off"
      className="osl-form"
    >
      <label
        className="osl-form__label osl-form__label--required"
        htmlFor="name"
      >
        Name
      </label>
      <input
        className="osl-form__input"
        onChange={(e) => setName(e.target.value)}
        id="name"
        value={name}
        placeholder="e.g. VueJS"
        required
      />

      <label
        className="osl-form__label osl-form__label--required"
        htmlFor="description"
      >
        Description
      </label>
      <textarea
        className="osl-form__input osl-form__input--textarea"
        onChange={(e) => setDescription(e.target.value)}
        id="description"
        aria-describedby="description-help"
        value={description}
        required
      />
      <p className="osl-form__help" id="description-help">
        Markdown is not yet supported.
      </p>

      <label
        className="osl-form__label osl-form__label--required"
        htmlFor="repository"
      >
        Repository
      </label>
      <div className="osl-form__input-wrapper osl-form__input-wrapper--select">
        <select
          className="osl-form__input osl-form__input--select"
          id="repository"
          onChange={(e) => setRepository(e.target.value)}
          value={repository}
          required
        >
          {["npm", "Maven", "Nuget", "PyPI", "RubyGems"].map((repo) => (
            <option key={repo} value={repo}>
              {repo}
            </option>
          ))}
        </select>
      </div>

      <label className="osl-form__label" htmlFor="downloads">
        Downloads
      </label>
      <input
        className="osl-form__input"
        onChange={(e) => setDownloads(e.target.value)}
        id="downloads"
        value={downloads}
        inputMode="numeric"
        pattern="\d+"
      />

      <label
        className="osl-form__label osl-form__label--required"
        htmlFor="author"
      >
        Author
      </label>
      <input
        className="osl-form__input"
        onChange={(e) => setAuthor(e.target.value)}
        id="author"
        value={author}
        required
      />

      <label className="osl-form__label" htmlFor="homepage">
        Homepage
      </label>
      <input
        className="osl-form__input"
        onChange={(e) => setHomepage(e.target.value)}
        id="homepage"
        value={homepage}
        type="url"
      />

      <label className="osl-form__label" htmlFor="color">
        Color
      </label>
      {isColorSupported ? (
        <input
          className="osl-form__input osl-form__input--color"
          onChange={(e) => setColor(e.target.value)}
          id="color"
          value={color}
          type="color"
          aria-describedby="color-help"
        />
      ) : (
        <input
          className="osl-form__input"
          onChange={(e) => setColor(e.target.value)}
          id="color"
          value={color}
          pattern="^#([a-fA-F0-9]{3}){1,2}$"
          aria-describedby="color-help"
          placeholder="e.g. #FF69B4"
        />
      )}
      <p className="osl-form__help" id="color-help">
        This will be used as the background color for the library card.
      </p>

      <label className="osl-form__label" htmlFor="iconUrl">
        Icon URL
      </label>
      <input
        className="osl-form__input"
        onChange={(e) => setIconUrl(e.target.value)}
        id="iconUrl"
        value={iconUrl}
        type="url"
      />
      <p className="osl-form__help" id="icon-url-help">
        URL of library icon.{" "}
        <a
          href="https://simpleicons.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          SimpleIcons
        </a>{" "}
        is a great resource for popular icons.
      </p>

      <footer className="osl-form__buttons">
        <button
          className="osl-button osl-button--cancel"
          onClick={(e) => {
            e.preventDefault();
            onCancel();
            resetForm();
          }}
        >
          Cancel
        </button>
        <button type="submit" className="osl-button osl-button--submit">
          {submitButtonText}
        </button>

        {deleteButton}
      </footer>
    </form>
  );
};

export default LibraryForm;
