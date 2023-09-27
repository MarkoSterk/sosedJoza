import Component from "../../../simpleJS/Component.js";
import { addItem, initSummernote, imageUpload } from "../utils/utilFuncs.js";
import previewImagesSubcomponent from "./subcomponents/previewImageSubcomponent.js";
import { API_BASE_URL } from "../../../configurations.js";

//Kuhinja, Delavnica, Vrt, Multimedia, Prosti čas, Ostalo
async function vnesiComponentMarkup(){
    return `
        <div class="row bg-light">
            <div class="col-10 col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-9 mx-auto my-5">
                <div class="card shadow-5-strong p-4">
                    <div>
                        <img class="mx-auto d-block" width="250" src="/images/sosed_joza_logo.png" alt="Logo of Sosed Joza">
                    </div>
                    <div class="row text-center">
                        <h5 class="text-secondary">Imate predmet na katerem se nabira prah? Ponudite ga prijateljem v uporabo!</h5>
                    </div>
                    <div class="row my-2">
                        <div class="input-group flex-nowrap mb-0">
                            <span class="input-group-text" id="addon-wrapping">Ime predmeta</span>
                            <input id="name" type="text" class="form-control" placeholder="Ime tega predmeta" aria-label="name" aria-describedby="addon-wrapping">
                        </div>
                        <span id="name-error" class="bg-danger d-block" style="width: 95%; margin-left: 2.5%;">
                        </span>
                    </div>
                    <div class="row">
                        <div class="input-group flex-nowrap my-2">
                            <span class="input-group-text" id="addon-wrapping">Kategorija</span>
                            <select class="form-select" aria-label="kategorija" id="department">
                                <option value="kuhinja" selected>Kuhinja</option>
                                <option value="delavnica">Delavnica</option>
                                <option value="vrt">Vrt</option>
                                <option value="multimedia">Multimedia</option>
                                <option value="prosti čas">Prosti Čas</option>
                                <option value="ostalo">Ostalo</option>
                            </select>
                        </div>
                    </div>
                    <div class="row px-2 mb-3">
                        <textarea id="description" class="summernote"></textarea>
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
                        <button type="button" sjs-click="addItem" class="btn btn-secondary d-block w-100">Vnesi predmet</button>
                    </div>
                </div>
            </div>
        </div>
    `
}


const vnesiComponent = new Component({
    name: 'Vnesi',
    container: '#content',
    messageContainer: '#message-container',
    markup: vnesiComponentMarkup,
    metaData: {
        itemUrl: `${API_BASE_URL}/api/v1/appliances/`,
        imageUrl: `${API_BASE_URL}/api/v1/appliances/images`
    },
    methods: {
        addItem,
        imageUpload
    },
    afterGenerate: {
        initSummernote
    },
    subcomponents: {
        previewImagesSubcomponent
    }
})

export default vnesiComponent;
