import Component from "../../../../simpleJS/Component.js";
import { API_BASE_URL } from "../../../../configurations.js";

async function changePasswordMarkup(){
  return `
      <form id="changePasswordForm" class="mt-2">
          <div class="row">
              <div class="col-12">
                     <div class="input-group mb-3">
                         <label class="input-group-text" for="image">Trenutno geslo</label>
                         <input type="password" class="form-control" id="currentPassword">
                     </div>

                     <div class="input-group mb-3">
                        <label class="input-group-text" for="image">Novo geslo</label>
                        <input type="password" class="form-control" id="password">
                    </div>

                    <div class="input-group mb-3">
                        <label class="input-group-text" for="image">Potrdi geslo</label>
                        <input type="password" class="form-control" id="confirmPassword">
                    </div>
              </div>

          </div>

          <button type="button" sjs-click="changePassword" class="btn btn-secondary d-block mt-3 mb-2 w-100">
              Spremeni geslo
          </button>
      </form>
  `
}

async function changePassword(){
    const formData = {
        currentPassword: document.getElementById('currentPassword').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
      };
    let url = `${this.metaData.userUrl}/${this.data.id}/password`;
    await axios.patch(url, formData)
    .then(function(response){
        this.setMessage(response.data.message, response.data.status);
        document.getElementById('changePasswordForm').reset();
    }.bind(this)).catch(function(error){
        this.setMessage(error.response.data.message,
        error.response.data.status);
    }.bind(this))
}

const changePasswordSubcomponent = new Component({
    name: 'Change password',
    container: '#tab-content',
    messageContainer: '#message-container',
    dataField: 'user',
    markup: changePasswordMarkup,
    metaData: {
        userUrl: `${API_BASE_URL}/api/v1/users`
    },
    methods: {
        changePassword
    }
})

export default changePasswordSubcomponent;