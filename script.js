console.log("JS is connected!");

function addTask() {
    let input = document.getElementById("task-input").value.trim();// take a input value

    if (input === "") return;

    let newLi = document.createElement("li");//Create <li> 
    newLi.textContent = input; //with text

    // Create Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit"; //with text

    editBtn.onclick = function () {
        let newValue=prompt("Edit value", newLi.firstChild.textContent);
        if(newValue){
             newLi.firstChild.textContent = newValue; // update <li> text
        }
      
    }

    // Create Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete"; //with text

    deleteBtn.onclick = function () {
        newLi.remove();
    }

    // Append buttons to <li>
    newLi.appendChild(editBtn);
    newLi.appendChild(deleteBtn);

    //Append to #task-list.
    document.getElementById("task-list").appendChild(newLi);
    // Clear input box
    document.getElementById("task-input").value = "";

}

let btn = document.getElementById("add-btn");
btn.addEventListener("click", addTask);//Add event listener to #add-btn


let inputBox = document.getElementById("task-input");
inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


