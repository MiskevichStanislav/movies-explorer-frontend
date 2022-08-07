import { Redirect, Route } from "react-router-dom";

import Preloader from "../Preloader/Preloader";

function ProtectedRoute({ isLoggedIn, isPreloader, component: Component, ...props }) {
    return (
        <Route>
            {isPreloader
                ? <Preloader />
                : isLoggedIn
                    ? <Component {...props} />
                    : <Redirect to='/' />}
        </Route>
    )
}

export default ProtectedRoute;