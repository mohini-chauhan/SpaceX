import React from "react";

import styles from "./Banner.module.scss";
import earth from "../assest/earth.webp";

const Banner = () => (
  <div className={styles.Banner}>
    <div className={styles.Banner__contentWrapper}>
      <p className="text-center font-bold text-sm top-24 absolute left-4 sm:top-44 sm:text-4xl">
        WE EXPLORE UNKNOWN WORLDS...
      </p>
    </div>
    <figure>
      <img src={earth} alt="earth" className="w-full max-h-96 bg-cover" />
    </figure>
  </div>
);

export default Banner;
