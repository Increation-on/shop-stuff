import styles from '../../styles/Home.module.css';
import BG from '../../images/computer.png';
import BurgerMenu from './BurgerMenu';
import { useState } from 'react';

const Poster = () => {


  const [closeImage, setShowImage] = useState(false);


  const handleChildClick = (valueFC) => {
    setShowImage(valueFC)
  }

  return (
    <section className={styles.home}>
      <BurgerMenu onChildClick={handleChildClick} />
      <div className={styles.title}>BIG SALE 20%</div>
      <div className={styles.product}>
        <div className={styles.text}>
          <div className={styles.subtitle}>the bestseller of 2087</div>
          <h1 className={styles.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
          <button className={styles.button}>Shop now</button>
        </div>
        <div className={`${!closeImage ? styles.image : styles.image_hidden}`}>
          <img src={BG} alt="computer" />
        </div>
      </div>

    </section>
  )
}

export default Poster;