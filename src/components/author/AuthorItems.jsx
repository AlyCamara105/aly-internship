import React from "react";
import Item from "../UI/Item";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ user, items }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {user && items
            ? items.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <Item
                    item={item}
                    authorImage={user.authorImage}
                    authorId={user.authorId}
                  />
                </div>
              ))
            : new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
