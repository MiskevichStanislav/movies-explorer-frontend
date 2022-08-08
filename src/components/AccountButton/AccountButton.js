import { Link } from "react-router-dom";

import './AccountButton.css';

import { PAGES } from '../../utils/constants'

function AccountButton() {
    return (
        <div className="account-button">
            <Link className="account-button__link" to={PAGES.PROFILE}>Аккаунт</Link>
            <div className="account-button__photo"></div>
        </div>
    );
}

export default AccountButton;