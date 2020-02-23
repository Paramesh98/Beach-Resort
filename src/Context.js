import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    featuredRooms: [],
    sortedRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(item => item.featured === true);
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  formatData(items) {
    // console.log(items);
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      //let fields = item.fields;
      let room = { ...item.fields, images, id };
      //  console.log(room);
      return room;
    });
    return tempItems;
  }
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    let room = tempRooms.find(item => item.slug === slug);

    return room;
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    const name = event.target.name;
    console.log(name, value);
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    console.log(this.state.type);
    let {
      type,
      rooms,
      capacity,
      price,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      breakfast,
      pets,
      sortedRooms
    } = this.state;

    let tempRooms = [...rooms];
    capacity = parseInt(capacity);
    price = parseInt(price);
    // for types
    if (type === "all") {
      this.setState({ sortedRooms: rooms });
    }
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
      // console.log(tempRooms);
    }

    //for capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity === capacity);
    }
    // for price
    tempRooms = tempRooms.filter(room => room.price <= price);

    //for min max value
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    //for breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    //for pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }
    // state change
    this.setState({ sortedRooms: tempRooms });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumeWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}
export { RoomContext, RoomProvider, RoomConsumer };
