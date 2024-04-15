
document.addEventListener('DOMContentLoaded', function () {
    let timer;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let startStopRunning = false;
    const tasks = [
        { taskName: "Meeting", description: "Client meeting", duration: "02:00:00" },
        { taskName: "Project ABC", description: "Work on Project ABC", duration: "01:00:00" },
        { taskName: "Personal Break", description: "Take a break", duration: "00:15:00" },
        { taskName: "Meeting", description: "Manager meeting", duration: "01:00:00" },
        { taskName: "Project ABC", description: "-", duration: "02:00:00" },
        { taskName: "Personal Break", description: "Tea break", duration: "00:15:00" },
        { taskName: "Meeting", description: "Student meeting", duration: "01:00:00" },
        { taskName: "Project ABC", description: "collecting information about", duration: "02:00:00" },
        { taskName: "Personal Break", description: "Lunch break", duration: "00:15:00" },
    ];

   
    function populateTable(data) {
        const tableBody = document.querySelector('#data tbody');
        tableBody.innerHTML = '';
        data.forEach((element, index) => {
            const row = `<tr data-index="${index}">
                <td>${element.taskName}</td>
                <td>${element.description}</td>
                <td>${element.duration}</td>
                <td>
                    <button class="edit-button">Update</button>
                    <button class="delete-button">Delete</button>
                </td>
                </tr>`;
            tableBody.innerHTML += row;
        });

        document.querySelectorAll('.edit-button').forEach((button, index) => {
            button.addEventListener('click', () => editTask(index));
        });

        document.querySelectorAll('.delete-button').forEach((button, index) => {
            button.addEventListener('click', () => deleteTask(index));
        });
    }

    function editTask(index) {
        const newName = prompt("Enter new task name:");
        const newDescription = prompt("Enter new task description:");
        if (newName !== null && newDescription !== null) {
            tasks[index].taskName = newName;
            tasks[index].description = newDescription;
            populateTable(tasks);
        }
    }  

    function deleteTask(index) {
        const confirmation = confirm("Are you sure you want to delete this task?");                                                                                                                             
        if (confirmation) {
            tasks.splice(index, 1);
            populateTable(tasks);
        }
    }
    function addTask() {
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        if (name && description) {
            const duration = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
            tasks.push({ taskName: name, description: description, duration: duration });
            populateTable(tasks);
        
            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
        } else {
            alert("Please fill in all fields.");
        }
    }

    
    function filterData(text) {
        const filteredData = tasks.filter((item) => {
            const taskName = item.taskName.toLowerCase();
            const description = item.description.toLowerCase();
            const searchText = text.toLowerCase();
            return taskName.includes(searchText) || description.includes(searchText);
        });
        populateTable(filteredData);
    }

    document.getElementById('search').addEventListener('input', function () {
        const searchText = this.value;
        filterData(searchText);
    });

    document.getElementById("add-button").addEventListener("click", function () {
        document.getElementById("add-form").style.display = "block";
    });

   
    document.getElementById("submit-button").addEventListener("click", addTask);

    
    document.getElementById('start-stop-button').addEventListener('click', function () {
        startStopwatch();
    });
    document.getElementById('reset').addEventListener('click', function () {
        resetwatch();
    });
    function startStopwatch() {
        if (!startStopRunning) {
            timer = setInterval(() => {
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes >= 60) {
                        minutes = 0;
                        hours++;
                    }
                }
                document.getElementById('stopwatch').textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
            }, 1000);
            startStopRunning = true;
            document.getElementById('start-stop-button').textContent = "Stop";
        } else {
            clearInterval(timer);
            startStopRunning = false;
            document.getElementById('start-stop-button').textContent = "Start";
        }
    }

    function resetwatch() {
        clearInterval(timer);
        startStopRunning = false;
        seconds = 0;
        minutes = 0;
        hours = 0;
        document.getElementById('stopwatch').textContent = '00:00:00';
        document.getElementById('start-stop-button').textContent = 'Start';
    }

    function pad(value) {
        return value < 10 ? `0${value}` : value;
    }

    populateTable(tasks);
});