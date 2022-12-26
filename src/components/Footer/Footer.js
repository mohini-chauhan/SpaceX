import React from "react";

import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faMobilePhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <footer className={styles.Footer}>
    <p className={styles.Footer__paraSection}>Follow us on:</p>
    <section className={styles.Footer__contactSection}>
      <a href="https://www.linkedin.com/in/mohinii/">
        <FontAwesomeIcon
          icon={faLinkedinIn}
          className={styles.Footer__contactSection__icon}
          data-testid="linkedinIcon"
        />
      </a>
      <a href="mailto:shunchauhan@gmail.com">
        <FontAwesomeIcon
          icon={faAt}
          className={styles.Footer__contactSection__icon}
          data-testid="emailIcon"
        />
      </a>
      <a href="tel:9149269779" target="_blank">
        <FontAwesomeIcon
          icon={faMobilePhone}
          className={styles.Footer__contactSection__icon}
          data-testid="mobilephoneIcon"
        />
      </a>
    </section>
    <p className={styles.Footer__copyrightSection}>
      Designed from scratch by Mohini. © 2022 All rights reserved.​
    </p>
  </footer>
);

export default Footer;
