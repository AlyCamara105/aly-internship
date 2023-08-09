import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

function Item({ item }) {
  let [time, setTime] = useState(null);
  let [lastIntervalId, setLastIntervalId] = useState(null);

  function setCountdown() {
    let countdownEpochDiff = item.expiryDate - Date.now();
    let countdownInSeconds = Math.floor(countdownEpochDiff / 1000);
    let countdownSeconds = countdownInSeconds % 60;
    let countdownMinutes = Math.floor((countdownInSeconds / 60) % 60);
    let countdownHours = Math.floor(countdownInSeconds / 60 / 60);

    setTime(
      countdownEpochDiff > 0
        ? `${countdownHours}h ${countdownMinutes}m ${countdownSeconds}s`
        : "Expired"
    );
  }

  if (!lastIntervalId && item.expiryDate) {
    setLastIntervalId(
      setInterval(() => {
        setCountdown();
      }, 1000)
    );
  }

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={"/author/" + item.authorId}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <img className="lazy" src={item.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {item.expiryDate && <div className="de_countdown">{time}</div>}

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

        <Link to={"/item-details/" + item.nftId}>
          <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={"/item-details/" + item.nftId}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
}
export default Item;
