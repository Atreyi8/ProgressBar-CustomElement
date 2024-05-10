const setSize = (size) => {
    if(size==="sm") return "5px";
    if(size==="md") return "10px";
    if(size==="lg") return "15px";
    if(size==="xl") return "20px";
}

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
class ProgressBar extends HTMLElement{
    //used for oberving attributes , which are used in attributeChangedCallback hook
    static get observedAttributes(){
        return ["value","color"]
    }
    constructor(){
        super()

        this.innerHTML = `
        <style>
            #total_progress{
                width: 100%;
                height:${setSize(this.getAttribute("size"))};
                background: "dfdfdf";
                margin: 5px 0px;

            }

            #current_progress{
                 width: ${this.getAttribute("value")}px;
                 background: ${this.getAttribute("color")};
                 height:${setSize(this.getAttribute("size"))};
            }

            .btn{
                background: ${this.getAttribute("color")};
                border: none;
                padding: .3rem .6rem;
                font-weight: bold;
                color: white;
                cursor: pointer;
            }
            
        </style>
        <div class="wrapper">
            <div id="total_progress">
                <div id="current_progress"></div>
            </div>
            <button class="btn" id="increase">Increase Progress</button>
            <button class="btn" id="random_color">Random color</button>

        </div>`
    }

    //lifecycle method
    // This hook gets invoked each gtime custom element is attached to the DOM
    connectedCallback(){
        this.querySelector("#increase").addEventListener("click",()=>{
            let value = this.getAttribute("value")
            let step = this.getAttribute("step")
            value < 100 && this.setAttribute("value",+step + +value)
        })

        this.querySelector("#random_color").addEventListener("click",()=>{
            this.setAttribute("color",randomColor())
        })
    }

    //removing eventlistener when dom unmounts
    disconnectedCallback(){
        this.querySelector("#increase").removeEventListener("click",()=>{
            let value = this.getAttribute("value")
            let step = this.getAttribute("step")
            this.setAttribute("value",+step + +value)
        })
    }
    //value changes but dom dosent update
    //another lifecycle method

    attributeChangedCallback(name,oldVal,newVal){
        if(name==="value" && newVal<= 100){
            this.querySelector("#current_progress").style.width = `${newVal}%`
        }
        if(name==="color"){
            this.querySelector("#current_progress").style.background = newVal
            this.querySelector("#random_color").style.background = newVal
            this.querySelector("#increase").style.background = newVal
        }
    }
}

//customised element(CustomParagraph) - intherit property from there built in interface
// class CustomParagraph extends HTMLParagraphElement{
//     constructor(){
//         super()
//     }
// }


customElements.define("progress-bar",ProgressBar)

// For customised elements - at end an options object is passed which has a property extends 
//to which we give value of built in element , of which customised element is going to inherit property

// customElements.define("cutom-para",CustomParagraph),{extends:"p"}