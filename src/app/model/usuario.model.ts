export class Usuario {
    constructor(public email: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        public name: string) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}