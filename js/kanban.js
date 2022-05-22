import {Item} from './item.js'
import {Button} from './button.js'
import {Tags} from './tags.js'

let order = 1;
let adding = false;

const error = document.querySelector('.error');
const message = 'Please add a description.';
const messageItemOnItem = 'Cannot drop one item onto another';

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => {
  const target = document.querySelector('#requested');
     target.appendChild(create_item());
});

const email_btn = new Button('email','Send Email!');

const create_item = () => {
  
  const item =  document.createElement("div");
  item.classList.add("item");
  item.id = "item-" + String(Item.order);
  item.draggable = "true";
  const tag = new Tags('hello');
  const itemObj = new Item(1,"hello","",tag, error,item);
  itemObj.addDragStart();
  itemObj.addDragEnd();
  
  return item;
};


// TODO add to a module
document.querySelectorAll('.drop').forEach(item => {
    item.addEventListener('drop', (event) => {
    event.preventDefault();
    const id  = event.dataTransfer.getData('text');
    const element = document.getElementById(id);
    error.innerHTML = "";
    // clean this up -> make new function
    // elemnt is an item
    if(item.id == "done"){
      Item.count['done'] += 1;
      element.classList.add("doneItem");
      if (element.classList.contains("inProgress")){
        Item.count['in-progress'] -= 1;
        element.classList.remove("inProgress");
      }
    }
    else if(item.id == "in-progress"){
      Item.count['in-progress'] += 1;
      element.classList.add("inProgress");
      if (element.classList.contains("doneItem")){
        Item.count['done'] -= 1;
        element.classList.remove("doneItem");
      }
    }
    else if(item != "done" && element.classList.contains("doneItem")){
      Item.count['done'] -= 1;
      element.classList.remove("doneItem");
    }
    else if(item != "in-progress" && element.classList.contains("inProgress")){
      Item.count['in-progress'] -= 1;
      element.classList.remove("inProgress");
    }
    console.log(Item.count);
    const availableColumns = ["requested", "in-progress", "done"];

    if(availableColumns.includes(event.target.id)){
      element.current_column = event.target.id;
      event.target.appendChild(element);
    }
    else{
      error.innerHTML = messageItemOnItem;
    }

})
  item.addEventListener('dragover', (event) => {

    event.preventDefault();
  })

}


);
  