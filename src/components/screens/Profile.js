// Third
import React, { useEffect, useState, useContext } from "react";

// Local
import { UserContext } from "../../App";

const Profile = () => {
  const [pics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  console.log("PROFILE STATEX:", state);
  const username = localStorage.getItem("user");

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
        console.log("PROFILE RESULT:", result);
        return setPics(result.posts);
      })
      .catch((err) => {
        console.log("PROFILE CATCH ERROR:", err);
      });
  }, []);

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1584404268984-89c43e841646?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=808&q=80"
            alt="user-pic"
          />
        </div>
        <div>
          <h4>@{username}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>40 posts</h6>
            <h6>30 followers</h6>
            <h6>60 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {pics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
