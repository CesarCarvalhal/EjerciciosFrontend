const tasks = [];

class Task {
    constructor(name, priority, date) {
      this.name = name;
      this.priority = priority;
      this.date = new Date(date);
    }
}

document.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("form-name");
    const priority = document.getElementById("form-priority");
    const date = document.getElementById("form-date");
    const myTask = new Task(name.value, priority.value, date.value);
    console.log(myTask);
    tasks.push(myTask)

    const ol = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = myTask.name;
    ol.appendChild(li);

 
})  
function customOnClick2(event) {
  // Los button no tienen una acción "por defecto" cuando se clican
  // Por ello, no necesitamos hacer event.preventDefault();
  console.log("Clicaste en ordenar por relevancia");
  const theList2 = document.getElementById("taskList");
  theList2.innerHTML = "";
  tasks.sort((task1, task2) => task2.priority - task1.priority);
  console.log(tasks);
  for (const task of tasks) {
    let aListItem = document.createElement("li");
    aListItem.innerHTML = task.name;
    theList2.append(aListItem);
  }
}

document.getElementById("sortByImportanceButton").addEventListener("click", customOnClick2);

function customOnClick3(event) {
  console.log("Clicaste en ordenar por fecha");
  const theList3 = document.getElementById("taskList");
  theList3.innerHTML = "";
  tasks.sort((task1, task2) => task1.date - task2.date);
  console.log(tasks);
  for (const task of tasks) {
    let aListItem = document.createElement("li");
    aListItem.innerHTML = task.name;
    theList3.append(aListItem);
  }
}


document.getElementById("sortByDeadlineButton").addEventListener("click", customOnClick3);