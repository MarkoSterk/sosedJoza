import Component from "../../../../simpleJS/Component.js";
import { API_BASE_URL } from "../../../../configurations.js";

async function profileDataMarkup(){
    let user = this.data;
    return `
    <form id="profileDataForm" class="mt-2">
        <div class="row">
            <div class="col-12 col-sm-8 col-md-9 col-lg-9">
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" for="firstname">Ime</span>
                    <input name="firstname" type="text" id="firstname" class="form-control" value="${user.firstname}" aria-label="firstname" aria-describedby="addon-wrapping">
                    <span class="input-group-text" for="lastname">Priimek</span>
                    <input name="lastname" id="lastname" type="text" class="form-control" value="${user.lastname}" aria-label="lastname" aria-describedby="addon-wrapping">
                </div>

                <div class="input-group flex-nowrap my-3">
                    <span class="input-group-text" id="email">@</span>
                    <input disabled name="email" type="text" class="form-control" placeholder="${user.email}" aria-label="email" aria-describedby="addon-wrapping">
                    <span class="input-group-text" id="role">Vloga</span>
                    <input disabled name="role" type="text" class="form-control" placeholder="${user.role}" aria-label="role" aria-describedby="addon-wrapping">
                </div>

                <div class="input-group mb-3">
                    <label class="input-group-text" for="image">Profilna slika</label>
                    <input sjs-change="uploadProfileImage" type="file" class="form-control" id="image">
                </div>
            </div>
            <div class="col-12 col-sm-4 col-md-3 col-lg-3">
                <img width="150" class="img-fluid img-thumbnail d-block mx-auto" src="${API_BASE_URL}/uploads/${user.image}" alt="Profilna slika uporabnika">
            </div>
        </div>

        <button type="button" sjs-click="updateProfileInfo" class="btn btn-secondary d-block mt-3 mb-2 w-100">
            Spremeni
        </button>
    </form>
    `
}

async function updateProfileInfo(btn, appData){
    const data = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value
    }
    await axios.patch(`${this.metaData.userUrl}/${this.data.id}`, data)
    .then(function(response){
        this.setMessage(response.data.message,
                        response.data.status);
        this.setData(this.dataField, response.data.data)
    }.bind(this)).catch(function(error){
        this.setMessage(error.response.data.message,
        error.response.data.status);
    }.bind(this))
}

async function uploadProfileImage(){
    const formData = new FormData()
    const file = document.getElementById('image').files[0]
    formData.append('image', file)
    let url = `${this.metaData.userUrl}/${this.data.id}/image`
    await axios.patch(url, formData)
    .then(function(response){
        this.setData(this.dataField, response.data.data);
        this.setMessage(response.data.message, response.data.status);
    }.bind(this)).catch(function(error){
        this.setMessage(error.response.data.message,
        error.response.data.status);
    }.bind(this))
}

const profileDataComponent = new Component({
    name: 'Profile data',
    container: '#tab-content',
    messageContainer: '#message-container',
    dataField: 'user',
    markup: profileDataMarkup,
    metaData: {
        userUrl: `${API_BASE_URL}/api/v1/users`
    },
    methods: {
        uploadProfileImage,
        updateProfileInfo
    }
})

export default profileDataComponent;