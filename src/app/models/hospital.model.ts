interface _hospitalUser {
    _id: string,
    nombre: string,
    img: string
}

export class Hospital {
    constructor(
        public _id: string,
        public nombre: string,
        public img?: any,
        public usuario?: _hospitalUser,
    ) { }
}