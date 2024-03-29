const tableBodyA = document.querySelector('.table-body-requests')

if(currentDept == 'adm'){

    
    function displayClearanceStatusForAdmin(){
        const navSmall = document.querySelector('.sidebar-small')
        const navB = document.querySelector('.sidebar')
        
        // disable loan link for sidebar and sidebar small
        navSmall.children[2].style.display = 'none'
        navB.children[2].style.display = 'none'
        
        // change dash to admin.html
        navSmall.children[1].href = './admin.html?dp=adm'
        navB.children[1].href = './admin.html?dp=adm'

    
        while (tableBodyA.firstChild){
            tableBodyA.removeChild(tableBodyA.firstChild);
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
                    studentToRequestMap[cursor.value.studentId][cursor.value.deptId] = cursor.value.status
                    cursor.continue()
                }
            }
            printStudentClearanceStatus(studentToRequestMap)
    
        }
        
    }

    
    search.addEventListener('keyup', searchAdmin);
    function searchAdmin(e){
        let searchItem  = search.value
        let collection = document.querySelectorAll(".collection-item");
        
        collection.forEach((item) =>{
            if(item.children[0].textContent.includes(searchItem.toUpperCase())){
                item.hidden = false
            }
            else{
                item.hidden = true
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
            const editColumn = document.createElement('td');

            tableRow.className = "collection-item";
            
            tableRow.appendChild(studentIdColumn);
            tableRow.appendChild(firstNameColumn);
            tableRow.appendChild(lastNameColumn);
            tableRow.appendChild(libraryColumn);
            tableRow.appendChild(sportsColumn);
            tableRow.appendChild(dormColumn);
            tableRow.appendChild(deptColumn);
            tableRow.appendChild(allColumn);
            tableRow.appendChild(editColumn);
            tableBodyA.appendChild(tableRow)
            
            editColumn.innerHTML = `<i class="fas fa-edit" style="cursor:pointer" data-toggle="modal" data-target="#exampleModal"></i>`;
            
            // ATTACH event listner for latest update button
            editBtnNodeList = document.querySelectorAll('.fa-edit')
            editBtn = editBtnNodeList[editBtnNodeList.length - 1]
            editBtn.addEventListener('click', getClearanceModal)
    
            studentIdColumn.textContent = student
            setTimeout(() => {
                libraryColumn.innerHTML = record[student]['lib'] == 'cleared' ? '<i class="fas fa-check-circle" style="color:green"></i>' : '<i class="fas fa-times-circle" style="color:red"></i>'
                sportsColumn.innerHTML = record[student]['sps'] == 'cleared' ? '<i class="fas fa-check-circle" style="color:green"></i>' : '<i class="fas fa-times-circle" style="color:red"></i>'
                deptColumn.innerHTML = record[student]['dep'] == 'cleared' ? '<i class="fas fa-check-circle" style="color:green"></i>' : '<i class="fas fa-times-circle" style="color:red"></i>'
                dormColumn.innerHTML = record[student]['drm'] == 'cleared' ? '<i class="fas fa-check-circle" style="color:green"></i>' : '<i class="fas fa-times-circle" style="color:red"></i>'
                allColumn.innerHTML = record[student]['lib'] && record[student]['sps'] && record[student]['dep'] && record[student]['drm'] == 'cleared' ? '<i class="fas fa-check-circle" style="color:green"></i>' : '<i class="fas fa-times-circle" style="color:red"></i>'  
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
}