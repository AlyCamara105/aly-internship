import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { hover } from "@testing-library/user-event/dist/hover";

const HotCollections = () => {
  const [collectionData, setCollectionData] = useState(null);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="relative"
        style={{
          ...style,
          display: "block",
          background: "white",
          borderRadius: "1000px",
          padding: "3px",
          width: "50px",
          height: "50px",
          right: "-10px",
          top: "150px",
          zIndex: "10",
          position: "absolute",
          border: "1px solid black",
          opacity: "0.7",
        }}
      >
        <div
          className={className}
          style={{
            ...style,
            display: "block",
            background: "black",
            borderRadius: "1000px",
            padding: "0.5px",
            right: "14px",
          }}
          onClick={onClick}
        />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="relative"
        style={{
          ...style,
          display: "block",
          background: "white",
          borderRadius: "1000px",
          padding: "3px",
          width: "50px",
          height: "50px",
          left: "-5px",
          top: "150px",
          zIndex: "10",
          position: "absolute",
          border: "1px solid black",
          opacity: "0.7",
        }}
      >
        <div
          className={className}
          style={{
            ...style,
            display: "block",
            background: "black",
            borderRadius: "1000px",
            padding: "0.5px",
            left: "14px",
          }}
          onClick={onClick}
        />
      </div>
    );
  }

  const settings = {
    slidesToShow: 4,
    infinite: true,
    slidesToScroll: 1,
    draggable: false,
    speed: 300,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    async function LoadData() {
      let response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );

      setCollectionData(response.data);
    }

    LoadData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {collectionData
              ? collectionData.map((collection) => (
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={"/item-details/" + collection.nftId}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={"/author/" + collection.authorId}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                ))
              : new Array(6).fill(0).map(() => (
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width={340} height={200} borderRadius={10} />
                    </div>
                    <div className="nft_coll_pp">
                      <div className="pp-coll">
                        <Skeleton width={70} height={70} borderRadius={70} />
                      </div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width={150} height={30} borderRadius={10} />
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
