import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Item from "../UI/Item";
import Skeleton from "../UI/Skeleton";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const NewItems = () => {
  const [newItemsData, setNewItemsData] = useState(null);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          borderRadius: "1000px",
          padding: "0.5px",
          right: "14px",
          right: "-5px",
          top: "200px",
          zIndex: "10",
          position: "absolute",
          width: "45px",
          height: "45px",
          border: "1px solid #727272",
        }}
        className="arrow__container"
        onClick={onClick}
      >
        <MdOutlineKeyboardArrowRight
          style={{ ...style, height: "75%", width: "75%", color: "black" }}
        />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          borderRadius: "1000px",
          padding: "0.5px",
          right: "14px",
          left: "-5px",
          top: "200px",
          zIndex: "10",
          position: "absolute",
          width: "45px",
          height: "45px",
          border: "1px solid #727272",
        }}
        className="arrow__container"
        onClick={onClick}
      >
        <MdOutlineKeyboardArrowLeft
          style={{ ...style, height: "75%", width: "75%", color: "black" }}
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
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );

      setNewItemsData(response.data);
    }

    LoadData();
  }, []);

  return (
    <section
      data-aos="fade-in"
      data-aos-duration={1000}
      data-aos-once={true}
      id="section-items"
      className="no-bottom"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {newItemsData
              ? newItemsData.map((item, index) => (
                  <div className="carousel__item__wrapper">
                    <Item key={index} item={item} />
                  </div>
                ))
              : new Array(6).fill(0).map((_, index) => (
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
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
