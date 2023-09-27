import Component from "../../../simpleJS/Component.js";

//Kuhinja, Delavnica, Vrt, Multimedia, Prosti čas, Ostalo

async function menuMarkup(){
    return `
    <div class="row">
        <div class="col-1 d-flex justify-content-center">
            <div id="side-menu" class="sidenav">
                <a href="#index"><i class="fa-solid fa-flag-checkered"></i> Začetna stran</a>
                <a style="color: #818181"><i class="fa-solid fa-layer-group"></i> področja</a>
                <a href="#" class="ms-5"><i class="fa-solid fa-kitchen-set"></i> kuhinja</a>
                <a href="#" class="ms-5"><i class="fa-solid fa-screwdriver-wrench"></i> delavnica</a>
                <a href="#" class="ms-5"><i class="fa-solid fa-seedling"></i> vrt</a>
                <a href="#" class="ms-5"><i class="fa-solid fa-computer"></i> multimedia</a>
                <a href="#" class="ms-5"><i class="fa-solid fa-person-biking"></i> prosti čas</a>
                <a href="#" class="ms-5"><i class="fa-solid fa-shuffle"></i> ostalo</a>
                <br>
                <a href="#"><i class="fa-solid fa-person-praying"></i> izposoja</a>
                <a href="#vnesi"><i class="fa-solid fa-hammer"></i> vnesi</a>
                <br>
                <a href="#profil"><i class="fa-solid fa-user"></i> Profil</a>
                <br>
                <a href="/logout" style="color: red"><i class="fa-solid fa-person-through-window"></i> odjava</a>
            </div>
        </div>
    </div>
    <!--Navbar-->
    <nav class="navbar">
        <!-- Collapse button -->
        <button class="navbar-toggler hamburger-button" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation" sjs-click="Nav" style="z-index: 2">
            <div class="animated-icon"><span></span><span></span><span></span></div>
        </button>
        <!-- Navbar brand -->
    </nav>
    `
}

function Nav() {
    var width = document.getElementById("side-menu").style.width;
    if (width === "0px" || width == "") {
      document.getElementById("side-menu").style.width = "250px";
      document.querySelector('.animated-icon').classList.toggle('open');
    }
    else {
      document.getElementById("side-menu").style.width = "0px";
      document.querySelector('.animated-icon').classList.toggle('open');
    }
    document.activeElement.blur();
  }


const menuComponent = new Component({
    name: 'Menu',
    container: '#menu',
    messageContainer: '#message-container',
    markup: menuMarkup,
    methods: {
        Nav
    }
})

export default menuComponent;
