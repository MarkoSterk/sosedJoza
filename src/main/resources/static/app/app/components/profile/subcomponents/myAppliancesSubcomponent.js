import Component from "../../../../simpleJS/Component.js";
import AppliancesItemsSubcomponent from "./AppliancesItemsSubcomponent.js";
import AppliancesItemsControlSubcomponent from "./AppliancesItemsControlSubcomponent.js";
import AppliancesItemsPaginationSubcomponent from "./AppliancesItemsPaginationSubcomponent.js";
import { API_BASE_URL } from "../../../../configurations.js";

async function myAppliancesMarkup(){
    return `
        <div id="items-control"></div>
        <div id="items"></div>
        <div id="items-pagination"></div>
    `
}

const myAppliancesSubcomponent = new Component({
    name: 'My appliances',
    container: '#nav-moji-predmeti',
    messageContainer: '#message-container',
    markup: myAppliancesMarkup,
    subcomponents: {
        AppliancesItemsControlSubcomponent,
        AppliancesItemsSubcomponent,
        AppliancesItemsPaginationSubcomponent
    }
})

export default myAppliancesSubcomponent;