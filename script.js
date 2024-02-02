 {
    console.log(localStorage.getItem("course"))
    if (localStorage.getItem("course")!=null){
        var courses = JSON.parse(localStorage.getItem("course"))
        var rowCount = JSON.parse(localStorage.getItem("rowcount"))}
    else{
        var courses=[]
        var rowCount=0}
    console.log(JSON.parse(localStorage.getItem("rowcount"))+"counting")
    console.log(123)
    console.log(JSON.parse(localStorage.getItem(courses[2])))
    for (let courseElement of courses) {
        const newRow = document.createElement("tr")
        console.log(courseElement +"ok")
        console.log(JSON.parse(localStorage.getItem(courseElement)))
        newRow.id = JSON.parse(localStorage.getItem(courseElement)).rowId
        console.log(courses.length)
        console.log(courses)
        //console.log(x)
        const table = document.getElementById("body")

        const courseNameRow = document.createElement("td")
        courseNameRow.innerText = JSON.parse(localStorage.getItem(courseElement)).courseName
        courseNameRow.className = "rowElement"
        console.log(JSON.parse(localStorage.getItem(courseElement)).courseName)
        const gradeRow = document.createElement("td")
        gradeRow.innerText = JSON.parse(localStorage.getItem(courseElement)).gradeValue
        gradeRow.className = "rowElement"

        const unweightedRow = document.createElement("td")
        unweightedRow.innerText = JSON.parse(localStorage.getItem(courseElement)).weightedValue
        unweightedRow.className = "rowElement"

        const semesterRow = document.createElement("td")
        semesterRow.innerText= JSON.parse(localStorage.getItem(courseElement)).semesterValue
        semesterRow.className="rowElement"

        newRow.appendChild(courseNameRow)
        newRow.appendChild(gradeRow)
        newRow.appendChild(unweightedRow)
        newRow.appendChild(semesterRow)
        createDeleteButton(newRow, JSON.parse(localStorage.getItem(courseElement)).rowId)
        table.appendChild(newRow)
        updateGPA()
    }
    
}


//if rowCount is empty, define courses as 0, if not then convert rowcount to int using + and set it equal to localstorage thing

//add stuff in from local storage with loop if courses is not undefined


function addCourse() {

        //get input from course thing
    const courseInput = document.getElementById("courseName")
    const gradeInput = document.getElementById("grade")
    const weightedInput = document.getElementById("weightedInput")
    const semesterInput = document.getElementById("semesterInput")

    //if input is empty or something return error

    //set error display label to nothing
    const errorLabel = document.getElementById("error")
    errorLabel.innerText=""

    if (courseInput.value.length>35){
        errorLabel.innerText="Error: input is too long";
        return
    }
    if (courseInput.value==""||gradeInput.value==""){
        errorLabel.innerText="Error: 1 or more fields are blank"//display error: 1 or more fields are blank
        console.log(courseInput.value + gradeInput.value)
        return
    }

    if (isNaN(+gradeInput.value)){
        errorLabel.innerText="Error: Grade value is not a number"//display error: grade value not number
        return
    }

    if (isNaN(+semesterInput.value)||semesterInput.value==""){
        errorLabel.innerText="Error: Semester value is not a number/empty"//display error: grade value not number
        return
    }


    const newRow = document.createElement("tr")
    newRow.id = rowCount
    console.log("rowcount: "+rowCount)

    const table = document.getElementById("body")

    const courseNameRow = document.createElement("td")
    courseNameRow.innerText = courseInput.value
    courseNameRow.className = "rowElement"

    const gradeRow = document.createElement("td")
    gradeRow.innerText = gradeInput.value
    gradeRow.className = "rowElement"

    const unweightedRow = document.createElement("td")
    unweightedRow.innerText = weightedInput.value
    unweightedRow.className = "rowElement"

    const semesterRow = document.createElement("td")
    semesterRow.innerText= semesterInput.value
    semesterRow.className="rowElement"
    


    
    //create new row, set row id to #row1 ("#row" + rowId)
    //append info to row
    
    newRow.appendChild(courseNameRow)
    newRow.appendChild(gradeRow)
    newRow.appendChild(unweightedRow)
    newRow.appendChild(semesterRow)
    createDeleteButton(newRow, rowCount)
    table.appendChild(newRow)


    console.log("class, " +rowCount)
    //add info in dictionary format to array list

    let courseInfo = {
        rowId: rowCount,
        courseName: courseInput.value,
        gradeValue: gradeInput.value,
        weightedValue: weightedInput.value,
        semesterValue: semesterInput.value
    }

    localStorage.setItem(rowCount, JSON.stringify(courseInfo))
    courses.push(rowCount)
    //run add gpa function
    console.log(localStorage.getItem(rowCount))

    localStorage.setItem("course", JSON.stringify(courses))
    

    updateGPA()

    //clear input fields
    courseInput.value=""
    gradeInput.value=""
    weightedInput.value="No"
    rowCount++
    localStorage.setItem("rowcount", JSON.stringify(rowCount))


    console.log(localStorage)
}

