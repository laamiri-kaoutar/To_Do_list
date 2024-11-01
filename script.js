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
        // deuDate : document.getElementById("deuDate").value,
        priority : document.getElementById("priority").value
    };
    const taskDiv = document.createElement("div");

    // this is to style the the task cars depending on its priority 
    if(task.priority == "P1"){
        taskDiv.classList.add("flex", "border-2", "border-red-500", "my-2", "P1","p-2");    
    } else if(task.priority == "P2"){
        taskDiv.classList.add("flex", "border-2", "border-orange-500","P2", "my-2", "p-2");    
    } else if(task.priority == "P3"){
        taskDiv.classList.add("flex", "border-2", "border-yellow-500","P3", "my-2", "p-2");
    }

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

    // this is to add the task in the propre place [to do list , in progress , diong ]

    if( task.status== "to-do"){
        todolist.appendChild(taskDiv);
    } else if( task.status== "doing"){
        inProgress.appendChild(taskDiv);
    } else if( task.status== "done"){
        doneList.appendChild(taskDiv);
    }

    // this is for the delete button to remove the task 
    deleteBtn.addEventListener("click", function deleteTask() {
        taskDiv.remove();
    });

    //  this is to make the edit button shows the details when we click it 

    editBtn.addEventListener('click',function edit (e){
        e.preventDefault();
        document.getElementById("title").value = task.title;
        document.getElementById("description").value = task.description;
        document.getElementById("status").value = task.status;
        document.getElementById("priority").value = task.priority;
        updateBtn.classList.remove("hidden")
        taskModal.classList.remove("hidden")
        saveBtn.classList.add("hidden")

    });
    updateBtn.addEventListener("click", function (e) {
        e.preventDefault();

        task.title = document.getElementById("title").value 
        task.description = document.getElementById("description").value 
        task.status = document.getElementById("status").value
        task.priority = document.getElementById("priority").value
        console.log(task.title );
        liTask.innerText = task.title;
        
    } )
    //  this is to hide the form after clicking save
    taskModal.classList.add("hidden");

    // this is to empty the forme because it shows with the content of the last task added

     document.getElementById("title").value = "";
     document.getElementById("description").value = "";
     document.getElementById("status").value = "";
     document.getElementById("priority").value = "";
    //  document.getElementById("deuDate").value = "";
     console.log(document.getElementById("deuDate"));

} 

// function deleteTask(e) {

//     taskDiv.remove();
// }

