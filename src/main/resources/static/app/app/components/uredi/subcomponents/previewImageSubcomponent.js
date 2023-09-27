import Component from "../../../../simpleJS/Component.js";
import {removeImage} from "../../utils/utilFuncs.js";

async function previewImagesMarkup(){
    function createSinglePreview(filename){
        return `
            <div class="col-3">
                <img src="/uploads/${filename}" class="img-fluid">
                <button type="button" class="btn btn-sm rounded-0 btn-danger d-block w-100" sjs-click="removeImage" sjs-click-args="${filename}">
                    <i class="fa-solid fa-trash"></i> Odstrani sliko
                </button>
            </div>
        `
    }
    let imagePreviews = ''
    if(this.data){
        for(let name of this.data){
            imagePreviews+=createSinglePreview(name)
        }
    }
    return imagePreviews
}

const previewImagesSubcomponent = new Component({
    name: 'Image preview',
    container: '#imagesPreview',
    dataField: 'previews',
    markup: previewImagesMarkup,
    methods: {
        removeImage
    }
})

export default previewImagesSubcomponent;
