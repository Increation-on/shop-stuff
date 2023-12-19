import { Link } from 'react-router-dom';
import styles from '../../styles/Product.module.css';
import { ROUTES } from './../../utils/routes';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/userSlice/userSlice';

const Product = (item) => {

    const { images, title, price, description } = item;

    const SIZES = [1, 3, 4.5, 8];

    const dispatch = useDispatch();

    const [currentImage, setCurrentImage] = useState();
    const [currentSize, setCurrentSize] = useState();

    const addToCart = () => {
        dispatch(addItemToCart(item));
    };

    let key = 0;



    useEffect(() => {
        if (!images.length) return;
        setCurrentImage(images[0])
    }, [images])

    return (
        <section className={styles.product}>
            <div className={styles.images}>
                <div
                    className={styles.current}
                    style={{ backgroundImage: `url(${currentImage})`, border: "1px solid white" }}

                />
                <div className={styles['images-list']}>
                    {images.map((image, i) => (
                        <div
                            key={key++}
                            className={styles.image}
                            style={{ backgroundImage: `url(${image})`, border: '2px solid white' }}
                            onClick={() => {
                                setCurrentImage(image);
                            }}
                        />
                    ))}

                </div>
                <div className={styles.info}>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.price}>{price}$</div>
                    <div className={styles.color}>
                        <span>Color:</span> Yellow
                    </div>
                    <div className={styles.sizes}>
                        <span>Sizes :</span>
                        <div className={styles.list}>
                            {SIZES.map((size) => (
                                <div
                                    className={`${styles.size} ${currentSize === size ? styles.active : ''}`}
                                    onClick={() => {
                                        setCurrentSize(size)
                                    }}
                                    key={key++}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className={styles.description}>{description}</p>

                    <div className={styles.actions}>
                        <button
                            onClick={() => {
                                addToCart();
                            }}
                            className={styles.add} disabled={!currentSize}>
                            {!currentSize ? 'Select your size first' : 'Add to cart'}
                        </button>
                        <button className={styles.favourite}>Add to favourites</button>
                    </div>

                    <div className={styles.bottom}>
                        <div className={styles.purchase}>19 people purchased</div>
                        <Link to={ROUTES.HOME}>Return to store</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Product