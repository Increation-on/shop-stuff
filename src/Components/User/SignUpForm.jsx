import styles from '../../styles/User.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from './../../features/userSlice/userSlice';

const SignUpForm = ({ closeForm, toggleCurrentFormType }) => {

    const dispatch = useDispatch();

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

        dispatch(createUser(values));
        closeForm();
    }

    return (
        <div className={styles.wrapper}>

            <div
                className={styles.close}
                onClick={closeForm}
            >
                <svg className='icon'>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                </svg>
            </div>

            <div className={styles.title}> Sign UP</div>

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

                <div className={styles.link}
                    onClick={() => toggleCurrentFormType('login')}
                >
                    I already have an account
                </div>

                <button
                    type='submit'
                    className={styles.submit}
                    onClick={handleSubmit}
                >
                    Create an account
                </button>
            </form>

        </div>
    )
}

export default SignUpForm;