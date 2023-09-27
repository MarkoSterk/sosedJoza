import App from "../simpleJS/App.js"
import indexComponent from "./components/index/indexComponent.js";
import vnesiComponent from "./components/vnesi/vnesiComponent.js";
import urediComponent from "./components/uredi/urediComponent.js";
import itemComponent from "./components/item/itemComponent.js";
import menuComponent from "./components/menu/menuComponent.js";
import userProfileComponent from "./components/profile/userProfileComponent.js";
import { loadUser } from "./components/utils/utilFuncs.js";


const app = new App({
    name: 'Sosed Joža',
    data: {
        user: null,
        items: null,
        pagination: null,
        item: null,
        previews: null,
        itemRating: null
    },
    beforeStart: {
        loadUser
    }
});

app.addStaticComponents({
    menuComponent
})

await app.addComponents({
    "index": indexComponent,
    "vnesi": vnesiComponent,
    "uredi": urediComponent,
    "predmet": itemComponent,
    "profil": userProfileComponent
});

app.setIndex('index');

export default app;