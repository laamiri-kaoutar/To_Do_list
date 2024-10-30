const taskModal = document.getElementById("taskModal");
const addButton = document.getElementById("add-task");
const cancelbutton = document.getElementById("cancelbutton");

addButton.addEventListener('click', function() {
    taskModal.classList.remove("hidden")
});

cancelbutton.addEventListener('click', function() {
    taskModal.classList.add("hidden");
});