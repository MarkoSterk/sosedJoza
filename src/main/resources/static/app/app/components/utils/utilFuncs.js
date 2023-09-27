import "../../../../vendors/axios/axios.min.js"

export async function initSummernote(){
    $('.summernote').summernote({
        placeholder: 'Vnesite opis predmeta',
        tabsize: 2,
        height: 150,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['view', ['fullscreen', 'help']]
        ]
      });
}

export function getFormData(){
    const formData = {};
    formData['name'] = document.getElementById('name').value;
    formData['department'] = document.getElementById('department').value;
    formData['description'] = document.getElementById('description').value;
    formData['images'] =  this.getData('previews') || []
    return formData;
}

export async function addItem(btn, event, data){
    const formData = getFormData.bind(this)()
    removeErrors(['name', 'description'])
    await axios.post(this.metaData.itemUrl, formData)
    .then(function(response){
        location.hash = `predmet?id=${response.data.data.id}`
    }.bind(this)).catch(function(error){
        populateErrors.bind(this)(error.response.data)
    }.bind(this))
}

export async function updateItem(btn, event, data){
    const formData = getFormData.bind(this)()
    removeErrors(['name', 'description'])
    let queryParams = parseQueryParams(this.queryParams);
    await axios.patch(this.metaData.itemUrl+queryParams.id, formData)
    .then(function(response){
        location.hash = `predmet?id=${response.data.data.id}`
    }.bind(this)).catch(function(error){
        populateErrors.bind(this)(error.response.data)
    }.bind(this))
}

export function removeErrors(fields){
    for(let name of fields){
        const field = document.getElementById(`${name}-error`);
        field.classList.remove("bg-danger");
        field.innerHTML = '';
    }
}

export function populateErrors(error){
    for(const [name, msg] of Object.entries(error.detail.json)){
        const field = document.getElementById(`${name}-error`);
        field.classList.add("bg-danger");
        field.innerHTML = msg;
    }
}

export function removeArrayElement(array, value){
    return array.filter(function (elem) {
        return elem != value;
    });
}

export async function removeImage(btn, args, event, data){
    const currentData = this.data
    const newData = removeArrayElement(currentData, args)
    this.setData(this.dataField, newData)
}

export async function uploadImages(form){
    const imageNames = await axios.post(this.metaData.imageUrl, form)
    .then(function(response){
        return response.data.data
    }).catch(function(error){
        console.log(error)
    })
    return imageNames
}

export async function imageUpload(btn, args, event, data){
    const fileList = [...btn.files];
    const formData = new FormData();
    for(let file of fileList){
        formData.append('images', file)
        //formData.append(file.name, file)
    }
    const imageNames = await uploadImages.bind(this)(formData);
    this.setData('previews', imageNames)
}

export function parseQueryParams(string){
    var dict = {};
    if(string.startsWith("?")) string = string.substring(1)
    string.split("&").forEach(function(item) {dict[item.split("=")[0]] = item.split("=")[1]})
    return dict
}

export function stringifyQueryParams(dict){
    var array = [];
    for(let key of Object.keys(dict)){
        array.push(`${key}=${dict[key]}`);
    }
    return "?"+array.join("&");
}

export function parsePagination(data){
    let pagination = {};
    for(let key of Object.keys(data)){
        if(key != "content"){
            pagination[key] = data[key]
        }
    }
    return pagination;
}

export function getDate(datetimeString){
    let inputDate = new Date(datetimeString);
    let day = String(inputDate.getDate()).padStart(2,'0');
    let month = String(inputDate.getMonth()+1).padStart(2,'0');
    let year = inputDate.getFullYear();

    return `${day}. ${month}. ${year}`;
}

export async function loadUser(){
    await axios.get('/api/v1/users/current')
    .then(async function(response){
        await this.setData('user', response.data.data)
    }.bind(this)).catch(function(error){
        throw new Error('User could not be loaded!')
    }.bind(this))
}