import Component from "../../../simpleJS/Component.js";
import genericCategoryComponent from "./childcomponents/genericCategoryComponent/genericCategoryComponent.js";

async function departmentsMarkup(){
    return `
        <div id="category"></div>
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