import Component from "../../../simpleJS/Component.js";
import genericCategoryComponent from "./genericCategoryComponent.js";

async function departmentsMarkup(){
    return `
        <div id="items"></div>
    `
}

const departmentsComponent = new Component({
    name: "Departments",
    markup: departmentsMarkup,
    container: "#content",
    childcomponents: {
        genericCategoryComponent
    }
});

export default departmentsComponent;