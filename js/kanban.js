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
  //if (adding == false) {
     //adding = true;
     target.appendChild(create_item());
  
//}
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

  console.log(tag);
  
  return item;
};



document.querySelectorAll('.drop').forEach(item => {
    item.addEventListener('drop', (event) => {
    event.preventDefault();
    const id  = event.dataTransfer.getData('text');
    const element = document.getElementById(id);
    error.innerHTML = "";
    // elemnt is an item
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

    const availableColumns = ["requested", "in-progress", "done"];
    console.log(event.target.id)
    if(availableColumns.includes(event.target.id)){
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
  