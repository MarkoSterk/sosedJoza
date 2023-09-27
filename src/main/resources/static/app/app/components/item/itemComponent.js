import Component from "../../../simpleJS/Component.js"
import { API_BASE_URL } from "../../../configurations.js";
import { parseQueryParams } from "../utils/utilFuncs.js";
import itemRatingSubcomponent from "./subcomponents/itemRatingSubcomponent.js";
import "../../../../vendors/axios/axios.min.js"

async function itemComponentMarkup(){
    function imagePreview(images){
        let preview = '';
        for(let image of images){
            preview+=`<div class="col-3">
                        <img src="/uploads/${image}" class="img-fluid">
                        <a href="/uploads/${image}" target="_blank"
                        class="btn btn-sm rounded-0 btn-primary d-block w-100">
                            <i class="fa-solid fa-glasses"></i> Odpri sliko
                        </a>
                    </div>`
        }
        return preview
    }
    let department = this.data ? `#${this.data.department}` : ''
    let departmentUrl = this.data ? `#podrocje?department=${this.data.department}` : ''
    if(this.data){
        return `
        <div class="row bg-light">
            <div class="col-10 col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-9 mx-auto my-5">
                <div class="card shadow-5-strong p-4">
                    <div class="row text-center">
                        <h5 class="text-secondary">${this.data ? this.data.name : ''}</h5>
                    </div>
                    <div class="row mb-2">
                        <div class="col-12 col-md-3 col-lg-3">
                            <a href="${departmentUrl}" class="btn btn-sm btn-secondary mt-2">${department}</a>
                        </div>
                        <div class="col-12 col-md-9 col-lg-9" id="item-rating">
                                
                        </div>
                    </div>
                    <div class="row my-2 text-secondary">
                        <h5 class="text-secondary">Jožetovi podatki:</h5>
                        <hr class="w-50">
                        <span class="d-block">${this.data ? `${this.data.owner.firstname} ${this.data.owner.lastname}` : ''}<span>
                        <span class="d-block">${this.data ? this.data.owner.email : ''}</span>
                        <hr class="w-50">
                    </div>
                    <div class="row my-2 text-secondary">
                        ${this.data ? this.data.description : ''}
                    </div>
                    
                    <div class="row mb-3" id="imagesPreview">
                        ${this.data ? imagePreview(this.data.images) : ''}
                    </div>
                </div>
            </div>
        </div>
        `
    }

    return `
        <div class="row bg-light">
            <div class="col-10 col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-9 mx-auto my-5">
                <div class="card shadow-5-strong p-4">    
                    <h2>Predmet ne obstaja!</h2>
                    <div class="col-12 col-md-9 col-lg-9" id="item-rating">
                                
                    </div>
                </div>
            </div>
        </div>
        `
    
}

async function fetchItem(){
    console.log('Fetching item:', this.queryParams);
    const queryParams = parseQueryParams(this.queryParams);
    await axios.get(this.metaData.url+queryParams.id)
    .then(function(response){
        this.setData(this.dataField, response.data.data);
        this.setData('itemRating', {
            rating: response.data.data.rating,
            numberOfRatings: response.data.data.numberOfRatings
        })
    }.bind(this)).catch(function(error){
        this.setData(this.dataField, null)
    }.bind(this))
}


const itemComponent = new Component({
    name: 'Predmet',
    container: '#content',
    messageContainer: '#message-container',
    markup: itemComponentMarkup,
    dataField: 'item',
    metaData: {
        url: `${API_BASE_URL}/api/v1/appliances/`,
        rateUrl: `${API_BASE_URL}/api/v1/appliances/ratings/`
    },
    beforeGenerate: {
        fetchItem
    },
    afterDeactive: {
        function() {this.setData('item', null)}
    },
    subcomponents: {
        itemRatingSubcomponent
    }
})

export default itemComponent;
