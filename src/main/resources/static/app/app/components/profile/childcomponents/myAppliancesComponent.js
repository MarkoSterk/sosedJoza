import Component from "../../../../simpleJS/Component.js";
import { API_BASE_URL } from "../../../../configurations.js";
import { getItems } from "../../utils/utilFuncs.js";
import AppliancesItemsControlSubcomponent from "./myAppliancesSubcomponents/AppliancesItemsControlSubcomponent.js";
import AppliancesItemsPaginationSubcomponent from "./myAppliancesSubcomponents/AppliancesItemsPaginationSubcomponent.js"
import AppliancesItemsSubcomponent from "./myAppliancesSubcomponents/AppliancesItemsSubcomponent.js"

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
    metaData: {
        applianceUrl: `${API_BASE_URL}/api/v1/appliances/`
    },
    subcomponents: {
        AppliancesItemsControlSubcomponent,
        AppliancesItemsPaginationSubcomponent,
        AppliancesItemsSubcomponent
    },
    beforeGenerate: {
        setQueryParams,
        getItems
    }
})

export default myAppliancesComponent;
