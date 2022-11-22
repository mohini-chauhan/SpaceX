import React from "react";
import styles from "./Navbar.module.scss";
import SpaceX from "../assest/SpaceX.png";

const Navbar = () => {
  return (
    <section className={styles.Navbar}>
      <nav className="container mx-auto p-2.5 flex flex-row ">
        <img
          src={SpaceX}
          className=" w-4/12 sm:w-1/5 h-12"
          alt="Flowbite Logo"
        />
      </nav>
    </section>
  );
};

export default Navbar;
