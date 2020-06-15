import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);

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
        console.log("RESULT:", result);
        return setData(result.posts);
      })
      .catch((err) => {
        console.log("ERROR IN HOME:", err);
      });
  }, []);

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div key={item._id} className="card home-card">
            <h5>{item.postedBy.email}</h5>
            <div className="card-image">
              <img src={item.photo} alt="card-pic" />
            </div>
            <div className="card-content input-text-field">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
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
