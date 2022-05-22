class Button{
    constructor(id,innerHTML){
        this.id = id;
        this.innerHTML = innerHTML;
        this.initialize();
    }

    initialize(){
        const element = document.querySelector("#"+this.id);
        this.btn = document.createElement("button");
        this.btn.innerHTML = this.innerHTML;
        element.appendChild(this.btn);
    }

    getButton(){
        return this.btn;
    }

}

export {Button}