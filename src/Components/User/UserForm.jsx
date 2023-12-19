import { useSelector } from 'react-redux/es/hooks/useSelector';
import SignUpForm from './SignUpForm';
import styles from '../../styles/User.module.css';
import { useDispatch } from 'react-redux';
import { toggleForm, toggleFormType } from '../../features/userSlice/userSlice';
import UserLoginForm from './UserLoginForm';

const UserForm = () => {

    const { showForm, formType } = useSelector(({ user }) => user);
    const dispatch = useDispatch();

    const closeForm = () => {
        dispatch(toggleForm(false))
    }
    const toggleCurrentFormType = (type) => {
        dispatch(toggleFormType(type))
    }

    return (
        showForm ?
            <>
                <div
                    className={styles.overlay}
                    onClick={() => { closeForm() }}
                />
                {formType === "signup"
                    ? <SignUpForm
                        closeForm={closeForm}
                        toggleCurrentFormType={toggleCurrentFormType}
                    />
                    : <UserLoginForm
                        toggleCurrentFormType={toggleCurrentFormType}
                        closeForm={closeForm}
                    />
                }

            </>
            : (
                <></>
            )

    )
}

export default UserForm;