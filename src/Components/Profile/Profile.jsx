import styles from '../../styles/Profile.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/userSlice/userSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';


const Profile = () => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector(({ user }) => user);

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        avatar: ''
    });

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmpty = Object.values(values).some(val => !val);
        if (isEmpty) return;
        console.log(values)
        dispatch(updateUser(values));
        
    }

    useEffect(() => {
        if (!currentUser) return;
        // console.log(currentUser)
        // console.log(values)
        setValues(currentUser)
    }, [currentUser])

    return (
        <section className={styles.profile}>
            {!currentUser
                ? <span>You need to log in</span>
                :
                <form className={styles.from} onSubmit={handleSubmit}>

                    <div className={styles.group}>
                        <input
                            type="email"
                            name='email'
                            placeholder='Your email'
                            value={values.email}
                            autoComplete='off'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <input
                            type="name"
                            name='name'
                            placeholder='Your name'
                            value={values.name}
                            autoComplete='off'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <input
                            type='password'
                            name='password'
                            placeholder='Your password'
                            value={values.password}
                            autoComplete='off'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <input
                            type="avatar"
                            name='avatar'
                            placeholder='Your avatar'
                            value={values.avatar}
                            autoComplete='off'
                            onChange={handleChange}

                        />
                    </div>

                    <button
                        type='submit'
                        className={styles.submit}
                    >
                        Update
                    </button>


                </form>
            }
        </section>
    )
}

export default Profile;