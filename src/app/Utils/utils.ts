export class Utils {

    static insertToken(key: string, value: string){
        localStorage.setItem(key, value)
    }

    static getToken(key: string){
        return localStorage.getItem(key)
    }

    static removeToken(key: string){
        localStorage.removeItem(key)
    }

    static clearStorage(){
        localStorage.clear()
    }
}