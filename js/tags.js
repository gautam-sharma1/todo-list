class Tags{

    tags = ["badge rounded-pill text-bg-primary", "badge rounded-pill text-bg-secondary", "badge rounded-pill text-bg-success",
    "badge rounded-pill text-bg-danger", "badge rounded-pill text-bg-warning","badge rounded-pill text-bg-info","badge rounded-pill text-bg-light","badge rounded-pill text-bg-dark"]

    constructor(text,tag_id="badge rounded-pill text-bg-success"){
        this.tag_id = tag_id;
        this.text = ' '+text;
    }

    getTag() {return {
        
        tag_id: this.tag_id, 
        text: this.text
    }
    }
    
    

}

export {Tags}