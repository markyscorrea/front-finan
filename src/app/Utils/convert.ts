export class Format {

    static date(data: any){
        return new Intl.DateTimeFormat("pt-br").format(data)
    }

    static value(v: any){
        return parseFloat(v)
    }
}