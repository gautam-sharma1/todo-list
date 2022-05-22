class Item {

    static order = 0;
    tagMap= {'1': 'Arrays', '2':'Dynamic Programming', '3':'Trees', '4':'Recursion'};

    constructor(id, name, url, tags, errorHandle,domElement) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.tags = tags;
        this.domElement = domElement;
        this.message = 'Please add a description.';
        this.tag_id = 1;
        this.addDropDown()
        this.initialize(errorHandle);
   
    }

    addDragStart() {
        this.domElement.addEventListener('dragstart', (event) => {
            console.log(event.target)
            console.log(event.target.id);
            event.dataTransfer.setData('text', event.target.id);
        });
    };

    addDropDown(){
        var tempDiv = document.createElement('span');
        this.domElement.appendChild(tempDiv);
 
        tempDiv.innerHTML = 
        '<label class="input-group-text" for="inputGroupSelect01">Problem Type</label>'+
        '<select class="form-select" id="inputGroupSelect01">'+
          '<option value="1">Arrays</option>'+
          '<option value="2">Dynamic Programming</option>'+
          '<option value="3">Trees</option>'+
          '<option value="4">Recursion</option>'+
        '</select>'
        
        tempDiv.lastChild.addEventListener('change', (event) =>{
            event.preventDefault();
            this.tag_id = event.target.value;
        })
 
    }

    addDragEnd() {
        this.domElement.addEventListener('dragend', (event) => {
            event.dataTransfer.clearData();
        });
    }

    appendChild(child){
        var tempDiv = document.createElement('span');
        tempDiv.className = child.tag_id;
        tempDiv.innerHTML = this.tagMap[this.tag_id];
        this.domElement.appendChild(tempDiv);
    }

    initialize(error) {
        const input = document.createElement("input");
        this.domElement.appendChild(input);
        const save_btn = document.createElement("button");
        save_btn.innerHTML = "Save";
        save_btn.addEventListener('click', () => {
            error.innerHTML = "";
            error.classList.remove("alert")
            error.classList.remove("alert-danger")
            if (input.value != "") {
                Item.order += 1;
                this.domElement.textContent = input.value;
                this.appendChild(this.tags.getTag());
            }
            else {
                error.classList.add("alert")
                error.classList.add("alert-danger")
                error.innerHTML = this.message;
            }
        });

        this.domElement.appendChild(save_btn);
    }
}


export { Item }