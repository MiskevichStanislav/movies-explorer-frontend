import './Field.css';

import { INPUTS } from '../../utils/constants'

function Field({ text, name, type = 'text', onInput, isValid, value, pattern, title }) {
    const isPassword = type === INPUTS.PASSWORD

    function getPlaceholder(text) {
        const lowerText = text.toLowerCase()
        return text === 'Имя' ? `Вашe ${lowerText}` : `Ваш ${lowerText}`
    }

    return (
        <field className="field">
            <p className="field__text">{text}</p>
            <input
                className={
                    isValid
                        ? 'field__input'
                        : 'field__input field__input_error'
                }
                type={type}
                autoComplete={isPassword ? 'off' : undefined}
                placeholder={getPlaceholder(text)}
                required
                name={name}
                onInput={onInput}
                value={value}
                pattern={pattern}
                title={title}
            />
        </field>
    );
}

export default Field;