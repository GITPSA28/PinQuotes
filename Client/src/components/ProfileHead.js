import React, { useEffect, useState } from "react";
import Axios from "axios";
import veriefiedicon from "../images/verifiedicon.png";
function ProfileHead(props) {
  const [user, setUser] = useState("");
  const [postCount, setPostCount] = useState(0);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_LINK}/getUser/` + props.id).then(
      (res) => {
        setUser(res.data);
        console.log(res.data);
      }
    );
    Axios.get(
      `${process.env.REACT_APP_LINK}/getQuotes/` + props.id + "@gmail.com"
    ).then((res) => {
      setPostCount(res.data.length);
      console.log(res.data);
    });
  }, [props.id]);

  return (
    <div>
      <div className="profileHead">
        <div className="userDp">
          <img src={user.dpurl} alt="dp" />
        </div>
        <div className="userInfo">
          <div className="userName">
            {user.name}
            {user.verified && (
              <div className="verified">
                <img src={veriefiedicon} alt="veriefied" />
              </div>
            )}
          </div>
          <div className="userid">@{user.username}</div>

          <div className="posts">
            <b>{postCount}</b> Posts
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHead;
