import React from "react";
import { Card, Avatar } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import Typewrittereffect from "./TypeWritter/TypeEffect";
import dp from "./dp.jpg";

const ConnectNav = () => {
  // getting the data from redux
  const User = useSelector((state) => state.rootReducers.userLogin.User);

  const { Meta } = Card;
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-md-4 ">
            <Card style={{ backgroundColor: "silver" }}>
              <Meta
                avatar={
                  <Avatar
                    size={"large"}
                    src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                  ></Avatar>
                }
                title={User.name}
                // this moment library uses and convert the date and time with proper format
                description={`Joined ${moment(User.createdAt).fromNow()}`}
              />
            </Card>
          </div>
          {/* rendering the payments based on the user connected to the stripe methods only */}
          <div className="col-md-4 ">
            <Card style={{ backgroundColor: "silver" }}>
              <Meta
                avatar={<Avatar size={"large"} src={dp}></Avatar>}
                title="Create By Rahul Keshri"
                // this moment library uses and convert the date and time with proper format
              />
              <Typewrittereffect
                text={["Mern Stack Developer", "Love My Work"]}
              ></Typewrittereffect>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectNav;
