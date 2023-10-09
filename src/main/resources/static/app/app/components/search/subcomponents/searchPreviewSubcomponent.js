import Component from "../../../../simpleJS/Component.js";

async function searchPreviewMarkup(){
    const data = this.data?.content;
    if(!data) return ``;

    function populateResults(res){
        return `
            <li class="my-1">
                <a class="searchResult text-decoration-none text-reset" href="#predmet?id=${res.id}">
                    [${res.department.toUpperCase()}] ${res.name} (${res.owner.firstname} ${res.owner.lastname})
                </a>
            </li>
        `
    }
    const results = data.map(populateResults).join("");
    return `
        <ul class="list-unstyled border border-secondary p-1 rounded">
            ${results.length==0 ? 'Iskanje ni vrnilo rezultatov...' : ''}
            ${results}
        </ul>
    `
}


const searchPreviewSubcomponent = new Component({
    name: "Search preview",
    container: "#search-preview",
    dataField: "searchPreview",
    messageContainer: "#message-container",
    markup: searchPreviewMarkup
})

export default searchPreviewSubcomponent;