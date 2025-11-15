import {TokenHelper} from "./tokenHelper.ts";

export class StorageHelper {

    static setAuthToken(cName: string, cValue: string, exDays: number): void {
       TokenHelper.setToken(cName, cValue, exDays, '')
    }

    static storeAuthTokens(jwt: string, rt?: string) {
        this.setAuthToken(TokenHelper.getJWT_TOKEN, jwt, 1000);

        if (rt) {
            this.setAuthToken(TokenHelper.getREFRESH_TOKEN, rt, 1000);
        }
    }

    static clearTokens() {
        this.deleteCookie(TokenHelper.getREFRESH_TOKEN);
        this.deleteCookie(TokenHelper.getJWT_TOKEN);
        this.clearUserData();
    }

    static setIntendedURL(url: string) {
        this.setAuthToken(TokenHelper.getAUTH_FROM, url, 3);
    }

    static clearIntendedURL() {
        this.deleteCookie(TokenHelper.getAUTH_FROM);
    }

    static deleteCookie(name: string) {
        TokenHelper.deleteToken(name, '/', '', false);
    }

    static isLoggedIn(): boolean {
        return !!TokenHelper.getAuthToken();
    }

    static logout(rememberCurrentLocation = false) {
        this.clearTokens();

        if (rememberCurrentLocation) {
            this.setIntendedURL(window.location.href);
        } else {
            this.clearIntendedURL();
        }

        window.location.href = `/`;
    }

    static storeUserData(name: string, email: string) {
        const userData = JSON.stringify({ name, email });

        TokenHelper.setToken("uD-GV", userData, 30);
    }

    static getUserData() {
        try {
            const data = TokenHelper.getToken("uD-GV");
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    static clearUserData() {
        TokenHelper.deleteToken("uD-GV", "/", "", false);
    }
}
