class Router {
        /**
   * Main Router class. Listenes and handles routing of the app via a hashchange event listener.
   * @param {Object} app instance of the App class
   */
    app;
    currentView;
    unknownView;
    unknownViewActive;

    constructor(app) {
        //window.addEventListener('hashchange', this._onHashChange.bind(this))
        this.app = app
        window.addEventListener('popstate', this._onUrlChange.bind(this))
    }

    _getRouteAndQueryParams(){
        let currentUrl = window.location.href;
        let hashAndQueryParams = [this.app.index];
        if(currentUrl.includes('#')) hashAndQueryParams = currentUrl.split('#')[1].split('?');
        const hashPath = hashAndQueryParams[0];
        let queryParams = hashAndQueryParams[1] ? `?${hashAndQueryParams[1]}` : null;
        this.app.setQueryParams(queryParams);
        return hashPath;
    }

    _onUrlChange(event){
        const routePath = this._getRouteAndQueryParams();
        if(routePath in this.app.components){
            this._changeView(routePath);
        }
        else{
            this._unknownView();
        }
    }

    async _changeView(routePath) {
        if(!this.unknownViewActive){
            await this.app.components[this.currentView].deconstructComponent();
        }
        else{
            await this.unknownView.deconstructComponent();
            this.unknownViewActive = false;
        }
        await this.app.components[routePath].generateComponent();
        this.currentView = routePath;
    }

    async _unknownView() {
        await this.app.components[this.currentView].deconstructComponent();
        await this.unknownView.generateComponent();
        this.unknownViewActive = true;
    }

    unknownViewComponent(component){
        this.unknownView = component;
    }

    get paths(){
        return this.app._registeredPaths;
    }

    async start(){
        /**
         * Starts the app
         */
        const route = this._getRouteAndQueryParams();
        this.currentView = await this.app.start(route);
    }
}

export default Router;