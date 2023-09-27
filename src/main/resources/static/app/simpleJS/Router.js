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
        this.app._router = this;
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

    _findPathDifference(currentPath, newPath) {
        const currentParts = currentPath.split("/");
        const newParts = newPath.split("/");
        const minLength = Math.min(currentParts.length, newParts.length);
        let diffIndex = -1;

        for (let i = 0; i < minLength; i++) {
            if (currentParts[i] !== newParts[i]) {
                diffIndex = i;
                break;
            }
        }

        if (diffIndex === -1) return null;

        const commonPart = currentParts.slice(0, diffIndex);
        const difference1 = currentParts.slice(diffIndex);
        const difference2 = newParts.slice(diffIndex);

        return {
              commonPart: commonPart,
              difference1: difference1 || undefined,
              difference2: difference2 || undefined
        };
    }

    _onUrlChange(event){
        const routePath = this._getRouteAndQueryParams();
        if(this.paths.includes(routePath)){
            this._changeView(routePath);
        }
        else{
            this._unknownView();
        }
    }

    _getPathComponents(data, path) {
        const pathParts = path.split('/');
        let currentNode = data;
        const pathComponents = [];

        for (const part of pathParts) {
            if (currentNode && currentNode[part]) {
                pathComponents.push(currentNode[part].component);
                currentNode = currentNode[part].children;
            } else {
                pathComponents.push(null);
                break;
            }
        }
        return pathComponents;
    }

    zip(...arrays){
        const length = Math.min(...arrays.map(arr => arr.length));
        return Array.from({ length }, (_,i) => arrays.map(arr => arr[i]));
    }

    async _deconstructPathComponents(pathDiff){
        const currentComponents = this._getPathComponents(this.app.components,
                                                          this.currentView)
                                                          .reverse();
        let parts = this.currentView.split('/').reverse();
        for(const pathComponent in this.zip(parts, currentComponents)){
            if(!pathDiff.includes(pathComponent[0])){
                if(pathComponent[1]) await pathComponent[1].deconstructComponent();
            }
            else {
                break;
            }
        }

    }

    async _constructPathComponents(path, pathDiff){
        let pathComponents = this._getPathComponents(this.app.components, path);
        let parts = path.split('/');
        for(let pathComponent of this.zip(parts, pathComponents)){
            if(!pathDiff.commonPart.includes(pathComponent[0])){
                if(pathComponent[1]) await pathComponent[1].generateComponent();
            }
        }
    }

    async _changeView(routePath) {
        let pathDiff = this._findPathDifference(this.currentView, routePath);
        if(pathDiff){
            if(!this.unknownViewActive){
                await this._deconstructPathComponents(pathDiff.commonPart);
            }
            else{
                await this._deconstructPathComponents([]);
                await this.unknownView.deconstructComponent();
                this.unknownViewActive = false;
            }
            this._constructPathComponents(routePath, pathDiff);
            this.currentView = routePath;
        }
    }

    async _unknownView() {
        await this._deconstructPathComponents([]);
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