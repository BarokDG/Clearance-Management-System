function displayClearanceRequests(){
    console.log(tableBody.firstElementChild);
    while (tableBody.firstElementChild){
        tableBody.removeChild(tableBody.firstChild);
    }

    let transaction = db.transaction(['clearanceOS'], 'readwrite');
    let objectStore = transaction.objectStore('clearanceOS');
    let requestingStudents = []
    
    objectStore.openCursor().onsuccess = e => {
        let cursor = e.target.result;

        if(cursor){
            if(cursor.value.deptId == currentDept){
                requestingStudents.push(cursor.value.studentId)
                let transactionStudentOS = db.transaction(['studentOS'], 'readwrite');
                let studentOS = transactionStudentOS.objectStore('studentOS');
                
                for (const requestingStudentId of requestingStudents){
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
                        const editColumn = document.createElement('td');
                        // const dateLoanedColumn = document.createElement('td');
            
                        // tableRow.appendChild(idColumn);
                        tableRow.appendChild(studentIdColumn);
                        tableRow.appendChild(firstNameColumn);
                        tableRow.appendChild(lastNameColumn);
                        tableRow.appendChild(deptColumn);
                        tableRow.appendChild(phoneColumn);
                        tableRow.appendChild(editColumn);
                        
                        tableBody.appendChild(tableRow);
                        studentIdColumn.textContent = request.result.studentId;
                        firstNameColumn.textContent = request.result.firstName;
                        lastNameColumn.textContent = request.result.lastName;
                        // deptColumn.textContent = cursor.value.department;
                        phoneColumn.textContent = request.result.phone;
                        // editColumn.i
                        
            
                    }
                }
            }
            cursor.continue()
        }
    }

}