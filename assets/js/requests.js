var editBtn


function displayClearanceRequests(){
    while (tableBody.firstElementChild){
        tableBody.removeChild(tableBody.firstChild);
    }

    let transaction = db.transaction(['clearanceOS'], 'readwrite');
    let objectStore = transaction.objectStore('clearanceOS');
    let requestingStudents = {}
    let emptyCheck = true

    objectStore.openCursor().onsuccess = e => {
        let cursor = e.target.result;

        if(cursor){
            if(cursor.value.deptId == currentDept){
                emptyCheck = false
                requestingStudents[cursor.value.studentId] = cursor.value.status
            }
            cursor.continue()
        }
        // when the cursor finishes
        else if(!emptyCheck){


            let transactionStudentOS = db.transaction(['studentOS'], 'readwrite');
            let studentOS = transactionStudentOS.objectStore('studentOS');
            
            console.log(requestingStudents);
            for (const requestingStudentId in requestingStudents){
                let request = studentOS.get(requestingStudentId)
                
                request.onerror = function(e){
                    console.log('Cannot access data of student ' + requestingStudentId);
                }
        
                request.onsuccess = function(e){
                    const tableRow = document.createElement('tr');
                    // const idColumn = document.createElement('th');
                    const studentIdColumn = document.createElement('td');
                    const firstNameColumn = document.createElement('td');
                    const lastNameColumn = document.createElement('td');
                    const deptColumn = document.createElement('td');
                    const phoneColumn = document.createElement('td');
                    const statusColumn = document.createElement('td'); 
                    const editColumn = document.createElement('td');
        
                    // tableRow.appendChild(idColumn);
                    tableRow.appendChild(studentIdColumn);
                    tableRow.appendChild(firstNameColumn);
                    tableRow.appendChild(lastNameColumn);
                    tableRow.appendChild(deptColumn);
                    tableRow.appendChild(phoneColumn);
                    tableRow.appendChild(statusColumn);
                    tableRow.appendChild(editColumn);
                    tableBody.appendChild(tableRow);
                    
                    studentIdColumn.textContent = request.result.studentId;
                    firstNameColumn.textContent = request.result.firstName;
                    lastNameColumn.textContent = request.result.lastName;
                    // deptColumn.textContent = cursor.value.department;
                    phoneColumn.textContent = request.result.phone;
                    statusColumn.innerHTML = requestingStudents[requestingStudentId] == 'cleared' ? '<i class="fas fa-check-circle" style="color:green"></i>' : '<i class="fas fa-times-circle" style="color:red"></i>';
                    editColumn.innerHTML = `<i class="fas fa-edit" style="cursor:pointer" data-toggle="modal" data-target="#exampleModal"></i>`;
                    
                    // ATTACH event listner for latest update button
                    editBtnNodeList = document.querySelectorAll('.fa-edit')
                    editBtn = editBtnNodeList[editBtnNodeList.length - 1]
                    editBtn.addEventListener('click', getClearanceModal)
                }
            }
        }
    }

}

function getClearanceModal(){
    console.log('1');
    const updateBtn = document.querySelector('#updateClearanceStatusButton')
    updateBtn.addEventListener('click', updateClearanceStatus)
    document.querySelector('#modalId').textContent = editBtn.parentElement.parentElement.firstElementChild.textContent
}

function updateClearanceStatus(){
    console.log('uuuu');
    const clearedRadioBtn = document.querySelector('.form-check-input-cleared')
    const rejectedRadioBtn = document.querySelector('.form-check-input-rejected')
    const descriptionTextArea = document.querySelector('.form-control-description')
    const studentId = editBtn.parentElement.parentElement.firstElementChild.textContent

    let transaction = db.transaction(['clearanceOS'], 'readwrite');
    let objectStore = transaction.objectStore('clearanceOS');
    let clearanceRequestId
    
    objectStore.openCursor().onsuccess = e => {
        let cursor = e.target.result;

        if(cursor){
            if(cursor.value.studentId == studentId && cursor.value.deptId == currentDept){
                clearanceRequestId = cursor.value.requestId

                // Get the to-do list object that has this title as it's title
                const objectStoreTitleRequest = objectStore.get(clearanceRequestId);
                
                if (clearedRadioBtn.checked){
                    console.log('cleared');
                    objectStoreTitleRequest.onsuccess = () => {
                        const data = objectStoreTitleRequest.result;
                        data.status = "cleared";
                        data.description = '';
                        const updateTitleRequest = objectStore.put(data);
                
                        updateTitleRequest.onsuccess = () => {
                            console.log('Successfully updated clearance request');
                            displayClearanceRequests();
                        };
                    };
                }
                else if(rejectedRadioBtn.checked){
                    console.log('rejected');
                    objectStoreTitleRequest.onsuccess = () => {
                        const data = objectStoreTitleRequest.result;
                        data.status = "rejected";
                        data.description = descriptionTextArea.value;
                        const updateTitleRequest = objectStore.put(data);
                
                        updateTitleRequest.onsuccess = () => {
                            console.log('Successfully updated clearance request');
                            displayClearanceRequests();
                        };
                    };
                }
            }
            cursor.continue()
        }
    }
}

function toggleDescription(){
    if (document.getElementById('inlineRadio2').checked)
        document.getElementById('rejDesc').style.display = 'block'
    else if (document.getElementById('inlineRadio1').checked)
        document.getElementById('rejDesc').style.display = 'none'

}