const taskModal = document.getElementById("taskModal");
const addButton = document.getElementById("add-task");
const cancelbutton = document.getElementById("cancelbutton");
const saveBtn = document.getElementById("saveTask")
const todolist = document.getElementById("todo-list");
const inProgress = document.getElementById("in-progress-list");
const doneList = document.getElementById("done-list");

addButton.addEventListener('click', function() {
    taskModal.classList.remove("hidden")
});

cancelbutton.addEventListener('click', function() {
    taskModal.classList.add("hidden");
});
 saveBtn.addEventListener("click" ,addTask);

function addTask(e) {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let status = document.getElementById("status").value;
    // let deuDate = document.getElementById("deuDate").value;
    let priority = document.getElementById("priority").value;

    const taskDiv = document.createElement("div");
    if(priority == "P1"){
        taskDiv.classList.add("flex", "border-2", "border-red-500", "my-2", "P1","p-2");    
    } else if(priority == "P2"){
        taskDiv.classList.add("flex", "border-2", "border-orange-500","P2", "my-2", "p-2");    
    } else if(priority == "P3"){
        taskDiv.classList.add("flex", "border-2", "border-yellow-500","P3", "my-2", "p-2");
    }

    const liTask = document.createElement("li");
    liTask.innerText = title;
    liTask.classList.add("flex-1");
    taskDiv.appendChild(liTask);
    console.log(liTask);
    

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can text-red-500"></i>';
    taskDiv.appendChild(deleteBtn); 

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid ml-3 text-teal-500 fa-pen-to-square"></i>';
    taskDiv.appendChild(editBtn); 
    console.log("status" , status);

    if( status== "to-do"){
        todolist.appendChild(taskDiv);
    } else if( status== "doing"){
        inProgress.appendChild(taskDiv);
    } else if( status== "done"){
        doneList.appendChild(taskDiv);
    }

    taskModal.classList.add("hidden");

     document.getElementById("title").value = "";
     document.getElementById("description").value = "";
     document.getElementById("status").value = "";
     document.getElementById("priority").value = "";
    //  document.getElementById("deuDate").value = "";
     console.log(document.getElementById("deuDate"));

} 