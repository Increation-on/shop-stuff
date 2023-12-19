import { useSelector } from 'react-redux/es/hooks/useSelector';
import styles from '../../styles/Cart.module.css';
import { sumTotalPrice } from './../../utils/common';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../features/userSlice/userSlice';

const Cart = () => {

    const { cart } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const changeQuantity = (item, quantity) => {
        dispatch(addItemToCart({ ...item, quantity }));
    }

    const removeItem = (id) => {
        dispatch(removeItemFromCart(id));
    }


    return (
        <section className={styles.cart}>
            <h2 className={styles.title}>Your cart</h2>
            {!cart.length
                ? <div className={styles.empty}>Your cart is empty</div>
                : <>
                    <div className={styles.list}>
                        {cart.map((item) => {
                            return (
                                <div className={styles.item} key={item.id}>
                                    <div
                                        className={styles.image}
                                        style={{ backgroundImage: `url(${item.images[0]})` }}
                                    />
                                    <div className={styles.info}>
                                        <h3 className={styles.name}>{item.title}</h3>
                                        <div className={styles.category}>{item.category.name}</div>
                                    </div>

                                    <div className={styles.price}>{item.price}$</div>

                                    <div className={styles.quantity}>

                                        <div className={styles.minus} onClick={() => changeQuantity(item, Math.max(1, item.quantity - 1))}>
                                            <svg className='icon'>
                                                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`} />
                                            </svg>
                                        </div>

                                        <span>{item.quantity}</span>

                                        <div className={styles.plus} onClick={() => changeQuantity(item, item.quantity + 1)}>
                                            <svg className='icon'>
                                                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`} />
                                            </svg>
                                        </div>




                                    </div>

                                    <div className={styles.total}>{item.price * item.quantity}$</div>

                                    <div className={styles.close} onClick={() => removeItem(item.id)}>
                                        <svg className='icon'>
                                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                                        </svg>
                                    </div>

                                </div>

                            )
                        })}
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.total}>
                            TOTAL PRICE: {" "}
                            <span>
                                {sumTotalPrice(cart.map(({ quantity, price }) => quantity * price))}$
                            </span>
                        </div>
                        <button className={styles.proceed}>Proceed to checkout</button>
                    </div>
                </>
            }
        </section>
    )
}

export default Cart;