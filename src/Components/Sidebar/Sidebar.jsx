import { NavLink } from 'react-router-dom';
import styles from '../../styles/Sidebar.module.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Sidebar = () => {

  const { list } = useSelector(({ categories }) => categories);

  const limitedList = list.filter((_, i) => i < 6);

  const scrollToComponent = (componentId) => {
    const element = document.getElementById(componentId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          {limitedList.map(({ id, name }) => (
            <li key={id}>
              <NavLink
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                onClick={()=> scrollToComponent('section1')}
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

    </section>
  )
}

export default Sidebar;