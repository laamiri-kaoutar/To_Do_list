const taskModal = document.getElementById("taskModal");
const addButton = document.getElementById("add-task");
const cancelbutton = document.getElementById("cancelbutton");
const saveBtn = document.getElementById("saveTask")
const todolist = document.getElementById("todo-list");
const inProgress = document.getElementById("in-progress-list");
const doneList = document.getElementById("done-list");
const updateBtn = document.getElementById("editTask")
const todoCount = document.getElementById("todoCount")
const doingCount = document.getElementById("doingCount")
const doneCount = document.getElementById("doneCount")


let tasks = [];
let currentEditingTaskId = null;

addButton.addEventListener('click', function() {
    taskModal.classList.remove("hidden")
});

cancelbutton.addEventListener('click', function(e) {
    e.preventDefault();
    taskModal.classList.add("hidden");
});
 saveBtn.addEventListener("click" ,addTask);

updateBtn.addEventListener("click", update); // Set update listener once


function addTask(e ) {
    e.preventDefault();

    // Validation
    if (!document.getElementById("title").value || !document.getElementById("description").value || !document.getElementById("status").value || !document.getElementById("priority").value || !document.getElementById("dueDate").value ) {
        alert("Please fill out all required fields.");
        return;
    }

    let task = {
        id : Date.now(),
        title : document.getElementById("title").value,
        description : document.getElementById("description").value ,
        status : document.getElementById("status").value,
        dueDate : document.getElementById("dueDate").value,
        priority : document.getElementById("priority").value
    };

    tasks.push(task)

    updateCounts();
    const taskDiv = document.createElement("div");
    taskDiv.id = task.id;

    const liTask = document.createElement("li");
    liTask.classList.add("flex-1","flex", "flex-col", "p-2");

    // this is for title element
    const titleElement = document.createElement("span");
    titleElement.innerText = task.title;
    titleElement.classList.add("font-bold", "text-lg"); // Tailwind classes for styling
    liTask.appendChild(titleElement);

    // this is for  due date element
    const dueDateElement = document.createElement("span");
    dueDateElement.innerText = `Due: ${task.dueDate}`;
    dueDateElement.classList.add("text-gray-600", "text-sm", "mt-1"); // Tailwind classes for styling
    liTask.appendChild(dueDateElement);

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

        deleteTaskById(task.id);
        updateCounts();
        taskDiv.remove();
    });

    //  this is to make the edit button shows the details when we click it 
    editBtn.addEventListener('click',(e)=>{ edit (e,task) });
    //  this is to hide the form after clicking save
    taskModal.classList.add("hidden");

    // this is to empty the forme because it shows with the content of the last task added
    empty();
} 


function edit (e,task){
    e.preventDefault();
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("status").value = task.status;
    document.getElementById("priority").value = task.priority;
    document.getElementById("dueDate").value = task.dueDate;

    currentEditingTaskId = task.id;
    updateBtn.classList.remove("hidden")
    taskModal.classList.remove("hidden")
    saveBtn.classList.add("hidden")

}

function update(e) {
    e.preventDefault();

    const index = tasks.findIndex(task => task.id === currentEditingTaskId);

    tasks[index].title = document.getElementById("title").value 
    tasks[index].description = document.getElementById("description").value 
    tasks[index].status = document.getElementById("status").value
    tasks[index].priority = document.getElementById("priority").value
    tasks[index].dueDate = document.getElementById("dueDate").value
    console.log(tasks[index].title );

    const parentDiv = document.getElementById(currentEditingTaskId)

    const liElement = parentDiv.querySelector('li');
 
    const spans = liElement.getElementsByTagName('span');
    const titleSpan = spans[0];
    const dueDateSpan = spans[1];

    dueDateSpan.innerText = `Due: ${tasks[index].dueDate}`;
    titleSpan.innerText = tasks[index].title;


    styleBasedPriority(tasks[index],parentDiv);
    positionBasedStatus(tasks[index],parentDiv);

    // this is to update the counter of each list after the updat

    updateCounts();


    //  this is to hide the form  and edit button and show the save button after clicking save
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

 function todoStatics(){
    let count=0;
    // for (let i = 0; i < tasks.length; i++) {
    //     if (tasks[i].status== "to-do" ) {
    //         count++;
    //     } 
    // }
    
    tasks.forEach(task => {
        if (task.status === "to-do") {
            count++;
        }
    });
    return count;
 }

 function diongStatics(){
    let count=0;
    tasks.forEach(task => {
        if (task.status === "doing") {
            count++;
        }
    });
    return count;
 }
 function doneStatics(){
    let count=0;
    tasks.forEach(task => {
        if (task.status === "done") {
            count++;
        }
    });
    return count;
 }


 function deleteTaskById(taskId) {
    // find the index of the task by id
    const index = tasks.findIndex(task => task.id === taskId);

    if (index !== -1) {

        tasks.splice(index, 1);

    } 
}

function updateCounts() {
    todoCount.innerText = todoStatics();
    doingCount.innerText = diongStatics();
    doneCount.innerText = doneStatics();
}

