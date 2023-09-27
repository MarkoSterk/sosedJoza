import Component from "../../../simpleJS/Component.js"

async function indexMarkup(){
    return `
        <div class="row">
            <div class="col-11 col-sm-10 col-md-8 col-lg-8 mx-auto">
                <img class="mx-auto d-block" width="300" src="images/sosed_joza_logo.png" alt="Logo of Sosed Joza">
            </div>
        </div>
        <div class="row">
            <div class="col-11 col-md-9 col-lg-8 mx-auto">
                <h4 class="text-center">
                    Pozabite na nakupovanje, pozdravite souporabo s svojimi znanci! 
                    Predstavljamo vam 'Sosed Joža' - inovativno aplikacijo za izposojo predmetov med znanci! 
                    Ali se vam je že kdaj zgodilo, da ste potrebovali določen predmet, a ga niste želeli kupiti 
                    samo za enkratno uporabo? No, s 'Sosed Joža' ni več potrebe po nakupu nepotrebnih stvari!
                </h4>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-11 col-md-9 col-lg-6 mx-auto">
                <div class="row text-center">
                    <div class="col-5 mx-auto">
                        <a class="btn btn-secondary btn-lg d-block w-100">
                            <i class="fa-solid fa-person-praying fa-xl"></i> izposoja
                        </a>
                    </div>

                    <div class="col-5 mx-auto">
                        <a href="#vnesi" class="btn btn-secondary btn-lg d-block w-100">
                            <i class="fa-solid fa-hammer fa-xl"></i> vnesi
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
}



const indexComponent = new Component({
    name: 'Index',
    container: '#content',
    messageContainer: '#message-container',
    markup: indexMarkup
})

export default indexComponent