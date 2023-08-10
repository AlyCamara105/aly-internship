import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState(null);

  useEffect(() => {
    async function LoadData() {
      let response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );

      setSellers(response.data);
    }

    LoadData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers
                ? sellers.map((seller, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={"/author/" + seller.authorId}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={"/author/" + seller.authorId}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width={55} height={55} borderRadius={100} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={125} height={20} borderRadius={10} />
                        <div>
                          <Skeleton width={100} height={15} borderRadius={10} />
                        </div>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
