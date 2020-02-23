import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import RoomContainer from "../components/RoomSContainer";

const Room = () => {
  return (
    <div>
      <Hero hero="roomsHero">
        <Banner title="Our Rooms">
          <Link to="/home" className="btn-primary">
            Return Home
          </Link>
        </Banner>
      </Hero>
      <RoomContainer />
    </div>
  );
};

export default Room;
