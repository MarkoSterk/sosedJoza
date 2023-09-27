import Component from "../../../simpleJS/Component.js";
import changePasswordSubcomponent from "./subcomponents/changePasswordSubcomponent.js";
import profileDataSubcomponent from "./subcomponents/profileDataSubcomponent.js";
import myAppliancesSubcomponent from "./subcomponents/myAppliancesSubcomponent.js";
import { API_BASE_URL } from "../../../configurations.js";

async function userProfileComponentMarkup(){
    return `
        <div class="row bg-light">
            <div class="col-11 col-sm-11 col-md-11 col-lg-9 mx-auto my-5">
                <div class="card shadow-5-strong p-4">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="btn nav-link" role="button" href="#profil/podatki">Podatki</a>
                            <a class="btn nav-link" role="button" href="#profil/geslo">Geslo</a>
                            <button class="nav-link" id="nav-moji-predmeti-tab" data-bs-toggle="tab" data-bs-target="#nav-moji-predmeti" type="button" role="tab" aria-controls="nav-moji-predmeti" aria-selected="false">Moji Predmeti</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div id="tab-content"></div>
                    </div>
                </div>
            </div>
        </div>
        `
}

function setQueryParams(){
    let user = this.getData('user');
    let params = `?userId=${user.id}&rating=0&orderBy=-createdAt&page=0&perPage=10`;
    this.setQueryParams(params);
}

const userProfileComponent = new Component({
    name: 'User profile',
    container: '#content',
    messageContainer: '#message-container',
    markup: userProfileComponentMarkup,
    childcomponents: {
        changePasswordSubcomponent,
        profileDataSubcomponent,
        myAppliancesSubcomponent
    },
    beforeGenerate: {
        setQueryParams
    }
})

export default userProfileComponent;
