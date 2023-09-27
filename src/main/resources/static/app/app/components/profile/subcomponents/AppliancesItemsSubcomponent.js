import Component from "../../../../simpleJS/Component.js";
import { API_BASE_URL } from "../../../../configurations.js";
import { getDate } from "../../utils/utilFuncs.js";

async function AppliancesItemsMarkup(){
    let appliances = this.data;
    let pagination = this.getData('pagination');
    let offset = pagination.number*pagination.size; //currentPage * perPage. currentPage starts with 0;
    function createTableRow(element, index){
        return `
            <tr>
                <th scope="row">${index+1+offset}</th>
                <td><a class="text-decoration-none" href='#uredi?id=${element.id}'>${element.name}</a></td>
                <td data-bs-toggle="tooltip" data-bs-placement="top" title="${element.description}">${element.description.substring(0,40)}</td>
                <td>${getDate(element.createdAt)}</td>
                <td>${element.rating}/5 (${element.numberOfRatings})</td>
                <td>${element.available ? 'Razpoložljivo' : 'Zasedeno'}</td>
            </tr>
        `
    }
    let tableMarkup = appliances.map((element, index) => createTableRow(element, index)).join('');
    return `
        <div class="container table-responsive py-5">
            <table class="table table-bordered table-hover">
                <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Ime</th>
                      <th scope="col">Opis</th>
                      <th scope="col">Datum</th>
                      <th scope="col">Ocena</th>
                      <th scope="col">Stanje</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableMarkup}
                </tbody>
            </table>
        </div>
    `
}

const AppliancesItemsSubcomponent = new Component({
    name: 'Appliances list',
    container: '#items',
    messageContainer: '#message-container',
    dataField: 'items',
    markup: AppliancesItemsMarkup
})

export default AppliancesItemsSubcomponent;