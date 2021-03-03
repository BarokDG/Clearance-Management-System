function displayClearanceStatusForAdmin(){
    while (tableBody.firstChild){
        tableBody.removeChild(tableBody.firstChild);
    }

    // studentOS
    let studentTransaction = db.transaction(['studentOS'], 'readwrite');
    let studentObjectStore = studentTransaction.objectStore('studentOS');

    let studentListRequest = studentObjectStore.getAll();
    var studentToRequestMap = {}

    studentListRequest.onsuccess = e => {
   
        studentListRequest.result.forEach(cursor => { 
            studentToRequestMap[cursor.studentId] = new Map()
        });
        
        let clearanceTransaction = db.transaction(['clearanceOS'], 'readwrite');
        let clearanceObjectStore = clearanceTransaction.objectStore('clearanceOS');

        clearanceObjectStore.openCursor().onsuccess = e => {
            let cursor = e.target.result;

            if(cursor){
                // studentToRequestMap[cursor.value.studentId].push()
                studentToRequestMap[cursor.value.studentId][cursor.value.deptId] = cursor.value.status
                // studentToRequestMap[cursor.value.studentId][studentToRequestMap[cursor.value.studentId].length - 1].push(cursor.value.status)
                cursor.continue()
            }
        }
        printStudentClearanceStatus(studentToRequestMap)
        console.log(studentToRequestMap);
        // const tableRow = document.createElement('tr');
        // const studentIdColumn = document.createElement('td');
        // const firstNameColumn = document.createElement('td');
        // const lastNameColumn = document.createElement('td');
        // const libraryColumn = document.createElement('td');
        // const sportsColumn = document.createElement('td');
        // const dormColumn = document.createElement('td');
        // const deptColumn = document.createElement('td');
        // const allColumn = document.createElement('td');
        // tableRow.className = "collection-item";
        
        // tableRow.appendChild(studentIdColumn);
        // tableRow.appendChild(firstNameColumn);
        // tableRow.appendChild(lastNameColumn);
        // tableRow.appendChild(libraryColumn);
        // tableRow.appendChild(sportsColumn);
        // tableRow.appendChild(dormColumn);
        // tableRow.appendChild(deptColumn);
        // tableRow.appendChild(allColumn);
        // tableBody.appendChild(tableRow)

        // studentIdColumn.textContent = cursor.studentId;
        // firstNameColumn.textContent = cursor.firstName;
        // lastNameColumn.textContent = cursor.lastName;


        // // if (    libraryClearanceStatus == 'Cleared' & sportsClearanceStatus == 'Cleared' & dormClearanceStatus == 'Cleared' & deptClearanceStatus == 'Cleared'   )
        // //     allColumn.textContent = 'Cleared'
        // // else
        // //     allColumn.textContent = 'Not yet'
        

    }
    
}
search.addEventListener('keyup', searchAdmin);
function searchAdmin(e){
    let searchItem  = search.value
    let collection = document.querySelectorAll(".collection-item");

    collection.forEach((item) =>{
        if(item.textContent.indexOf(searchItem.toUpperCase())){
            item.style.display = "none";
           
            
        }
        else{
            item.style.display = "flex-inline"
            
        }
    });

    console.log("task filter ... ")
}

function printStudentClearanceStatus(record){
    
    for(const student in record){
        for(const f in record[student]){
            console.log('11');
        }
        const tableRow = document.createElement('tr');
        const studentIdColumn = document.createElement('td');
        const firstNameColumn = document.createElement('td');
        const lastNameColumn = document.createElement('td');
        const libraryColumn = document.createElement('td');
        const sportsColumn = document.createElement('td');
        const dormColumn = document.createElement('td');
        const deptColumn = document.createElement('td');
        const allColumn = document.createElement('td');
        tableRow.className = "collection-item";
        
        tableRow.appendChild(studentIdColumn);
        tableRow.appendChild(firstNameColumn);
        tableRow.appendChild(lastNameColumn);
        tableRow.appendChild(libraryColumn);
        tableRow.appendChild(sportsColumn);
        tableRow.appendChild(dormColumn);
        tableRow.appendChild(deptColumn);
        tableRow.appendChild(allColumn);
        tableBody.appendChild(tableRow)

        studentIdColumn.textContent = student
        setTimeout(() => {
            libraryColumn.textContent = record[student]['lib']
            sportsColumn.textContent = record[student]['sps']
            deptColumn.textContent = record[student]['dep']
            dormColumn.textContent = record[student]['drm']
        }, 100)
        
        let studentTransaction = db.transaction(['studentOS'], 'readwrite');
        let studentObjectStore = studentTransaction.objectStore('studentOS');
        
        let studentListRequest = studentObjectStore.get(student);
        
        studentListRequest.onsuccess = e => {
            firstNameColumn.textContent = e.target.result.firstName;
            lastNameColumn.textContent = e.target.result.lastName;
        }
    
    }
}