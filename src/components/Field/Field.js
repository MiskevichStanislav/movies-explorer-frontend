import './Field.css';

function Field({ text, value, setValue, type = 'text' }) {
    const isPassword = type === 'password'

    return (
        <field className="field">
            <p className="field__text">{text}</p>
            <input
                className="field__input"
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                autoComplete={isPassword ? 'off' : undefined}
            />
        </field>
    );
}

export default Field;