// Third
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUUIDV4 } from "../../utils/uuid";
import M from "materialize-css";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(Object);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      console.log("THE URL:", url);
      fetch("/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "IMS-Request-Id": getUUIDV4().toString(),
          "IMS-Request-Date": new Date().toISOString(),
          Authorization: `Bearer ${localStorage.getItem("authorization")}`,
        },
        body: JSON.stringify({
          title,
          body,
          photo: url,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("PostCreated:", data);
          if (data.error) {
            return M.toast({
              html: data.error,
              classes: "#c62828 red darken-3",
            });
          }
          M.toast({
            html: "Post created",
            classes: "#43a047 green darken-1",
          });
          return history.push("/");
        })
        .catch((err) => {
          M.toast({ html: "Something went wrong" });
        });
    }
  });

  const PostDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ims-preset");
    data.append("cloud_name", "aqs-cloud");

    fetch("https://api.cloudinary.com/v1_1/aqs-cloud/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data:", data);
        setUrl(data.url);
        return data;
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  return (
    <div
      className="card input-text-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => PostDetails()}
      >
        Submit post
      </button>
    </div>
  );
};

export default CreatePost;
