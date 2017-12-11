import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {Users} from "../resources/data/users";
import {AuthService} from "aurelia-auth";

@inject(Router, Users, AuthService)
export class Home {
    constructor(router, users, auth) {
        this.router = router;
        this.auth = auth;
        this.loginError = "";
        this.users = users;
        this.message = "home";
        this.showLogin = true;
    }

    login() {
        return this.auth.login(this.email, this.password)
        .then(response => {
            sessionStorage.setItem("user", JSON.stringify(response.user));
            this.loginError = "";
            this.router.navigate("List");
        })
        .catch(error => {
            console.log("login failed");
            console.log(error);
            this.loginError = "Invalid credentials"
        })
    }

    showRegister() {
        this.User = {
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": ""
        };
        this.registerError = "";
        this.showLogin = false;
    }

    async saveUser() {
        let serverResponse = await this.users.save(this.user);
        if (!severResponse.error) {
            this.showLogin = true;
        } else {
            this.registerError = "There was a problem registering this user";
        }
    }
}