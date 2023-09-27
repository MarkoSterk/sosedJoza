import { parsePagination } from "../../utils/utilFuncs.js";

export async function getItems(){
    let url = this.metaData.applianceUrl + this.queryParams;
    await axios.get(url)
    .then(function(response){
        this.setData('pagination', parsePagination(response.data.data));
        this.setData('items', response.data.data.content)
    }.bind(this))
    .catch(function(error){
        console.log(error)
    }.bind(this))
}