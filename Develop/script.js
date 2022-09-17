//the object in which things entered in the text areas is stored
var schedule = {

}
//sets the object equal to one which has been previously saved in local storage if there is one
var savedSchedule = JSON.parse(localStorage.getItem("schedule"));
if (savedSchedule !== null) {
    schedule = savedSchedule;
}
console.log(schedule)

var date = moment();
//gets today's date
var today = date.format("M/D/YY")
//gets the present hour as an integer
var presentHour = parseInt(date.format("H"))

//displays today's date below the heading
$("#currentDay").text(today)

//selects the save buttons
var saveBtns = $(".saveBtn")

//selects the div element containing the time blocks
var blockContainer =$(".container")

//iterates through each text area and adds the saved text and adds a class to the element corresponding to whether that hour is past, present, or future
for (i=0; i <= 8; i++) {
    //selects the text area corresponding to the index i
    var textArea = blockContainer.children().eq(i).children("textarea")
    
    //if the "schedule" object has a property corresponding to an hour, displays the value of that property in the corresponding textarea
    if (schedule[i+9]) {
        textArea[0].value = schedule[i+9]
    }
    //gets the id of the text area, which is the number of the hour it corresponds to, as an integer
    var areaId = parseInt(textArea[0].id)
  
    //compares the id of the textarea as an integer to the present hour as an integer and adds a class to the corresponding text area to change its background color
    if (areaId < presentHour){
        textArea.addClass("past")
        
    }
    else if (areaId == presentHour){
        textArea.addClass("present")
        
    }
    else {
        textArea.addClass("future")
        
    }
}

//saves the text the user entered when the save button to the right of the text area is clicked
saveBtns.on("click", function(event) {
    //selects the specific button clicked
    var clickedBtn = event.target

    //sets the property of the object "schedule" with a name, which is id of the text area next to the button, equal to the text in that text area
    schedule[clickedBtn.previousElementSibling.id] = clickedBtn.previousElementSibling.value
 
    //saves "schedule" to the local storage
    localStorage.setItem("schedule", JSON.stringify(schedule));
})

