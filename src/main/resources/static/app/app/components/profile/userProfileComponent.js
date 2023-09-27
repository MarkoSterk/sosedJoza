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
                            <button class="nav-link active" id="nav-podatki-tab" data-bs-toggle="tab" data-bs-target="#nav-podatki" type="button" role="tab" aria-controls="nav-podatki" aria-selected="true">Podatki</button>
                            <button class="nav-link" id="nav-geslo-tab" data-bs-toggle="tab" data-bs-target="#nav-geslo" type="button" role="tab" aria-controls="nav-geslo" aria-selected="false">Geslo</button>
                            <button class="nav-link" id="nav-moji-predmeti-tab" data-bs-toggle="tab" data-bs-target="#nav-moji-predmeti" type="button" role="tab" aria-controls="nav-moji-predmeti" aria-selected="false">Moji Predmeti</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-podatki" role="tabpanel" aria-labelledby="nav-podatki-tab"></div>
                        <div class="tab-pane fade" id="nav-geslo" role="tabpanel" aria-labelledby="nav-geslo-tab"></div>
                        <div class="tab-pane fade" id="nav-moji-predmeti" role="tabpanel" aria-labelledby="nav-moji-predmeti-tab">...</div>
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
    subcomponents: {
        changePasswordSubcomponent,
        profileDataSubcomponent,
        myAppliancesSubcomponent
    },
    beforeGenerate: {
        setQueryParams
    }
})

export default userProfileComponent;
