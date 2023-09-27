class App{
    /**
   * Main App class.
   * @param {String} name Name of the app
   */
    name;
    staticComponents;
    components;
    index;
    _data;
    _queryParams;
    _persistData;
    _dataMapping = {};
    beforeStart = {};
    _activeComponents = [];
    _registeredPaths = [];

    constructor(configs){
        this.name = configs.name
        this._data = configs.data
        this._persistData = configs.persistData
        this.initData = configs.initData
        for(let dataField in this._data){
            this._dataMapping[dataField] = [];
        }
        this.beforeStart = configs.beforeStart;
    }

    addStaticComponents(components){
        /**
         * Adds static components to the App.
         * @param  {Object} components  All static app components that don't change (banner, menu, header, footer etc.)
         */
        this.staticComponents = components
        for(let component in this.staticComponents){
            this.staticComponents[component]._registerApp(this);
        }
    }

    function getAllPathSequences(data, parentPath = "") {
      const pathSequences = [];

      for (const key in data) {
        const currentPath = parentPath ? `${parentPath}/${key}` : key;
        if (data[key].component !== null) {
          pathSequences.push(currentPath);
        }

        if (data[key].children) {
          const childPathSequences = getAllPathSequences(data[key].children, currentPath);
          pathSequences.push(...childPathSequences);
        }
      }

      return pathSequences;
    }

    async addPaths(components){
        /**
         * Adds top-level components to the App.
         * @param  {Object} components  Object with app components. If used with router the keys of the object refer to the hash address
         */
        this.components = components
        for(let component in this.components){
            this.components[component]._registerApp(this);
        }

        this._registeredPaths = this.getAllPathSequences(components);
        console.log(this._registeredPaths);
    }

    setQueryParams(params){
        this._queryParams = params;
    }

    getQueryParams(){
        return this._queryParams;
    }

    async setData(dataField, data){
        if(dataField in this._data){
            this._data[dataField] = data;
            for(let component of this._dataMapping[dataField]){
                await component._reloadData(data);
            }
            return true;
        }
        else throw new Error(`"${field}" is not a valid data field`)
    }

    getData(dataField){
        if(dataField in this._data){
            return this._data[dataField]
        }
        throw new Error(`${dataField} is not a valid data field!`)
    }

    setIndex(index){
        /**
         * Sets default/index component of app.
         * @param {String} index String name or hash of the index component
         */
        this.index = index
    }

    async start(route){
        /**
         * Starts the app and loads first/index component. Defaults to the index component if set, otherwise loads first component in components.
         * @param {String} route String name or hash of the start component
         */
        for(let method in this.beforeStart){
            await this.beforeStart[method].bind(this)()
        }
        for(let component in this.staticComponents){
            await this.staticComponents[component].generateComponent();
        }
        if(route && route in this.components){
            await this.components[route].generateComponent()
            return route;
        }
        else if(this.index){
            await this.components[this.index].generateComponent();
            return this.index;
        }
        else{
            route = Object.keys(this.components)[0]
            await this.components[route].generateComponent();
            return route;
        }
    }
}

export default App;
