import Component from "../../../../../simpleJS/Component.js";
import categoryItemsSubcomponent from "./subcomponents/itemsSubcomponent.js";
import controlSubcomponent from "./subcomponents/controlSubcomponent.js";
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



const genericCategoryComponent = new Component({
    name: "Generic department component",
    container: '#category',
    messageContainer: '#message-container',
    markup: genericMarkup,
    subcomponents: {
        controlSubcomponent,
        categoryItemsSubcomponent
    }
});

export default genericCategoryComponent;