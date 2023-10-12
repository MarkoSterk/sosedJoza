import Component from "../../../../../../simpleJS/Component.js";

async function categoryItemsMarkup(){
    function createItemCard(element){
        const thumbnailUrl = element.images[0] ? `/uploads/${element.images[0]}` : 'uploads/default.png';
        return `
        <div class="col-xs-12 col-sm-4">
            <div class="card">
                <a class="img-card" href="#predmet?id=${element.id}">
                    <img src="${thumbnailUrl}" />
                </a>
                <div class="card-content">
                    <h6 class="card-title">
                        <a href="#predmet?id=${element.id}"> ${element.name}
                        </a>
                    </h6>
                    <p>
                        ${element.description.slice(0,40)}
                    </p>
                </div>

            </div>
        </div>
        `
    }
    let itemsCards = this.data.map((element) => createItemCard(element)).join('');
    return `
        <div class="row">
            <div class="col-8 mx-auto">
                <div class="container">
                    <div class="row">
                        ${itemsCards}
                    </div>
                </div>
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
