import React from "react";

import Room from "./Room";

const RoomList = ({ rooms }) => {
  return rooms.length === 0 ? (
    <div className="empty-search">
      <h3>unfortunately no rooms matched your search parameters</h3>
    </div>
  ) : (
    <section className="roomlist">
      <div className="roomlist-center">
        {rooms.map(item => {
          return <Room key={item.id} room={item} />;
        })}
      </div>
    </section>
  );
};

export default RoomList;
