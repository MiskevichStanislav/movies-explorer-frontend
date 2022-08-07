import './Alarm.css';

function Alarm({ showAlarm, messageAlarm }) {
    return (
        <div className={
            showAlarm
                ? 'alarm alarm_active'
                : 'alarm'
        }>
            <p className="alarm__text">{messageAlarm}</p>
        </div>
    );
}

export default Alarm;