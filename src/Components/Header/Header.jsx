import styles from '../../styles/Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from './../../utils/routes';
import LOGO from '../../images/logo.svg';
import AVATAR from '../../images/avatar.jpg';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { toggleForm } from '../../features/userSlice/userSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { useGetProductsQuery } from '../../features/api/apiSlice';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, cart } = useSelector(({ user }) => user);

    const [searchValue, setSearchValue] = useState('');

    const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });

    const { data, isLoading } = useGetProductsQuery({ title: searchValue });


    const handleClick = () => {
        if (!currentUser) {
            dispatch(toggleForm(true));
        } else {
            navigate(ROUTES.PROFILE)
        }
    };

    const handleSearch = ({ target: { value } }) => {
        setSearchValue(value)
    }

    useEffect(() => {
        if (!currentUser) return;
        // console.log(currentUser)
        // console.log(values)
        setValues(currentUser)
    }, [currentUser]);


    return (
        <div className={styles.header}>

            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="Stuff" />
                </Link>
            </div>

            <div className={styles.info}>

                <div className={styles.user} onClick={handleClick}>
                    <div className={styles.avatar} style={{ backgroundImage: `url(${values.avatar})` }} />
                    <div className={styles.username}>{values.name}</div>
                </div>

                <form className={styles.form}>

                    <div className={styles.icon}>
                        <svg className='icon'>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
                        </svg>
                    </div>

                    <div className={styles.input}>
                        <input
                            type="search"
                            name='search'
                            placeholder='Search...'
                            autoComplete='off'
                            onChange={handleSearch}
                            value={searchValue} />
                    </div>

                    {searchValue && (
                        <div
                            className={styles.box}
                            onClick={() => setSearchValue('')}
                        >
                            {isLoading ? 'Loading...' : !data.length ? 'No result' : (
                                data.map(({ title, images, id }) => (
                                    <Link
                                        key={id}
                                        to={`/products/${id}`}
                                        className={styles.item}
                                    >
                                        <div
                                            className={styles.image}
                                            style={{ backgroundImage: `url(${images})` }}
                                        />
                                        <div className={styles.title}>{title}</div>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}

                </form>






                <div className={styles.account}>
                    <Link to={ROUTES.HOME} className={styles.favourites}>
                        <svg className={styles['icon-fav']}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
                        </svg>
                    </Link>
                    <Link to={ROUTES.CART} className={styles.cart}>
                        <svg className={styles['icon-cart']}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
                        </svg>

                        {!!cart.length && (
                            <span className={styles.count}>
                                {cart.map((el) => el.quantity).reduce((prev, curr) => prev + curr, 0)}
                            </span>
                        )
                        }

                    </Link>
                </div>
            </div>


            <form className={`${styles.form} ${styles.form_responsive}`}>

                <div className={styles.icon}>
                    <svg className='icon'>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
                    </svg>
                </div>

                <div className={styles.input}>
                    <input
                        type="search"
                        name='search'
                        placeholder='Search...'
                        autoComplete='off'
                        onChange={handleSearch}
                        value={searchValue} />
                </div>

                {searchValue && (
                    <div
                        className={styles.box}
                        onClick={() => setSearchValue('')}
                    >
                        {isLoading ? 'Loading...' : !data.length ? 'No result' : (
                            data.map(({ title, images, id }) => (
                                <Link
                                    key={id}
                                    to={`/products/${id}`}
                                    className={styles.item}
                                >
                                    <div
                                        className={styles.image}
                                        style={{ backgroundImage: `url(${images})` }}
                                    />
                                    <div className={styles.title}>{title}</div>
                                </Link>
                            ))
                        )}
                    </div>
                )}

            </form>
        </div>
    )
}

export default Header;