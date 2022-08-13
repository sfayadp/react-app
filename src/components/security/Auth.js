class Auth {
    constructor() {
        this.autenticated = false;
        this.userName = '';
        this.idUser = '';
        this.Idenfication = '';
    }

    login(cb, username, identification){
        this.autenticated = true;
        this.userName = username;
        this.Idenfication = identification;
        console.log('Parameter', username);
        console.log('Class property', this.userName);
        cb();
    }

    logout(cb){
        this.autenticated = false;
        this.userName = '';
        cb();
    }

    isAuthenticaded() {
        return this.autenticated;
    }

    getUserName(){
        return this.userName;
    }

}
export default new Auth();