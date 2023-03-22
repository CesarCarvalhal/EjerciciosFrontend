function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    // Prevenimos la acción por defecto que será abrir el texto como un link
    event.preventDefault();
    
    // Recuperamos el id que nosotros mismos establecimos en drag(event)
    const draggedElementId = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(draggedElementId);
    
    // event.target es el elemento sobre el que se hace drop, por
    // ejemplo, la segunda columna
    // Al hacer .appendChild, el elemento se "va" de su padre original
    // y se añade a la nueva columna. ¡Es como arrastrarlo!
    event.target.appendChild(draggedElement);
}

function onFullscreenRequested(event) {
    console.log("Fullscreen has been requested");
    const parent = document.getElementById("parent");
    parent.requestFullscreen();
}
const fullscreenButton = document.getElementById("fullscreenButton");
fullscreenButton.addEventListener("click", onFullscreenRequested);


function onSubmitNewTask(event) {
    event.preventDefault();
    const taskTitle = event.target.elements.inputTaskName.value;
    if (taskTitle.length < 7) {
        alert("El título de tu tarea debe tener por lo menos 7 caracteres");
        return;
    }
    const taskType = event.target.elements.inputTaskType.value;
    let backgroundColorClassName;
    if (taskType === "backend") {
        backgroundColorClassName = "green";
    } else if (taskType === "frontend") {
        backgroundColorClassName = "blue";
    } else if (taskType === "urgent") {
        backgroundColorClassName = "red";
    } else {
        backgroundColorClassName = "yellow";
    }

    addNewTaskNote("taskX" + Math.random(), taskTitle, backgroundColorClassName);
    event.target.reset(); // Con esto, se borran los campos del formulario
}

const newTaskForm = document.getElementById("newTaskForm");
newTaskForm.addEventListener("submit", onSubmitNewTask);

function addNewTaskNote(id, title, className) {
    const note = document.createElement("div");
    note.innerHTML = title;
    note.setAttribute("id", id);
    note.setAttribute("class", "taskNote " + className); // Tiene 2 clases CSS; taskNote y la que sea que usemos de color de fondo
    note.setAttribute("draggable", "true");
    note.addEventListener("dragstart", drag);
    const pendingTasksColumn = document.getElementById("notStartedColumn");
    pendingTasksColumn.append(note);
}  
