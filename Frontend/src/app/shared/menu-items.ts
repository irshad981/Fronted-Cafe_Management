import { Injectable } from "@angular/core";

export interface Menu {
    state : string;
    name : String;
    type: String;
    icon:string;
    role:string;

}

const MENUITEMS = [
    {state: 'dashboard' , name : "DashBoard" , type: "link" , icon : "dashboard" , role : '' }
]

@Injectable() 
export class MenuItems {
    getMenuitem(): Menu[]{
        return MENUITEMS;
    }
}