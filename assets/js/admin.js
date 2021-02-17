function displayClearanceStatus(){
    while (tableBody.firstChild){
        tableBody.removeChild(tableBody.firstChild);
    }

       
    // student
    let studentTransaction = db.transaction(['studentOS'], 'readwrite');
    let studentObjectStore = studentTransaction.objectStore('studentOS');

    let studentListRequest = studentObjectStore.getAll();
    studentListRequest.onsuccess = e => {
   
         // library
        let libraryTransaction = db.transaction(['libraryOS'], 'readwrite');
        let libraryObjectStore = libraryTransaction.objectStore('libraryOS');

        // sports
        let sportsTransaction = db.transaction(['sportsOS'], 'readwrite');
        let sportsObjectStore = sportsTransaction.objectStore('sportsOS');

        // dorm
        let dormTransaction = db.transaction(['dormOS'], 'readwrite');
        let dormObjectStore = dormTransaction.objectStore('dormOS');

        // dept
        let deptTransaction = db.transaction(['deptOS'], 'readwrite');
        let deptObjectStore = deptTransaction.objectStore('deptOS');


        studentListRequest.result.forEach(cursor => {
            let libraryRequest = libraryObjectStore.get(cursor.studentId);
            libraryRequest.onsuccess = e => {
                if(typeof(libraryRequest.result) == 'undefined')
                    libraryColumn.textContent = 'Cleared';
                else
                    libraryColumn.textContent = 'Not yet';
            }
        
            
            let sportsRequest = sportsObjectStore.get(cursor.studentId);
            sportsRequest.onsuccess = e => {
                if(typeof(sportsRequest.result) == 'undefined')
                    sportsColumn.textContent = 'Cleared'
                else
                    sportsColumn.textContent = 'Not yet'
            }

            
            let dormRequest = dormObjectStore.get(cursor.studentId);
            dormRequest.onsuccess = e => {
                if(typeof(dormRequest.result) == 'undefined')
                    dormColumn.textContent = 'Cleared'
                else
                    dormColumn.textContent = 'Not yet'
            }
            
            
            let deptRequest = deptObjectStore.get(cursor.studentId);
            deptRequest.onsuccess = e => {
                if(typeof(deptRequest.result) == 'undefined')
                    deptColumn.textContent = 'Cleared'
                else
                    deptColumn.textContent = 'Not yet'
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

            studentIdColumn.textContent = cursor.studentId;
            firstNameColumn.textContent = cursor.firstName;
            lastNameColumn.textContent = cursor.lastName;
    

            // if (    libraryClearanceStatus == 'Cleared' & sportsClearanceStatus == 'Cleared' & dormClearanceStatus == 'Cleared' & deptClearanceStatus == 'Cleared'   )
            //     allColumn.textContent = 'Cleared'
            // else
            //     allColumn.textContent = 'Not yet'
            

        });   

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
