 {
    console.log(localStorage.getItem("course"))
    if (localStorage.getItem("course")!=null){
        console.log("ok")
        var courses = JSON.parse(localStorage.getItem("course"))
        var rowCount = JSON.parse(localStorage.getItem("rowcount"))
        var semesterCount = JSON.parse(localStorage.getItem("semesterCount"))}
    else{
        var courses=[]
        var rowCount=0
        var semesterCount=0
        console.log("empty  ")
    }
    console.log(JSON.parse(localStorage.getItem("rowcount"))+"counting")

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

    if (+gradeInput.value>110){
        errorLabel.innerText="Error: Grade value exceeds maximum limit"//display error: grade value not number
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
    courseNameRow.classList.add("rowElement")


    const gradeRow = document.createElement("td")
    gradeRow.innerText = gradeInput.value
    gradeRow.classList.add("rowElement")

    const unweightedRow = document.createElement("td")
    unweightedRow.innerText = weightedInput.value
    unweightedRow.classList.add("rowElement")

    const semesterRow = document.createElement("td")
    semesterRow.innerText= semesterInput.value
    semesterRow.classList.add("rowElement")
    


    
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
    
    if (JSON.parse(localStorage.getItem("semester"+semesterInput.value))==null){
        localStorage.setItem("semester"+(semesterInput.value), JSON.stringify([rowCount]))
        console.log("firs"+JSON.parse(localStorage.getItem("semester"+semesterInput.value)))
        semesterCount++
        localStorage.setItem("semesterCount", JSON.stringify(semesterCount))
    }
    else {
        let semesterArray = JSON.parse(localStorage.getItem("semester"+semesterInput.value))
        semesterArray.push(rowCount)
        localStorage.setItem("semester"+semesterInput.value, JSON.stringify(semesterArray))
        console.log('ok')
    }

    console.log(semesterCount+"semestercoun")
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
    deleteButton.classList.add("deleteElement")

    


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
    let arrayValue = JSON.parse(localStorage.getItem(rowNumber)).semesterValue
    let semesterArray = JSON.parse(localStorage.getItem("semester"+arrayValue))
    
    for (let x=0; x<semesterArray.length; x++) {
        if (semesterArray[x]==arrayValue) {
            semesterArray =semesterArray.slice(0,x).concat(semesterArray.slice(x+1))
        }
    }
    localStorage.setItem("semester"+arrayValue, JSON.stringify(semesterArray))

    console.log("rowNumber for delete course:"+rowNumber)
    console.log(courses.slice(0,rowNumber).concat(courses.slice(rowNumber+1)))
    //remove record from list
    
    for (let x = 0; x<courses.length; x++) {
        if (courses[x]==rowNumber) {
            localStorage.removeItem(rowNumber)

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
        semesterCount=0

        const unweightedGpaElement = document.getElementById("unweightedGpaDisplay")
        unweightedGpaElement.innerText = NaN
        const weightedGpaElement = document.getElementById("weightedGpaDisplay")
        weightedGpaElement.innerText = NaN

        
        
        
        

        
        
        
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
        console.log(courses[x])
        console.log(localStorage.getItem(courses[x]))
        gpa += +(JSON.parse(localStorage.getItem(courses[x])).gradeValue)

    }
    const gpaScale = document.getElementById("gpaScale")
    console.log(gpaScale.value)

    gpa = gpa/courses.length
    localStorage.setItem("unweightedGPA", gpa)
    if (gpaScale.value == "4.0 Point") {
        gpa = (gpa/20)-1
    }

    
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
    }
    weightedGPA = weightedGPA/courses.length
    localStorage.setItem("weightedGPA", weightedGPA)

    if (gpaScale.value == "4.0 Point") {
        weightedGPA = (weightedGPA/20)-1
        
    }
    weightedGPA = weightedGPA.toFixed(2)

    const weightedGpaElement = document.getElementById("weightedGpaDisplay")
    weightedGpaElement.innerText = weightedGPA

    

}

function generateReport() {
    let xValue = 45
    let semesterLength = JSON.parse(localStorage.getItem("semesterCount"))
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    var img = new Image()
    img.src = '/Logo.png'
    doc.addImage(img, 'png', 80, 5, 50, 15)
    doc.setFillColor(52,73,85);
    doc.rect(25, 10, 40, 8, 'F');
    doc.setFontSize(14)
    doc.setTextColor(64,162,227)
    doc.text(29,15.5, 'GPA Summary');
    
    doc.setTextColor(0,0,0)
    doc.setFontSize(10)
    doc.text(29, 25, "Weighted: " + JSON.parse(localStorage.getItem("weightedGPA")).toFixed(2) +" / " +((JSON.parse(localStorage.getItem("weightedGPA")))/20-1).toFixed(2))
    doc.text(28, 33, "Unweighted: " + JSON.parse(localStorage.getItem("unweightedGPA")).toFixed(2) +" / " +((JSON.parse(localStorage.getItem("unweightedGPA")))/20-1).toFixed(2))
    //loop over each individual semester
    for (let x=0; x<semesterLength; x++) {
        let sum=0
        let weightedSum=0
        doc.setFillColor(52,73,85);
        doc.rect(85, xValue, 40, 8, 'F');
        doc.setFontSize(14)
        doc.setTextColor(64,162,227)
        doc.text(93 ,xValue+5.5, 'Semester '+(x+1));
        let individualSemester = JSON.parse(localStorage.getItem("semester"+(x+1)))
        doc.setTextColor(0,0,0)
        xValue+=14
        doc.setFontSize(10)
        //loop over each grade course thing
        for (let y=0; y<individualSemester.length; y++) {
            let individualCourse = JSON.parse(localStorage.getItem(individualSemester[y]))
            let honors = ""
            if (individualCourse.weightedValue!="No") {
                honors = "  Honors"
            }
            doc.text(82, xValue, individualCourse.courseName + "      Grade: "+(+individualCourse.gradeValue).toFixed(2) + " U/W" + honors)
            console.log(individualSemester[y])
            console.log("Course Name: " +individualCourse.courseName)
            xValue+=5
            sum+=(+individualCourse.gradeValue)
            if (individualCourse.weightedValue=="No") {
                weightedSum+=(+individualCourse.gradeValue)
            }
            else {
                weightedSum+=(+individualCourse.gradeValue)+7
            }
        }
        xValue+=5
        console.log(individualSemester.length)
        console.log(sum)
        doc.text(85, xValue, "GPA: "+(weightedSum/individualSemester.length).toFixed(2) +"   U/W GPA: "+ (sum/individualSemester.length).toFixed(2))
        //for loop, looping through all of that stuff
        //for each thing, print out grade
        //outside of loop, calculate semester gpa
        xValue+=15
    }
    doc.output('dataurlnewwindow');
}

//updateGPA()
