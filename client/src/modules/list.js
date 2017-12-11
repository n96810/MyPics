import {inject} from "aurelia-framework";
import {Galleries} from "../resources/data/galleries";
import {Pictures} from "../resources/data/pictures";
import {AuthService} from "aurelia-auth"

@inject(Galleries, Pictures, AuthService)
export class List {
    
}