function createDeleteButton(newRow,rowNumber) {
    //create delete button based on row number

    const deleteColumn = document.createElement("td")
    
    const deleteButton = document.createElement("button");

    deleteColumn.className = "rowElement"
    deleteButton.innerText= "Delete"

    


    //add function to that delete button

    deleteButton.addEventListener("click", () => {
        deleteCourse(rowNumber)
    });

    deleteColumn.appendChild(deleteButton)
    newRow.appendChild(deleteColumn)



    
}

function deleteCourse(rowNumber) {
    console.log(localStorage)
    const deletedRow = document.getElementById(rowNumber)
    
    console.log("rowNumber for delete course:"+rowNumber)
    console.log(courses.slice(0,rowNumber).concat(courses.slice(rowNumber+1)))
    //remove record from list
    for (let x = 0; x<courses.length; x++) {
        if (courses[x]==rowNumber) {
            localStorage.removeItem(rowNumber)
            console.log("courses:" +courses)
            courses = courses.slice(0,rowNumber).concat(courses.slice(rowNumber+1))

            console.log(courses +"delete")
            localStorage.setItem("course", JSON.stringify(courses))
        }

    }
    //remove row
    deletedRow.remove()

    updateGPA()

    console.log(localStorage)
}



function clearTable() {
    if (confirm("Are you sure you want to clear all data?")) {
        const courseInput = document.getElementById("courseName")
        const gradeInput = document.getElementById("grade")
        const weightedInput = document.getElementById("weightedInput")
        const semesterInput = document.getElementById("semesterInput")
        let courseLength = courses.length
        localStorage.clear()
        localStorage.setItem("rowcount", JSON.stringify(0))
        localStorage.setItem("course", JSON.stringify([]))
        
        rowCount=0
        for (let x=0;x<courseLength;x++) {
            const element = document.getElementById(courses[x])
            console.log(element)
            element.remove()
        }
        courses=[]
        
        courseInput.value=""
        gradeInput.value=""
        weightedInput.value="No"
        semesterInput.value=1

        
        
        
        

        
        
        
    }
    else {

    }
    //delete all records
    //have an alert saying "are you sure"
}

function updateGPA() {
    var gpa = +0;
    var weightedGPA = +0;
    //if gpa thing is set to 4.0, calculate based on other method
    //console.log(JSON.parse(localStorage.getItem(courses[0])).gradeValue)
    for (var x = 0; x<courses.length; x++){
        gpa += +(JSON.parse(localStorage.getItem(courses[x])).gradeValue)

    }

    gpa = gpa/courses.length
    gpa = gpa.toFixed(2)
    console.log(gpa)
    //iterate through course list
    // add together gpa and stuff
    //implementation
    const unweightedGpaElement = document.getElementById("unweightedGpaDisplay")
    unweightedGpaElement.innerText = gpa
    //make sure to convert all stuff to ints using + unary operator

    for (var x = 0; x<courses.length; x++){
        if (JSON.parse(localStorage.getItem(courses[x])).weightedValue=="No") {
            weightedGPA += +(JSON.parse(localStorage.getItem(courses[x])).gradeValue)
        }
        else {
            weightedGPA = weightedGPA + 7 + +(JSON.parse(localStorage.getItem(courses[x])).gradeValue)
        }
        console.log(gpa)
    }
    weightedGPA = weightedGPA/courses.length
    weightedGPA = weightedGPA.toFixed(2)

    const weightedGpaElement = document.getElementById("weightedGpaDisplay")
    weightedGpaElement.innerText = weightedGPA


}

//updateGPA()