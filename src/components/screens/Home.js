// Third
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

// Local
import { getUUIDV4 } from "../../utils/uuid";

const Home = () => {
  const [data, setData] = useState([]);
  const username = localStorage.getItem("user");
  const { state, dispatch } = useContext(UserContext);
  console.log("HOME STATE:", state);
  const newState = JSON.parse(state);
  console.log("newState:", newState);

  useEffect(() => {
    fetch("/posts/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log("HOME RESULT:", result);
        return setData(result.posts);
      })
      .catch((err) => {
        console.log("ERROR IN HOME:", err);
      });
  }, []);

  const likePost = (postId) => {
    fetch("/posts/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        "IMS-Request-Id": getUUIDV4().toString(),
        "IMS-Request-Date": new Date().toISOString(),
      },
      body: JSON.stringify({
        _id: postId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log("HOME LIKE RESULT:", result);
        const newData = data.map((item) => {
          if (item._id === result.post._id) {
            return result.post;
          } else {
            return item;
          }
        });
        return setData(newData);
      })
      .catch((err) => {
        console.log("ERROR CATCH IN LIKE:", err);
      });
  };

  const unlikePost = (postId) => {
    fetch("/posts/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        "IMS-Request-Id": getUUIDV4().toString(),
        "IMS-Request-Date": new Date().toISOString(),
      },
      body: JSON.stringify({
        _id: postId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log("HOME UNLIKE RESULT:", result);
        const newData = data.map((item) => {
          console.log("item._id:", item._id);
          console.log("result._id:", result.post._id);
          console.log("CONDICIONAL:", item._id === result._id);
          if (item._id === result.post._id) {
            return result.post;
          } else {
            return item;
          }
        });
        return setData(newData);
      })
      .catch((err) => {
        console.log("ERROR CATCH IN LIKE:", err);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div key={item._id} className="card home-card">
            <h5>@{newState.username}</h5>
            <div className="card-image">
              <img src={item.photo} alt="card-pic" />
            </div>
            <div className="card-content input-text-field">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(newState._id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    console.log("click on unlike");
                    unlikePost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    console.log("click on like");
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add a comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
