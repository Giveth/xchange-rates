import React from "react";
import params from "../params";

const Header = props => (
  <header className="masthead mb-auto">
    <div className="inner">
      <h3 className="masthead-brand">{params.headerTitle}</h3>
      <nav className="nav nav-masthead justify-content-end">
        <a
          href={params.link1.href}
          className="nav-link slim-nav-text"
          style={{ fontWeight: 300, color: "#ffffff40" }}
        >
          {params.link1.name}
        </a>
      </nav>
    </div>
  </header>
);

export default Header;
