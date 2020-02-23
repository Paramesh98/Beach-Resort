import React from "react";
import { useContext } from "react";
import { RoomContext } from "../Context";
import Title from "./Title";

let UniqueId = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};
export default function RoomList({ rooms }) {
  const context = useContext(RoomContext);

  const {
    handleChange,
    capacity,
    type,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;

  let types = UniqueId(rooms, "type");

  types = ["all", ...types];

  let people = UniqueId(rooms, "capacity");

  types = types.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  people = people.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  return (
    <section className="filter-container">
      <Title title="search-rooms" />
      <form className="filter-form">
        {/*for type*/}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        {/*for guest*/}

        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {people}
          </select>
        </div>
        {/*for price range*/}
        <div className="form-group">
          <label htmlFor="price">Price Rs.{price}</label>
          <input
            className="form-control"
            type="range"
            name="price"
            id="price"
            value={price}
            min={minPrice}
            max={maxPrice}
            onChange={handleChange}
          />
        </div>
        {/*for room size*/}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input
              className="size-input"
              id="size"
              name="minSize"
              onChange={handleChange}
              type="number"
              value={minSize}
            />
            <input
              className="size-input"
              id="size"
              name="maxSize"
              onChange={handleChange}
              type="number"
              value={maxSize}
            />
          </div>
        </div>
        {/*for checkboxes*/}
        <div className="form-group">
          <div className="single-extra">
            <input
              id="breakfoast"
              name="breakfast"
              onChange={handleChange}
              checked={breakfast}
              type="checkbox"
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              id="pets"
              name="pets"
              onChange={handleChange}
              type="checkbox"
              checked={pets}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
      </form>
    </section>
  );
}
