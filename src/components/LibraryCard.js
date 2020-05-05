import React, { useRef } from "react";
import { Link } from "@reach/router";

const LibraryCard = ({ library }) => {
  const linkRef = useRef(null);

  return (
    <li
      className="osl-library-card"
      style={{ "--image-bg-color": library.color || "" }}
      onClick={(e) => {
        if (e.target !== linkRef.current) {
          e.preventDefault();
          linkRef.current.click();
        }
      }}
    >
      <div className="osl-library-card__image">
        {library.iconUrl && (
          <img src={library.iconUrl} alt={`${library.name} logo`} />
        )}
      </div>
      <dl className="osl-library-card__details">
        <dt className="osl-library-card__detail-title osl-library-card__detail-title--name">
          Library name
        </dt>
        <dd className="osl-library-card__detail-info osl-library-card__detail-info--name">
          <Link to={`/edit/${library._id}`} ref={linkRef}>
            {library.name}
          </Link>
        </dd>
        <dt className="osl-library-card__detail-title osl-library-card__detail-title--description">
          Description
        </dt>
        <dd className="osl-library-card__detail-info osl-library-card__detail-info--description">
          {library.description}
        </dd>
        <dt className="osl-library-card__detail-title osl-library-card__detail-title--downloads">
          Downloads
        </dt>
        <dd className="osl-library-card__detail-info osl-library-card__detail-info--downloads">
          {library.downloads}
        </dd>
        <dt className="osl-library-card__detail-title osl-library-card__detail-title--author">
          Author
        </dt>
        <dd className="osl-library-card__detail-info osl-library-card__detail-info--author">
          {library.author}
        </dd>
      </dl>
    </li>
  );
};

export default LibraryCard;
