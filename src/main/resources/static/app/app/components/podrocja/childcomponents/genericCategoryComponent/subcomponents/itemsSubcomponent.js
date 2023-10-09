import Component from "../../../../../../simpleJS/Component.js";

async function categoryItemsMarkup(){
    function createItemCard(element){
        return `
            <div class="card col-12 col-md-5 col-lg-3 p-1 mx-1">
                <div>
                    <img class="rounded" style="width: 100%; height: auto;" src="uploads/${element.images[0]}">
                </div>
                <a class="text-decoration-none" href='#predmet?id=${element.id}'>${element.name}</a></td>
                <p title="${element.description}">${element.description.substring(0,40)}</p>
                <span>${element.owner.firstname} ${element.owner.lastname}</span>
                <span>${element.rating}/5 (${element.numberOfRatings})</span>
                <span>${element.available ? 'Razpoložljivo' : 'Zasedeno'}</span>
            </div>
        `
    }
    let itemsCards = this.data.map((element) => createItemCard(element)).join('');
    return `
        <div class="col-8 mx-auto">
            <div class="row">
                ${itemsCards}
            </div>
        </div>
    `;
}

const categoryItemsSubcomponent = new Component({
    name: "Category items",
    container: "#category-items",
    dataField: "items",
    markup: categoryItemsMarkup
});

export default categoryItemsSubcomponent;
