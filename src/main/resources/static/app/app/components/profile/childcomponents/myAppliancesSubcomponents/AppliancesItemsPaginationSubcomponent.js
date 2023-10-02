import Component from "../../../../../simpleJS/Component.js";
import { API_BASE_URL } from "../../../../../configurations.js";
import { getItems, parseQueryParams, stringifyQueryParams } from "../../../utils/utilFuncs.js";

async function AppliancesItemsPaginationMarkup(){
    let paging = this.data;
    return `
        <nav aria-label="...">
            <ul class="pagination justify-content-center">
                <li id="paginate-prev" data-bs-prev="${paging.first}" data-bs-disabled="${paging.first}" class="page-item ${paging.first ? 'disabled' : ''}">
                    <a role="button" ${paging.first ? '' : 'sjs-click="changePage" sjs-click-args="-1"'} class="page-link" tabindex="-1" aria-disabled="${paging.first}">Prejšnja</a>
                </li>
                <li class="page-item">
                    <a class="page-link">${paging.number+1}</a>
                </li>
                <li id="paginate-next" data-bs-next="${paging.last}" data-bs-disabled="${paging.last}" class="page-item ${paging.last ? 'disabled' : ''}">
                    <a role="button" class="page-link" ${paging.last ? '' : 'sjs-click="changePage" sjs-click-args="1"'} aria-disabled="${paging.last}">Naslednja</a>
                </li>
            </ul>
        </nav>
    `
}

async function changePage(elem, args, event){
    let queryParams = parseQueryParams(this.queryParams);
    queryParams.page = parseInt(queryParams.page) + parseInt(args);
    this.setQueryParams(stringifyQueryParams(queryParams));
    await getItems.bind(this)();
}

const AppliancesItemsPaginationSubcomponent = new Component({
    name: 'Appliances list pagination',
    container: '#items-pagination',
    messageContainer: '#message-container',
    dataField: 'pagination',
    markup: AppliancesItemsPaginationMarkup,
    metaData: {
        applianceUrl: `${API_BASE_URL}/api/v1/appliances/`
    },
    methods: {
        changePage
    }
})

export default AppliancesItemsPaginationSubcomponent;