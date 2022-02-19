let myLeads =[ ]
//JSON.parse converts strings to array
//JSON.stringify converts array to string
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
// Making the delete button work
// 1. store delete button in a  deleteBtn variable
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

//lets learn about truthy and falsy variable
JSON.parse( localStorage.getItem("myLeads"))
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))
//check if leads from localStorage is truthy
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function() {
    
    chrome.tabs.query({active:true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)

    })
}) 

function render(leads) {
    let listItems = " "
    for(let i = 0; i< leads.length; i++) {
   listItems += `<li>
                             <a href = '${leads[i]}' target = '_blank'>
                                    ${leads[i]}
                             </a>
                        </li>`
    /* alternative way of doing this
    1. create the element
    2. set text content
    3.append to ulEl
    const li = document.createElement("li")
    li.textContent = myLeads[i]
    ulEl.append(li)*/
}
    ulEl.innerHTML =  listItems 
}  
   

//2.Listen for double click on the delete button (google it)
deleteBtn.addEventListener("dblclick", function() {
//3.When clicked, you should clear localStorage, myLeads and DOM
   localStorage.clear()
   myLeads = [ ]
   //Since it's now an empty array
   render(myLeads) 
   // or ulEl.innerHTML = null

})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    // clear out input field
    inputEl.value = ""
    //save myleads array to local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)  
})    

