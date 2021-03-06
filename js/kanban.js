import {Item} from './item.js'
import {Tags} from './tags.js'


const error = document.querySelector('.error');
const availableColumns = ["requested", "in-progress", "done"];
const messageItemOnItem = 'Cannot drop one item onto another';

const allItems = [];

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => {
  const target = document.querySelector('#requested');
     const {item, itemObj} = create_item();
     allItems.push(itemObj);
     target.appendChild(item);
     localStorage.dom = document.body.innerHTML;
     localStorage.allItems = JSON.stringify(allItems);
     
});



const create_item = () => {
  
  const item =  document.createElement("div");
  item.classList.add("item");
  item.id = "item-" + String(Item.order);
  item.draggable = "true";
  const tag = new Tags('Initialize');
  const itemObj = new Item(Item.order,"hello","",tag, error,item);
  Item.count['requested'] += 1;
  itemObj.addDragStart();
  itemObj.addDragEnd();
  
  return {item, itemObj};
};


addDropCallbacks();

function addDropCallbacks(){
// TODO add to a module
document.querySelectorAll('.drop').forEach(item => {
    item.addEventListener('drop', (event) => {
    event.preventDefault();
    const id  = event.dataTransfer.getData('text');
    const element = document.getElementById(id);
    error.innerHTML = "";

    // TODO error handler
    const srcID = event.dataTransfer.getData('parent');

    if(availableColumns.includes(event.target.id)){
      if(srcID !== event.target.id){
        if(Item.count[srcID] != 0){
          Item.count[srcID]--;
        }        
        Item.count[event.target.id]++;
      }

    }
    else{
      error.innerHTML = messageItemOnItem;
      return;
    }



    if(item.id == "done"){
      element.classList.add("doneItem");
      if (element.classList.contains("inProgress")){
        element.classList.remove("inProgress");
      }
    }
    else if(item.id == "in-progress"){
      element.classList.add("inProgress");
      if (element.classList.contains("doneItem")){
        element.classList.remove("doneItem");
      }
    }
    else if(item != "done" && element.classList.contains("doneItem")){
      element.classList.remove("doneItem");
    }
    else if(item != "in-progress" && element.classList.contains("inProgress")){
      element.classList.remove("inProgress");
    }

    if(availableColumns.includes(event.target.id)){
      element.current_column = event.target.id;
      event.target.appendChild(element);
    }
    else{
      error.innerHTML = messageItemOnItem;
    }

    availableColumns.forEach(cols => {
      document.getElementById(cols+"-bar").style.width = String((Item.count[cols] / allItems.length) * 100)+"%";
    })

    localStorage.dom = document.body.innerHTML;
    localStorage.itemCount = JSON.stringify(Item.count);
    localStorage.allItems = JSON.stringify(allItems);

});




  item.addEventListener('dragover', (event) => {

    event.preventDefault();
  })


}

)};
  