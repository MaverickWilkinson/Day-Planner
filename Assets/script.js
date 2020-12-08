var testEl = $(`<h1>test</h1>`);
var startTime = 9;
var endTime = 17;
var taskArray = new Array(endTime - startTime);
let colorClass;
let currentDate = new moment();
$(document).ready(function(){
    doTheTimeStuff();
    displayTimeCards();
})

function doTheTimeStuff(){
    $("#currentDay").append(currentDate.format('D-M-YYYY, hh:mm:ss'));
    let currentHour = currentDate.format('hh');
}

function displayTimeCards(){
    for(let i = startTime; i <= endTime; i++){
        let displayTime = i;
        let amOrPm = "AM";
        taskArray = JSON.parse(localStorage.getItem("Textinfo"));
        let textContent;
        if (taskArray != null){
            textContent = taskArray[i - startTime];
        } else{
            textContent = "";
        }
           if (displayTime > 12){ //swaps am for pm if the time is in the afternoon
            displayTime = displayTime - 12;
            amOrPm = "PM"
        }
        if (textContent === null){
            textContent = "";
        }

        if (parseInt(currentDate.format('HH')) == i){
            colorClass = "red";
        } else if(currentDate.format('HH') > i){
            colorClass = "grey";
        } else {
            colorClass = "green";
        }

        console.log(i);
        console.log(currentDate.format('hh'))
        console.log(parseInt(currentDate.format('hh')) + startTime);
        console.log(colorClass);
        
        var timeCard = $(
        `
            <div class="row time">
                <div class="col-1 hour">
                    <span>${displayTime} ${amOrPm}</span>
                </div>
                <div class="col" id = "${colorClass}">
                    <textarea id="${displayTime}">${textContent}</textarea>
                </div>
                <button data-index="${displayTime}" class="col-1 saveBtn">🖫</button>
            </div>
        `)
    $("#TimeSlots").append(timeCard);
    }
}
$("#TimeSlots").on("click", "button", function(){
    let timeId = $(this).attr("data-index");
    let currentTaskText = $("#" + $(this).attr("data-index")).val();
    taskArray[timeId - startTime] = currentTaskText;
    localStorage.setItem("Textinfo", JSON.stringify(taskArray));
})