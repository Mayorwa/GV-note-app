export class TokenHelper {

    private static readonly JWT_TOKEN = 'aT-GV';
    private static readonly REFRESH_TOKEN = 'rT-GV';
    private static readonly AUTH_FROM = 'aF-GV';

    static setToken(cName: string, cValue: string, exDays: number, domain?: string): void {
        const d = new Date();
        d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + d.toUTCString();

        if (domain) {
            document.cookie = cName + '=' + cValue + ';' + expires + ';path=/;sameSite=strict;domain=' + domain;
        } else {
            document.cookie = cName + '=' + cValue + ';' + expires + ';path=/;sameSite=strict';
        }
    }

    static getToken(cname: string): string {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let c of ca) {
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    static get getJWT_TOKEN() {
        return this.JWT_TOKEN;
    }

    static get getREFRESH_TOKEN() {
        return this.REFRESH_TOKEN;
    }

    static get getAUTH_FROM() {
        return this.AUTH_FROM;
    }

    static getAuthToken() {
        return this.getToken(this.JWT_TOKEN);
    }

    static deleteToken( name: string, path: string, domain: string, isProduction = false) {
        if ( this.getToken( name ) ) {
            document.cookie = name + '=' +
                ((path) ? ';path=' + path : '') +
                ((isProduction && domain) ? ';domain=' + domain : '') +
                ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
        }
    }
}
