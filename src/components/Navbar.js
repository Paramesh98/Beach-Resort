import React, { Component } from "react";

import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import Logo from "./Logo";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  }

  render() {
    const { isOpen } = this.state;

    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <Logo />
            </Link>
            <button
              className="nav-btn"
              onClick={this.handleToggle}
              type="button"
            >
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/room">Rooms</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
