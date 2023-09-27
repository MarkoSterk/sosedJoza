import Component from "../../../../simpleJS/Component.js";
import { parseQueryParams } from "../../utils/utilFuncs.js";
import { API_BASE_URL } from "../../../../configurations.js";


async function itemRatingSubcomponentMarkup(){
    if(this.data){
        let selected = parseInt(Math.round(this.data.rating));
        let numberOfRatings = parseInt(this.data.numberOfRatings);

        return `
            <div class="stars text-end">
                <input ${selected==5 ? `checked` : ''} class="star star-5" id="star-5" type="radio" name="star"/>
                <label sjs-click="rateItem" sjs-click-args="5" class="star star-5" for="star-5"></label>
                <input ${selected==4 ? `checked` : ''} class="star star-4" id="star-4" type="radio" name="star"/>
                <label sjs-click="rateItem" sjs-click-args="4" class="star star-4" for="star-4"></label>
                <input ${selected==3 ? `checked` : ''} class="star star-3" id="star-3" type="radio" name="star"/>
                <label sjs-click="rateItem" sjs-click-args="3" class="star star-3" for="star-3"></label>
                <input ${selected==2 ? `checked` : ''} class="star star-2" id="star-2" type="radio" name="star"/>
                <label sjs-click="rateItem" sjs-click-args="2" class="star star-2" for="star-2"></label>
                <input ${selected==1 ? `checked` : ''} class="star star-1" id="star-1" type="radio" name="star"/>
                <label sjs-click="rateItem" sjs-click-args="1" class="star star-1" for="star-1"></label>
                <span class="text-secondary">${numberOfRatings}</span>
            </div>
        `
    }
    return '';
    
}

async function rateItem(btn, args, event, data){
    const queryParams = parseQueryParams(this.queryParams);
    await axios.post(`${this.metaData.url}/${queryParams.id}`,
    {rating: parseFloat(args)})
    .then(function(response){
        this.setData(this.dataField, {
             rating: response.data.data.rating,
             numberOfRatings: response.data.data.numberOfRatings
         });
    }.bind(this)).catch(function(error){
        this.setMessage(error.response.data.message, 'danger')
        this.forceReload();
    }.bind(this))
}

const itemRatingSubcomponent = new Component({
    name: 'Item rating',
    container: '#item-rating',
    messageContainer: '#message-container',
    markup: itemRatingSubcomponentMarkup,
    dataField: 'itemRating',
    metaData: {
        url: `${API_BASE_URL}/api/v1/appliances/rating`
    },
    methods: {
        rateItem
    },
    afterDeactive: {
        function() {this.setData('itemRating', null)}
    }
})

export default itemRatingSubcomponent;
