import Component from "../../../simpleJS/Component.js";
import searchPreviewSubcomponent from "./subcomponents/searchPreviewSubcomponent.js";
import { API_BASE_URL } from "../../../configurations.js";

async function searchMarkup(){
    return `
       <input name="search" sjs-input="search" sjs-focusout="clearSearchPreview" type="text" class="form-control" placeholder="Išči po predmetih...">
       <div class="bg-white my-1" style="z-index: 5;" id="search-preview">
       </div>
    `
}

async function search(elem, event, appData){
    if(event.target.value.length<3) return;
    const name = event.target.value;
    const url = `${this.metaData.searchUrl}?name=${name}`;
    await axios.get(url)
    .then(function(response){
        this.setData("searchPreview", response.data.data);
    }.bind(this)).catch(function(error){
        console.log(error);
    }.bind(this))
}

async function clearSearchPreview(elem, event, appData){
    if(event.relatedTarget?.classList.contains("searchResult")){
        event.relatedTarget.click();
    }
    event.target.value="";
    this.setData("searchPreview", null);
}


const searchComponent = new Component({
    name: 'Search component',
    container: '#search',
    messageContainer: '#message-container',
    markup: searchMarkup,
    metaData: {
        searchUrl: `${API_BASE_URL}/api/v1/appliances/search`
    },
    methods: {
        search,
        clearSearchPreview
    },
    subcomponents: {
        searchPreviewSubcomponent
    }
})

export default searchComponent;