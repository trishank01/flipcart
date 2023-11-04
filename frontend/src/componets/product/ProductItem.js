import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ProductItem = ({ prd, columnSize }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={
            prd?.images[0]
              ? prd?.images[0]?.url
              : "../images/default_product.png"
          }
          alt={prd?.name}
        />
        <div className="card-body ps-3 d-flex justify-content-center flex-column">
          <h5 className="card-title">
            <Link to={`/product/${prd?._id}`}>{prd.name}</Link>
          </h5>
          <div className="ratings mt-auto d-flex">
            <div className="star-ratings">
              <StarRatings
                rating={prd?.rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="22px"
                starSpacing="1px"
              />
            </div>
            <span id="no_of_reviews" className="pt-2 ps-2">
              ({prd?.numOfReviews})
            </span>
          </div>
          <p className="card-text mt-2">${prd.price}</p>
          <Link
            to={`/product/${prd?._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
