import Cookies from 'universal-cookie';

abstract class CookiesService {

    private static cookies = new Cookies();

    static setCookie(name: string, value: string, options = {}): void {
        this.cookies.set(name, value, options)
    }

    static getCookie(name: string): string {
        return this.cookies.get(name)
    }

    static setAuthorizationToken(value: string, options = {}): void {
        const day = new Date();
        day.setMonth(day.getMonth() + 1)
        this.cookies.set("authToken", value, {path: "/", sameSite: "strict", ...options, expires: day})
    }

    static getAuthorizationToken(): string {
        return this.cookies.get("authToken")
    }

    static removeAuthorizationToken(): void {
        this.cookies.remove("authToken")
    }
}

export default CookiesService