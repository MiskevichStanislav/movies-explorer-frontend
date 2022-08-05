import './Field.css';

function Field({ text, value, setValue, type = 'text' }) {
    const isPassword = type === 'password'
    const getPlaceholder = (text) => {
    const lowerText = text.toLowerCase()
    return text === 'Имя' ? `Вашe ${lowerText}` : `Ваш ${lowerText}`
    }

    return (
        <field className="field">
            <p className="field__text">{text}</p>
            <input
                className="field__input"
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                autoComplete={isPassword ? 'off' : undefined}
                placeholder={getPlaceholder(text)}
                required
            />
        </field>
    );
}

export default Field;