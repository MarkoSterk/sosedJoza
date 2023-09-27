import Component from "../../../../simpleJS/Component.js";
import AppliancesItemsSubcomponent from "./AppliancesItemsSubcomponent.js";
import AppliancesItemsControlSubcomponent from "./AppliancesItemsControlSubcomponent.js";
import AppliancesItemsPaginationSubcomponent from "./AppliancesItemsPaginationSubcomponent.js";
import { API_BASE_URL } from "../../../../configurations.js";
import {getItems} from "./utilFuncs.js"

async function myAppliancesMarkup(){
    return `
        <div id="items-control"></div>
        <div id="items"></div>
        <div id="items-pagination"></div>
    `
}

function setQueryParams(){
    let user = this.getData('user');
    let params = `?userId=${user.id}&rating=0&orderBy=-createdAt&page=0&perPage=10`;
    this.setQueryParams(params);
}

const myAppliancesComponent = new Component({
    name: 'My appliances',
    container: '#tab-content',
    messageContainer: '#message-container',
    markup: myAppliancesMarkup,
    subcomponents: {
        AppliancesItemsControlSubcomponent,
        AppliancesItemsSubcomponent,
        AppliancesItemsPaginationSubcomponent
    },
    metaData: {
        applianceUrl: `${API_BASE_URL}/api/v1/appliances/`
    },
    beforeGenerate: {
        setQueryParams,
        getItems
    }
})

export default myAppliancesComponent;