import './Field.css';

function Field({ text, name, type = 'text', onInput, isValid, value }) {
    const isPassword = type === 'password'

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
            />
        </field>
    );
}

export default Field;