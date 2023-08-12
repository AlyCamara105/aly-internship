import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";
import axios from "axios";
import Item from "../UI/Item";

const ExploreItems = () => {
  const [exploreItemsData, setExploreItemsData] = useState(null);
  const [exploreItems, setExploreItems] = useState(null);
  const [row, setRow] = useState(1);

  function loadOnClick() {
    let nextRow = null;

    setRow((previousRow) => {
      let rowToReturn = null;

      if (previousRow < 4) {
        rowToReturn = previousRow + 1;
      } else {
        rowToReturn = previousRow;
      }

      nextRow = rowToReturn;
      return rowToReturn;
    });
    setExploreItems(exploreItemsData.slice(0, nextRow * 4));
  }

  function sortChanged(event) {
    async function LoadData() {
      let response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${event.target.value}`
      );

      setExploreItemsData(response.data);
      setExploreItems(null);
      setTimeout(() => {
        setExploreItems(response.data.slice(0, row * 4));
      }, 100);
    }

    LoadData();
  }

  useEffect(() => {
    async function LoadData() {
      let response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );

      setExploreItemsData(response.data);
      setExploreItems(response.data.slice(0, 4));
    }

    LoadData();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={sortChanged}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems
        ? exploreItems.map((exploreItem, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Item item={exploreItem} />
            </div>
          ))
        : new Array(row * 4).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div key={index} className="nft__item">
                <div className="author_list_pp">
                  <Skeleton height={50} width={50} borderRadius={100} />
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Skeleton height={225} width={300} borderRadius={10} />
                </div>

                <div className="nft__item_info">
                  <Skeleton height={40} width={175} borderRadius={10} />
                </div>
              </div>
            </div>
          ))}
      {row != 4 && (
        <div className="col-md-12 text-center">
          <button id="loadmore" className="btn-main lead" onClick={loadOnClick}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
