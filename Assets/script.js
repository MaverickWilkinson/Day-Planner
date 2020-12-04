var testEl = $(`<h1>test</h1>`);
var startTime = 9;
var endTime = 17;
var taskArray = new Array(endTime - startTime);
$(document).ready(function(){
    displayTimeCards();
})
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
        console.log(textContent)
        if (textContent === null){
            textContent = "";
        }
        
        var timeCard = $(
        `
            <div class="row time">
                <div class="col-1 hour">
                    <span>${displayTime} ${amOrPm}</span>
                </div>
                <div class="col">
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
    console.log(timeId)
    let currentTaskText = $("#" + $(this).attr("data-index")).val();
    taskArray[timeId - startTime] = currentTaskText;
    localStorage.setItem("Textinfo", JSON.stringify(taskArray));
})