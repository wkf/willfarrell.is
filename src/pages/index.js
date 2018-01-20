import React from 'react';
import Link from 'gatsby-link';
import styles from './index.module.css';
import painting from './painting.png';

const Throbber = () =>
  <div className={styles.throbber}>
    <div className={styles.first} />
    <div className={styles.second} />
    <div className={styles.third} />
    <div className={styles.fourth} />
    <img
      className={styles.painting}
      src={painting}
      alt="Painting"
      width="83"
      height="111"
    />
  </div>;

const IndexPage = () =>
  <div>
    <Throbber />
    <h1 className={styles.headline}>Will Farrell</h1>
    <ul className={styles.links}>
      <li className={styles.link}>
        <a href="https://github.com/wkf">Github</a>
      </li>
      <li className={styles.link}>
        <a href="https://twitter.com/wkf">Twitter</a>
      </li>
      <li className={styles.link}>
        <a href="mailto:yes@willfarrell.is">Email</a>
      </li>
    </ul>
  </div>;

export default IndexPage;
