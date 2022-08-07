import { useState } from "react";

import './Profile.css';
import Alarm from "../../components/Alarm/Alarm";

import { useValidationForm } from '../../hooks/useValidationForm'

function Profile({ handleUpdateUser, currentUser, handleSignOut }) {
    const [showAlarm, setShowAlarm] = useState(false)
    const [messageAlarm, setMessageAlarm] = useState('')

    const startValues = {
        name: currentUser.name,
        email: currentUser.email
    }

    const { values, isValid, handleChange, setIsValid } = useValidationForm(startValues)

    function clickUpdateButton() {
        handleUpdateUser(values)
            .then(() => {
                setMessageAlarm('Данные профиля успешно обновлены!')
                setIsValid(false)
            })
            .catch(() => {
                setMessageAlarm('Не удалось обновить данные профиля!')
            })
            .finally(() => {
                setShowAlarm(true)
                setTimeout(() => {
                    setShowAlarm(false)
                }, 3000)
            })
    }

    function clickSignOutButton() {
        handleSignOut()
    }

    return (
        <div className="profile">
            <div className="container profile__container">
                <div className="profile__wrapper">
                    <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
                    <form className="profile__form">
                        <label className='profile__label'>
                            <p className="profile__text">Имя</p>
                            <input
                                className="profile__input"
                                type="text"
                                value={values.name}
                                name="name"
                                onInput={handleChange}
                                required
                                placeholder="Ваше имя"
                            />
                        </label>
                        <label className='profile__label'>
                            <p className="profile__text">E-mail</p>
                            <input
                                className="profile__input"
                                type="email"
                                value={values.email}
                                name="email"
                                onInput={handleChange}
                                required
                                placeholder="Ваш E-mail"
                            />
                        </label>
                    </form>
                    <div className="profile__buttons">
                        <button
                            className={
                                isValid
                                    ? 'profile__button'
                                    : 'profile__button profile__button_disabled'
                            }
                            type="button"
                            onClick={clickUpdateButton}
                            disabled={!isValid}
                        >Редактировать</button>
                        <button
                            className='profile__button profile__button_color_red'
                            type="button"
                            onClick={clickSignOutButton}
                        >Выйти из аккаунта</button>
                    </div>
                </div>
            </div>
            <Alarm
                showAlert={showAlarm}
                messageAlert={messageAlarm}
            />
        </div>
    );
}

export default Profile;