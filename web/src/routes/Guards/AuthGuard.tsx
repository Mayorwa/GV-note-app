import {ReactElement} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {StorageHelper} from "@/helpers/storageHelper";

export function LoggedInGuard({ children }: { children: ReactElement }) {
    let location = useLocation();

    if (!StorageHelper.isLoggedIn()) {
        StorageHelper.setIntendedURL(window.location.href);

        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

export function LoggedOutGuard({ children }: { children: ReactElement }) {
    let location = useLocation();

    if (StorageHelper.isLoggedIn()) {
        return <Navigate to="/board" state={{ from: location }} replace />;
    }

    return children;
}
