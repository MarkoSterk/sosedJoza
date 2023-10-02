import Component from "../../../simpleJS/Component.js";
import { API_BASE_URL } from "../../../configurations.js";
import { getItems } from "../utils/utilFuncs.js";

async function genericMarkup(){
    return `
        <div class="row bg-light">
            <div class="col-11 col-sm-11 col-md-11 col-lg-9 mx-auto my-5">
                <div class="card shadow-5-strong p-4">
                    <div id="category-control">
                    </div>
                    <div id="category-items">
                    </div>
                    <div id="category-pagination">
                    </div>
                </div>
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
        console.log('Category: ', hash)
        this.metaData.department = hash[hash.length - 1];
    }
}

function setQueryParams(){
    let params = `?department=${this.metaData.department}&rating=0&orderBy=-createdAt&page=0&perPage=10`;
    console.log('Query params: ', params);
    this.setQueryParams(params);
}

const genericCategoryComponent = new Component({
    name: "Generic department component",
    container: '#items',
    messageContainer: '#message-container',
    markup: genericMarkup,
    metaData: {
        applianceUrl: `${API_BASE_URL}/api/v1/appliances/`,
        department: null
    },
    beforeGenerate: {
        getDepartment,
        setQueryParams,
        getItems
    }
});

export default genericCategoryComponent;