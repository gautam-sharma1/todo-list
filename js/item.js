import {Code} from './code.js'

class Item {

    static order = 0;
    tagMap = { '1': 'Arrays', '2': 'Dynamic Programming', '3': 'Trees', '4': 'Recursion', '5': 'Two Pointer', '6': 'HashMap', '7': 'Graph' };
    static availableColumns = ["requested", "in-progress", "done"];
    static count = { "requested": 0, "in-progress": 0, "done": 0 };

    constructor(id, name, url, tags, errorHandle, domElement) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.tags = tags;
        this.domElement = domElement;
        this.message = 'Please add a description.';
        this.tag_id = 1;
        this.solution = " ";
        this.initialize(errorHandle);
        this.code_element = null;
        this.addEmptyDiv();
        this.addDropDown();
        this.addEmptyDiv();
        this.addUrlButton();
        this.addNotes();
        this.addDropDownCallback();
        this.addUrlButtonCallback();
        this.addDropDownCallback();
        this.addNotesCallback();

    }

    
    addCallbacks(){
        this.addDropDownCallback();
        this.addUrlButtonCallback();
        this.addDropDownCallback();
        this.addNotesCallback();
    }


    addDragStart() {
        this.domElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', event.target.id);
            event.dataTransfer.setData('parent', event.composedPath()[1].id);
        });
    };


    addNotes() {
        this.notesNode = document.createElement('div');
        this.domElement.appendChild(this.notesNode);
        this.notesNode.innerHTML =
            '<div class="mb-3">' +
            '<label for="exampleFormControlTextarea" class="form-label">Notes</label>' +
            '<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>' +
            '</div>';
        this.addNotesCallback();
    }
    
    addNotesCallback(){
        this.notesNode.lastChild.addEventListener('change', (event) => {
            event.preventDefault();
            this.notes = event.target.value;
        })
    }


    addDropDown() {
        this.dropDown = document.createElement('div');
        this.domElement.appendChild(this.dropDown);

        this.dropDown.innerHTML =
            '<span><label for="basic-url" class="form-label">Problem Type</label>' +
            '<select class="form-select" id="inputGroupSelect01">' +
            '<option value="1">Arrays</option>' +
            '<option value="2">Dynamic Programming</option>' +
            '<option value="3">Trees</option>' +
            '<option value="4">Recursion</option>' +
            '<option value="5">Two Pointer</option>' +
            '<option value="6">HashMap</option>' +
            '<option value="7">Graph</option>' +
            '</select></span>'
    }

    addDropDownCallback(){
            this.dropDown.lastChild.addEventListener('change', (event) => {
            event.preventDefault();
            // sets the tag_id
            this.tag_id = event.target.value;
            localStorage.dom = document.body.innerHTML;
        })
    }

    addEmptyDiv() {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = '<br>'
        this.domElement.appendChild(tempDiv);
    }

    addDragEnd() {
        this.domElement.addEventListener('dragend', (event) => {
            event.dataTransfer.clearData();
            localStorage.dom = document.body.innerHTML;
        });
    }

    addLineBreak(){
        var tempDiv = document.createElement('br');
        this.domElement.appendChild(tempDiv);

    }

    appendChild(child) {
        var tempDiv = document.createElement('span');
        tempDiv.className = child.tag_id;
        // sets the tag value
        tempDiv.innerHTML = this.tagMap[this.tag_id];
        this.domElement.appendChild(tempDiv);
    }

    addTextArea(text, domElement = this.domElement) {
        var tempDiv = document.createElement('div');
        domElement.appendChild(tempDiv);
        tempDiv.innerText = text;
    }

    addUrlButton() {
        this.urlButton = document.createElement('div');
        this.domElement.appendChild(this.urlButton );

        this.urlButton .innerHTML =
            '<label for="basic-url" class="form-label">Problem URL</label>' +
            '<div class="input-group mb-3">' +
            '<input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">' +
            '</div>'

    }

    addUrlButtonCallback(){
        this.urlButton .addEventListener('change', (event) => {
            this.url = event.target.value
            localStorage.dom = document.body.innerHTML;
        })

    }

    addSolutionButton(solution = this.solution) {
        var solutionButton = document.createElement('div');
        this.domElement.appendChild(solutionButton);

        solutionButton.innerHTML =
            '<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target='+
            '#solutionNumber'+ this.id + " "+
             'aria-expanded="false" aria-controls="collapseExample">' +
            'Toggle Solution' +
            '</button>' +
            '<br>' + '<br>'
        
        // Area to display solution
        var solutionDisplay = document.createElement('div');
        this.domElement.appendChild(solutionDisplay);

        solutionDisplay.classList.add('collapse')
        solutionDisplay.setAttribute('id', 'solutionNumber'+ String(this.id));
        
        solutionDisplay.innerHTML =
            '<div class="card card-body">' +
            + solution +
            '</div>' 

        
        // Area to edit solution
        var solutionEdit = document.createElement('div');
        solutionDisplay.appendChild(solutionEdit);
        solutionEdit.innerHTML =
            '<div class="mb-3">' +
            '<label for="exampleFormControlTextarea" class="form-label"></label>' +
            '<textarea class="form-control" id='+ "textarea"+String(this.id)+" "+ 
            'rows="3"></textarea>' +
            '</div>';
            
            solutionEdit.lastChild.addEventListener('change', (event) => {
            event.preventDefault();
            this.solution = event.target.value;
            this.code_element = new Code(solutionDisplay.firstChild,this.solution);
            localStorage.dom = document.body.innerHTML;
                        
        })

    
    }


    addHref(text) {
        var aTag = document.createElement('a');
        aTag.setAttribute('href', this.url);
        aTag.innerText = text;
        this.domElement.appendChild(aTag);
    }


    initialize(error) {
        
        const input = document.createElement("input");
        this.domElement.appendChild(input);
        //const save_btn = this.addItemCollapseUsingSaveButton();
        const save_btn = document.createElement("button");
        save_btn.innerHTML = "Save";
        this.domElement.appendChild(save_btn);
        save_btn.addEventListener('click', () => {
            error.innerHTML = "";
            error.classList.remove("alert")
            error.classList.remove("alert-danger")
            if (input.value != "") {
                Item.order += 1;
                this.domElement.innerText = "";
                this.addHref(input.value);
                this.appendChild(this.tags.getTag());
                this.addTextArea(this.notes);
                this.addSolutionButton(this.solution);
            }
            else {
                error.classList.add("alert")
                error.classList.add("alert-danger")
                error.innerHTML = this.message;
            }
        });

    }

}

export { Item }