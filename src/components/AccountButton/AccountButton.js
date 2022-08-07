import { Link } from "react-router-dom";

import './AccountButton.css';

function AccountButton() {
    return (
        <div className="account-button">
            <Link className="account-button__link" to='/profile'>Аккаунт</Link>
            <div className="account-button__photo"></div>
        </div>
    );
}

export default AccountButton;