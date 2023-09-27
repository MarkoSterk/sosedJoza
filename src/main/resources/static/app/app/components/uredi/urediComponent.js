import Component from "../../../simpleJS/Component.js";
import previewImageSubcomponent from "./subcomponents/previewImageSubcomponent.js";
import {parseQueryParams, initSummernote, imageUpload, updateItem} from "../utils/utilFuncs.js";
import { API_BASE_URL } from "../../../configurations.js";

//Kuhinja, Delavnica, Vrt, Multimedia, Prosti čas, Ostalo
async function urediComponentMarkup(){
    let data = this.data;
    if(!data) return 'Item not available!'
    return `
        <div class="row bg-light">
            <div class="col-10 col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-9 mx-auto my-5">
                <div class="card shadow-5-strong p-4">
                    <div class="row my-2">
                        <div class="input-group flex-nowrap mb-0">
                            <span class="input-group-text" id="addon-wrapping">Ime predmeta</span>
                            <input value="${data.name}" id="name" type="text" class="form-control" placeholder="Ime tega predmeta" aria-label="name" aria-describedby="addon-wrapping">
                        </div>
                        <span id="name-error" class="bg-danger d-block" style="width: 95%; margin-left: 2.5%;">
                        </span>
                    </div>
                    <div class="row">
                        <div class="input-group flex-nowrap my-2">
                            <span class="input-group-text" id="addon-wrapping">Kategorija</span>
                            <select class="form-select" aria-label="kategorija" id="department">
                                <option value="kuhinja" ${data.department == "kuhinja" ? "selected" : ""}>Kuhinja</option>
                                <option value="delavnica" ${data.department == "delavnica" ? "selected" : ""}>Delavnica</option>
                                <option value="vrt" ${data.department == "vrt" ? "selected" : ""}>Vrt</option>
                                <option value="multimedia" ${data.department == "multimedia" ? "selected" : ""}>Multimedia</option>
                                <option value="prosti čas" ${data.department == "prosti čas" ? "selected" : ""}>Prosti Čas</option>
                                <option value="ostalo" ${data.department == "ostalo" ? "selected" : ""}>Ostalo</option>
                            </select>
                        </div>
                    </div>
                    <div class="row px-2 mb-3">
                        <textarea id="description" class="summernote">${data.description}</textarea>
                        <span id="description-error" class="bg-danger d-block">
                        </span>
                    </div>
                    <div class="row mb-3">
                        <label for="images" class="btn btn-sm btn-secondary w-25">Dodaj slike <i class="fa-solid fa-camera"></i></label>
                        <input id="images" sjs-change="imageUpload" sjs-change-args="#imagesPreview" type="file" multiple style="display: none;">
                    </div>
                    <div class="row mb-3" id="imagesPreview">

                    </div>
                    <div class="row">
                        <button type="button" sjs-click="updateItem" class="btn btn-secondary d-block w-100">Uredi predmet</button>
                    </div>
                </div>
            </div>
        </div>
    `
}

async function fetchItem(){
    const queryParams = parseQueryParams(this.queryParams);
    await axios.get(this.metaData.itemUrl+queryParams.id)
    .then(function(response){
        this.setData(this.dataField, response.data.data)
    }.bind(this)).catch(function(error){
        this.setData(this.dataField, null)
    }.bind(this))
}

const urediComponent = new Component({
    name: 'Uredi',
    container: '#content',
    messageContainer: '#message-container',
    markup: urediComponentMarkup,
    dataField: 'item',
    metaData: {
        itemUrl: `${API_BASE_URL}/api/v1/appliances/`,
        imageUrl: `${API_BASE_URL}/api/v1/appliances/images`
    },
    subcomponents:{
        previewImageSubcomponent
    },
    beforeGenerate: {
        fetchItem
    },
    afterGenerate: {
        initSummernote
    },
    methods: {
        imageUpload,
        updateItem
    }
})

export default urediComponent;