import Component from "../../../simpleJS/Component.js";
import profileDataComponent from "./childcomponents/profileDataComponent.js";
import changePasswordComponent from "./childcomponents/changePasswordComponent.js";
import myAppliancesComponent from "./childcomponents/myAppliancesComponent.js";
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
                            <a class="btn nav-link" role="button" href="#profil/predmeti">Moji Predmeti</a>
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

const userProfileComponent = new Component({
    name: 'User profile',
    container: '#content',
    messageContainer: '#message-container',
    markup: userProfileComponentMarkup,
    childcomponents: {
        profileDataComponent,
        changePasswordComponent,
        myAppliancesComponent
    }
})

export default userProfileComponent;
