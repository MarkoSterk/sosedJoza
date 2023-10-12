import Component from "../../../../../../simpleJS/Component.js";
import { API_BASE_URL } from "../../../../../../configurations.js";
import { getItems, getDate } from "../../../../utils/utilFuncs.js";

async function controlMarkup(){
    return `
        <div class="row my-2">
            <div class="col-8 mx-auto">
                <div class="row mx-auto">
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
                        <button class="btn btn-secondary">Išči</button>
                    </div>
                </div>
            </div>
        </div>
    `;
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

const controlSubcomponent = new Component({
    name: "Category items control",
    dataField: "items",
    container: "#category-control",
    messageContainer: "#message-container",
    markup: controlMarkup,
    metaData: {
        applianceUrl: `${API_BASE_URL}/api/v1/appliances/`,
        department: null
    },
    beforeGenerate: {
        getDepartment,
        setQueryParams,
        getItems
    },
})

export default controlSubcomponent;