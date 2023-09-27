import Component from "../../../../simpleJS/Component.js";
import { API_BASE_URL } from "../../../../configurations.js";
import { parseQueryParams, stringifyQueryParams } from "../../utils/utilFuncs.js";
import { getItems } from "./utilFuncs.js";

async function AppliancesItemsControlMarkup(){
    return `
        <div class="row my-2">
            <div class="col-12 col-md-3 col-lg-3 mb-1">
                <label class="visually-hidden" for="perPage">Prikaži</label>
                <div class="input-group">
                    <div class="input-group-text">Prikaži</div>
                    <select class="form-select" aria-label="Per page" id="perPage">
                        <option value="5">5</option>
                        <option selected value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
            <div class="col-12 col-md-4 col-lg-3 mb-1">
                <label class="visually-hidden" for="orderBy">Razvrsti po</label>
                <div class="input-group">
                    <div class="input-group-text">Razvrsti po</div>
                    <select class="form-select" aria-label="Razvrsti po" id="orderBy">
                        <option value="name">Ime</option>
                        <option value="rating">Ocena</option>
                        <option value="available">Stanje</option>
                        <option selected value="createdAt">Datum</option>
                    </select>
                </div>
            </div>
            <div class="col-12 col-md-4 col-lg-3 mb-1">
                <label class="visually-hidden" for="orderDirection">Razvrsti</label>
                <div class="input-group">
                    <div class="input-group-text">Razvrsti</div>
                    <select class="form-select" aria-label="Razvrsti" id="orderDirection">
                        <option value="">Naraščajoče</option>
                        <option selected value="-">Padajoče</option>
                    </select>
                </div>
            </div>
            <div class="col-12 col-md-1 col-lg-1">
                <button sjs-click="searchItems" class="btn btn-secondary">Išči</button>
            </div>
        </div>
    `
}

async function searchItems(){
    let queryParams = parseQueryParams(this.queryParams);
    queryParams.page = 0;
    queryParams.perPage = document.getElementById("perPage").value;
    queryParams.orderBy = document.getElementById("orderDirection").value+document.getElementById("orderBy").value;
    this.setQueryParams(stringifyQueryParams(queryParams));
    await getItems.bind(this)();
}


const AppliancesItemsControlSubcomponent = new Component({
    name: 'Appliances items control',
    container: '#items-control',
    messageContainer: '#message-container',
    markup: AppliancesItemsControlMarkup,
    metaData: {
        applianceUrl: `${API_BASE_URL}/api/v1/appliances/`
    },
    methods: {
        searchItems
    }

})

export default AppliancesItemsControlSubcomponent;