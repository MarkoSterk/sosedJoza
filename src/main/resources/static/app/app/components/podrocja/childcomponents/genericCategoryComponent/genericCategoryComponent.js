import Component from "../../../../../simpleJS/Component.js";
import categoryItemsSubcomponent from "./subcomponents/itemsSubcomponent.js";
import { API_BASE_URL } from "../../../../../configurations.js";
import { getItems, getDate } from "../../../utils/utilFuncs.js";

async function genericMarkup(){
    return `
        <div class="my-1">
            <div id="category-control">
            </div>
            <div id="category-items" class="row">
            </div>
            </div>
            <div id="category-pagination">
            </div>
        </div>
        `
}

function getDepartment(){
    let currentUrl = window.location.href;
    if(currentUrl.includes("#")){
        let hash;
        hash = currentUrl.split("#")[1].split("?")[0];
        hash = hash.split("/")
        this.metaData.department = hash[hash.length - 1];
    }
}

function setQueryParams(){
    let params = `?department=${this.metaData.department}&rating=0&orderBy=-createdAt&page=0&perPage=10`;
    this.setQueryParams(params);
}

const genericCategoryComponent = new Component({
    name: "Generic department component",
    container: '#category',
    messageContainer: '#message-container',
    markup: genericMarkup,
    dataField: "items",
    reloadOnDataChange: false,
    metaData: {
        applianceUrl: `${API_BASE_URL}/api/v1/appliances/`,
        department: null
    },
    beforeGenerate: {
        getDepartment,
        setQueryParams,
        getItems
    },
    subcomponents: {
        categoryItemsSubcomponent
    }
});

export default genericCategoryComponent;