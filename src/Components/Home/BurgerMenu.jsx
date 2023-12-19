import { useState } from "react";
import styles from '../../styles/Home.module.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { NavLink } from "react-router-dom";

const BurgerMenu = ({ onChildClick }) => {

    const { list } = useSelector(({ categories }) => categories);

    const limitedList = list.filter((_, i) => i < 6);

    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(!showMenu);
        onChildClick(!showMenu);
    }

    const scrollToComponent = (componentId) => {
        const element = document.getElementById(componentId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
            {!showMenu && (
                <div className={styles.burger_button}
                    onClick={handleClick}
                >
                    <div className={styles.icon}>
                        <svg className='icon_burger'>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#burger`} />
                        </svg>
                    </div>
                </div>
            )}

            {showMenu && (
                <>
                    <div className={styles.overlay} onClick={handleClick} />
                    <div className={styles.wrapper}>
                        <div
                            className={styles.close}
                            onClick={handleClick}
                        >
                            <svg className='icon'>
                                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                            </svg>
                        </div>
                        <div className={styles.burger_title}>CATEGORIES</div>
                        <nav>
                            <ul className={styles.menu}>
                                {limitedList.map(({ id, name }) => (
                                    <li key={id}>
                                        <NavLink
                                            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                                            onClick={() => scrollToComponent('section1')}
                                            to={`/categories/${id}`}>
                                            {name}
                                        </NavLink>
                                    </li>
                                ))}

                            </ul>
                        </nav>

                        <div className={styles.footer}>
                            <a href="/help" target="_blank" className={styles.link}>Help</a>
                            <a href="/terms" target="_blank" style={{ textDecoration: "underline" }} className={styles.link}>Terms & Conditions</a>
                        </div>

                    </div>
                </>

            )}

        </>
    )
}

export default BurgerMenu