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
        if(routePath in this.paths){
            this._changeView(routePath);
        }
        else{
            this._unknownView();
        }
    }

    async _deconstructPathComponents(pathDiff){
        for(let part of this.currentView.split('/').reverse()){
            if(!pathDiff.commonPart.includes(part)){
                if(this.app.components[part].component){
                    await this.app.components[part].component.deconstructComponent();
                }
            }
        }
    }

    async _changeView(routePath) {
        let pathDiff = this._findPathDifference(currentView, routePath);
        if(routeDiff){
            if(!this.unknownViewActive){
                await this._deconstructPathComponents(pathDiff)
            }
            else{
                await this._deconstructPathComponents([]);
                await this.unknownView.deconstructComponent();
                this.unknownViewActive = false;
            }
            for(let part of routePath.split('/')){
                if(!pathDiff.commonPart.includes(part)){
                    if(this.app.components[part].component){
                        await this.app.components[part].component.generateComponent();
                    }
                }
            }
            this.currentView = routePath;
        }
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