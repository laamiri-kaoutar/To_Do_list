const taskModal = document.getElementById("taskModal");
const addButton = document.getElementById("add-task");
const cancelbutton = document.getElementById("cancelbutton");
const saveBtn = document.getElementById("saveTask")
const todolist = document.getElementById("todo-list");
const inProgress = document.getElementById("in-progress-list");
const doneList = document.getElementById("done-list");
const updateBtn = document.getElementById("editTask")

addButton.addEventListener('click', function() {
    taskModal.classList.remove("hidden")
});

cancelbutton.addEventListener('click', function(e) {
    e.preventDefault();
    taskModal.classList.add("hidden");
});
 saveBtn.addEventListener("click" ,addTask);
let tasks = [];


function addTask(e ) {
    e.preventDefault();

    let task = {
        id : Date.now(),
        title : document.getElementById("title").value,
        description : document.getElementById("description").value ,
        status : document.getElementById("status").value,
        dueDate : document.getElementById("dueDate").value,
        priority : document.getElementById("priority").value
    };


    const taskDiv = document.createElement("div");

    const liTask = document.createElement("li");
    liTask.innerText = task.title;
    liTask.classList.add("flex-1");
    taskDiv.appendChild(liTask);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can text-red-500"></i>';
    taskDiv.appendChild(deleteBtn); 

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid ml-3 text-teal-500 fa-pen-to-square"></i>';
    taskDiv.appendChild(editBtn); 

    styleBasedPriority(task,taskDiv);
    positionBasedStatus(task,taskDiv);

    // this is for the delete button to remove the task 
    deleteBtn.addEventListener("click", function  deleteTask () {
        taskDiv.remove();
    });

    //  this is to make the edit button shows the details when we click it 
    editBtn.addEventListener('click',(e)=>{ edit (e,task) });
    updateBtn.addEventListener("click",(e)=>{ update(e,task,liTask,taskDiv)});

    //  this is to hide the form after clicking save
    taskModal.classList.add("hidden");

    // this is to empty the forme because it shows with the content of the last task added
    empty();
} 

// function deleteTask(e ,taskDiv) {
//     e.preventDefault();
//     taskDiv.classList.add("fall");
//     console.log("Fall class added");
//     taskDiv.addEventListener("transitionend", function(){
//         console.log("holla")
//         taskDiv.remove();
//         console.log("holla")
//     })

//     taskDiv.addEventListener("webkitTransitionEnd", function() {
//         console.log("holla")
//         taskDiv.remove();
//         console.log("holla")
//     });
// }

function edit (e,task){
    e.preventDefault();
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("status").value = task.status;
    document.getElementById("priority").value = task.priority;
    document.getElementById("dueDate").value = task.dueDate;

    updateBtn.classList.remove("hidden")
    taskModal.classList.remove("hidden")
    saveBtn.classList.add("hidden")

}

function update(e,task,liTask,taskDiv) {
    e.preventDefault();

    task.title = document.getElementById("title").value 
    task.description = document.getElementById("description").value 
    task.status = document.getElementById("status").value
    task.priority = document.getElementById("priority").value
    task.dueDate = document.getElementById("dueDate").value
    console.log(task.title );
    liTask.innerText = task.title;


    styleBasedPriority(task,taskDiv);
    positionBasedStatus(task,taskDiv);


    //  this is to hide the form after clicking save
    updateBtn.classList.add("hidden")
    taskModal.classList.add("hidden")
    saveBtn.classList.remove("hidden")

    // this is to empty the forme because it shows with the content of the last task added
    empty();
} 

function empty(){
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("status").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("dueDate").value = "";
}

 function positionBasedStatus(task,taskDiv){

    if( task.status== "to-do"){
        todolist.appendChild(taskDiv);
    } else if( task.status== "doing"){
        inProgress.appendChild(taskDiv);
    } else if( task.status== "done"){
        doneList.appendChild(taskDiv);
    }

 } 

 function styleBasedPriority(task,taskDiv){
    if(task.priority == "P1"){
        taskDiv.classList.add("flex", "border-2", "border-red-500", "my-2", "P1","p-2");    
    } else if(task.priority == "P2"){
        taskDiv.classList.add("flex", "border-2", "border-orange-500","P2", "my-2", "p-2");    
    } else if(task.priority == "P3"){
        taskDiv.classList.add("flex", "border-2", "border-yellow-500","P3", "my-2", "p-2");
    }

 }


     // if(task.priority == "P1"){
    //     taskDiv.classList.add("flex", "border-2", "border-red-500", "my-2", "P1","p-2");    
    // } else if(task.priority == "P2"){
    //     taskDiv.classList.add("flex", "border-2", "border-orange-500","P2", "my-2", "p-2");    
    // } else if(task.priority == "P3"){
    //     taskDiv.classList.add("flex", "border-2", "border-yellow-500","P3", "my-2", "p-2");
    // }

    // if( task.status== "to-do"){
    //     todolist.appendChild(taskDiv);
    // } else if( task.status== "doing"){
    //     inProgress.appendChild(taskDiv);
    // } else if( task.status== "done"){
    //     doneList.appendChild(taskDiv);
    // }
