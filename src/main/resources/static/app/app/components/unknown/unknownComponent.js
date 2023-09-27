import Component from "../../../simpleJS/Component.js";

async function unknownComponentMarkup(){
    return `
    <div class="row mt-5">
        <div class="col-8 col-md-6 col-lg-4 mx-auto text-center mt-5">
            <i class="fa-solid fa-question fa-2xl"></i>
        </div>
    </div>
    <div class="row">
        <div class="col-8 col-md-6 col-lg-4 mx-auto">
            <h2 class="text-center">404 Neznana stran!</h2>
            <h4 class="text-center">
                Ojoj, te strani ni mogoče najti! Prosim preverite naslov in poskusite ponovno.
            </h4>
        </div>
    </div>
    `
}

const unknownComponent = new Component({
    name: 'Unknown',
    container: '#content',
    markup: unknownComponentMarkup
})

export default unknownComponent;
