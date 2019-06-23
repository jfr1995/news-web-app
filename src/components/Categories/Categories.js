import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import "../../css/style.css";

const Categories = () => {
  return (
    <div className="container__categories">
      <ul>
        <li>
          <Link className="btn btn__white" to={ROUTES.TOP_HEADLINES}>
            Top Headlines
          </Link>
        </li>
        <li>
          <Link to={ROUTES.TECHNOLOGY}>Technology</Link>
        </li>
        <li>
          <Link to={ROUTES.ENTERTAINMNENT}>Entertainment</Link>
        </li>
        <li>
          <Link to={ROUTES.BUSINESS}>Business</Link>
        </li>
        <li>
          <Link to={ROUTES.SPORTS}>Sports</Link>
        </li>
        <li>
          <Link to={ROUTES.SCIENCE}>Sience</Link>
        </li>
      </ul>
    </div>
  );
};

export default Categories;
