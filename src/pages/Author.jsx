import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [items, setItems] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [following, setFollowing] = useState(false);

  function updateFollowers() {
    setFollowing((previousFollowing) => {
      return !previousFollowing;
    });
  }

  useEffect(() => {
    async function LoadData() {
      let response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );

      setUser(response.data);
      setItems(response.data.nftCollection);
    }

    LoadData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {user ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={user.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {user.authorName}
                            <span className="profile_username">
                              @{user.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {user.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {following ? user.followers + 1 : user.followers}{" "}
                          followers
                        </div>
                        <button className="btn-main" onClick={updateFollowers}>
                          {following ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton height={150} width={150} borderRadius={100} />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton
                              height={20}
                              width={200}
                              borderRadius={5}
                            />
                            <span className="profile_username">
                              <Skeleton
                                height={15}
                                width={100}
                                borderRadius={5}
                              />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton
                                height={15}
                                width={200}
                                borderRadius={5}
                              />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton height={50} width={175} borderRadius={5} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems user={user} items={items} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
