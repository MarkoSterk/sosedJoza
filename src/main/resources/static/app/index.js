import Router from './simpleJS/Router.js';
import unknownComponent from './app/components/unknown/unknownComponent.js';
import app from './app/init.js';

async function init(){
    const router = new Router(app);
    router.unknownViewComponent(unknownComponent)
    await router.start();
}

await init();