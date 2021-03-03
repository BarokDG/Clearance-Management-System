const clearanceRequestBtn = document.querySelectorAll('.btn-primary')
const libStatusIcon = document.querySelector('#libStatusIcon')
const spsStatusIcon = document.querySelector('#spsStatusIcon')
const dptStatusIcon = document.querySelector('#dptStatusIcon')
const drmStatusIcon = document.querySelector('#drmStatusIcon')

try {
    newLoanButton. addEventListener('click', getForm);
} catch (error) {
    console.log();
}
// Get form after modal opens
function getForm(){
    addForm = document.querySelector('.add-record-form');
    personalizeFormInputs();
    addRecordButton = document.querySelector('#addRecordButton');
    addRecordButton.addEventListener('click', addTransaction);
}



// ADD TRANSACTION ++++++++++++++++++++++++++++++++++
// addForm.addEventListener('submit', addTransaction);
function addTransaction(e){
    e.preventDefault();

    // get new record from ui and put into object
    let newRecord = {};
    for(let i = 0; i < addForm.childElementCount; i++){
        newRecord[addForm.children[i].firstElementChild.id] = addForm.children[i].firstElementChild.value;
    }
    console.log(newRecord);
    
    

    // CHECK IF STUDENT IS IN THE DATABASE

    // create transaction and get object store based on what dept is requesting access
    let transaction;
    let objectStore;
    // find out which table to store record on
    switch (currentDept) {
        // library
        case 'lib':
            transaction = db.transaction(['libraryOS'], 'readwrite');
            objectStore = transaction.objectStore('libraryOS');
            break;

        // sports
        case 'sps':
            transaction = db.transaction(['sportsOS'], 'readwrite');
            objectStore = transaction.objectStore('sportsOS');
            break;

        // dorm
        case 'drm':
            transaction = db.transaction(['dormOS'], 'readwrite');
            objectStore = transaction.objectStore('dormOS');
            break;

            // dept
            case 'dep':
            transaction = db.transaction(['deptOS'], 'readwrite');
            objectStore = transaction.objectStore('deptOS');
            break;

        default:
            console.log('Wrong department value found!');
            return;
            break;
    }

    // add record to correct OS
    let request = objectStore.add(newRecord);
    request.onsuccess = () => {
        // clear form / close modal
        console.log('Add request successful.');
    }
    
    transaction.oncomplete = () => {
        console.log('Succesfully added new record.');
        // display data
        displayTransactions();
    }

    transaction.onerror = () => {
        console.log('Error! Cannot add new record!' + request.error);
    }

}

///////////////////////////////////////////////





// DISPLAY TRANSACTIONS //////////////////////////
function displayTransactions(){
    try {
        while (tableBody.firstChild){
            tableBody.removeChild(tableBody.firstChild);
        }
    } catch (error) {
        console.log();
    }

    // create transaction and get object store based on what dept is requesting access
    let transaction;
    let objectStore;
    // find out which table to store record on
    switch (currentDept) {
        // library
        case 'lib':
            transaction = db.transaction(['libraryOS'], 'readwrite');
            objectStore = transaction.objectStore('libraryOS');
            break;

        // sports
        case 'sps':
            transaction = db.transaction(['sportsOS'], 'readwrite');
            objectStore = transaction.objectStore('sportsOS');
            break;

        // dorm
        case 'drm':
            transaction = db.transaction(['dormOS'], 'readwrite');
            objectStore = transaction.objectStore('dormOS');
            break;

        // dept
        case 'dep':
            transaction = db.transaction(['deptOS'], 'readwrite');
            objectStore = transaction.objectStore('deptOS');
            break;
        
        // admin
        case 'adm':
            // displayClearanceStatusForAdmin();
            return;
            break;

        // student
        case 'std':
            displayClearanceStatus();
            return;
            break;


        default:
            console.log('Wrong department value found!');
            return;
            break;
    }

    objectStore.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;

        if (cursor){
            const tableRow = document.createElement('tr');
            // const idColumn = document.createElement('th');
            const studentIdColumn = document.createElement('td');
            const firstNameColumn = document.createElement('td');
            const lastNameColumn = document.createElement('td');
            const deptColumn = document.createElement('td');
            const phoneColumn = document.createElement('td');
            const loanedColumn = document.createElement('td');
            // const dateLoanedColumn = document.createElement('td');

            // tableRow.appendChild(idColumn);
            tableRow.appendChild(studentIdColumn);
            tableRow.appendChild(firstNameColumn);
            tableRow.appendChild(lastNameColumn);
            tableRow.appendChild(deptColumn);
            tableRow.appendChild(phoneColumn);
            tableRow.appendChild(loanedColumn);
            tableRow.setAttribute('data-note-id', cursor.value.studentId);
                // delete
                const del = document.createElement('Button')

                del.classList.add('delete-button');
                
                tableRow.appendChild(del);
                del.innerHTML = '<i class="fas fa-trash-alt"></i>'

                del.onclick = deleteItem
            // tableRow.appendChild(dateLoanedColumn);
            tableBody.appendChild(tableRow);

            // idColumn.textContent = cursor.value.id;
            studentIdColumn.textContent = cursor.value.studentId;
            firstNameColumn.textContent = cursor.value.firstName;
            lastNameColumn.textContent = cursor.value.lastName;
            deptColumn.textContent = cursor.value.department;
            phoneColumn.textContent = cursor.value.phone;
            switch (currentDept) {
                case 'lib':
                    loanedColumn.textContent = cursor.value.bookTitle;
                    break;
                case 'sps':
                    loanedColumn.textContent = cursor.value.equipment;
                    break;
                case 'drm':
                    loanedColumn.textContent = cursor.value.dormNo;
                    break;
                default:
                    break;
            }
            // dateLoanedColumn.textContent = new Date(cursor.value.dateLoaned).toLocaleDateString('en-US');

            cursor.continue();
        }
        else {
            // Again, if list item is empty, display a 'No notes stored' message
            if(!tableBody.firstChild) {
                const tableRow = document.createElement('tr');
                const tableData = document.createElement('td');
                
                tableData.textContent = 'No transactions recorded.';
                tableRow.appendChild(tableData);
                tableBody.appendChild(tableRow);
            }
            // if there are no more cursor items to iterate through, say so
            console.log('Notes all displayed');
            }
    }

}
 // DELETE ITEM
function deleteItem(e) {
let transaction;
let objectStore;

// find out which table to store record on
switch (currentDept) {
    // library
    case 'lib':
        transaction = db.transaction(['libraryOS'], 'readwrite');
        objectStore = transaction.objectStore('libraryOS');
        break;

    // sports
    case 'sps':
        transaction = db.transaction(['sportsOS'], 'readwrite');
        objectStore = transaction.objectStore('sportsOS');
        break;

    // dorm
    case 'drm':
        transaction = db.transaction(['dormOS'], 'readwrite');
        objectStore = transaction.objectStore('dormOS');
        break;

        // dept
        case 'dep':
        transaction = db.transaction(['deptOS'], 'readwrite');
        objectStore = transaction.objectStore('deptOS');
        break;

    default:
        console.log('Wrong department value found!');
        break;
}
    if(confirm("Are you sure about the deletion?")){
    let noteId = e.target.parentNode.parentNode.getAttribute('data-note-id');
    console.log(e.target.parentNode.parentNode)
    console.log(noteId);
        objectStore.delete(noteId);

    //   report deletion
    transaction.oncomplete = function(){
        // delete parent of button 
        e.target.parentNode.parentNode.remove();
        console.log('record '+ noteId + 'deleted');
        // Again, if list item is empty, display a 'No notes stored' message
        if(!tableBody.firstChild) {
            const tableRow = document.createElement('tr');
            const tableData = document.createElement('td');
            
            tableData.textContent = 'No transactions recorded.';
            tableRow.appendChild(tableData);
            tableBody.appendChild(tableRow);
        }
        
    }
    }
}

//  SEARCH ITEM
try {
    search.addEventListener('keyup', searchRecord);
} catch (error) {
    console.log();
}
function searchRecord(e){
let transaction;
let objectStore;

// find out which table to store record on
switch (currentDept) {
    // library
    case 'lib':
        transaction = db.transaction(['libraryOS'], 'readwrite');
        objectStore = transaction.objectStore('libraryOS');
        break;

    // sports
    case 'sps':
        transaction = db.transaction(['sportsOS'], 'readwrite');
        objectStore = transaction.objectStore('sportsOS');
        break;

    // dorm
    case 'drm':
        transaction = db.transaction(['dormOS'], 'readwrite');
        objectStore = transaction.objectStore('dormOS');
        break;

        // dept
        case 'dep':
        transaction = db.transaction(['deptOS'], 'readwrite');
        objectStore = transaction.objectStore('deptOS');
        break;

        case 'adm':
            searchAdmin();
            return;
            break;

    default:
        console.log('Wrong department value found!');
        break;
}


while (tableBody.firstChild){
    tableBody.removeChild(tableBody.firstChild);
}

objectStore.openCursor().onsuccess= function(e){
    const cursor = e.target.result
    const searchItem = search.value
    
    if(cursor){
        if(cursor.value.studentId.indexOf(searchItem.toUpperCase())){
            
        }else{
            const tableRow = document.createElement('tr');
            const idColumn = document.createElement('th');
            const firstNameColumn = document.createElement('td');
            const lastNameColumn = document.createElement('td');
            const studentIdColumn = document.createElement('td');
            const deptColumn = document.createElement('td');
            const phoneColumn = document.createElement('td');
            const bookLoanedColumn = document.createElement('td');
            
            

            // const dateLoanedColumn = document.createElement('td');

            tableRow.appendChild(studentIdColumn);
            tableRow.appendChild(firstNameColumn);
            tableRow.appendChild(lastNameColumn);
            
            tableRow.appendChild(deptColumn);
            tableRow.appendChild(phoneColumn);
            tableRow.appendChild(bookLoanedColumn);
            
            // tableRow.appendChild(dateLoanedColumn);
            tableBody.appendChild(tableRow);

            // idColumn.textContent = cursor.value.id;
            firstNameColumn.textContent = cursor.value.firstName;
            lastNameColumn.textContent = cursor.value.lastName;
            studentIdColumn.textContent = cursor.value.studentId;
            deptColumn.textContent = cursor.value.department;
            phoneColumn.textContent = cursor.value.phone;
            bookLoanedColumn.textContent = cursor.value.bookTitle;
            tableRow.setAttribute('data-note-id', cursor.value.studentId);
            // delete
            const del = document.createElement('Button')
            del.innerHTML = '<i class="fas fa-trash-alt"></i>'

            del.onclick = deleteItem
            tableRow.appendChild(del);
            

        } cursor.continue();
    }
    else {
        // Again, if list item is empty, display a 'No notes stored' message
        if(!tableBody.firstChild) {
            const tableRow = document.createElement('tr');
            const tableData = document.createElement('td');
            
            tableData.textContent = 'No transaction record matched';
            tableRow.appendChild(tableData);
            tableBody.appendChild(tableRow);
        }
        // if there are no more cursor items to iterate through, say so
        console.log('Notes all displayed');
        }

}
}

// ADD CLEARANCE REQUEST
for (const btn of clearanceRequestBtn) {
    btn.addEventListener('click', addClearanceRequest)
}
function addClearanceRequest(e){
    let newRecord = {
        studentId : urlSearchParams.get('id'),
        deptId : e.target.id
    }

    let transaction = db.transaction(['clearanceOS'], 'readwrite');
    let objectStore = transaction.objectStore('clearanceOS');
    
    let request = objectStore.add(newRecord)

    request.onsuccess = () => {
        // clear form / close modal
        console.log('Add request successful.');
    }
    
    transaction.oncomplete = () => {
        console.log('Succesfully added new record.');
        // display data
        displayClearanceStatus();
    }

    transaction.onerror = () => {
        console.log('Error! Cannot add new record!' + request.error);
    }

}

function displayClearanceStatus(){
    let transaction = db.transaction(['clearanceOS'], 'readwrite');
    let objectStore = transaction.objectStore('clearanceOS');
    
    objectStore.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if(cursor){
            if (cursor.value.studentId == urlSearchParams.get('id')){
                switch (cursor.value.deptId) {

                    //  Library Display
                    case 'lib':
                        // add show description for failed clearances
                        if (cursor.value.status == 'cleared'){
                            libStatusIcon.className = 'fas fa-check-circle fa-5x text-success' 
                        } 
                        else if (cursor.value.status == 'rejected'){
                            libStatusIcon.className = 'fas fa-times-circle fa-5x text-danger'
                            libStatusIcon.parentElement.parentElement.firstElementChild.children[3].hidden = false 
                            libStatusIcon.parentElement.parentElement.firstElementChild.children[3].textContent += ` "${cursor.value.description}"`
                            libStatusIcon.parentElement.parentElement.firstElementChild.children[4].hidden = false 
                        }
                        else {
                            libStatusIcon.className = 'fas fa-user-clock fa-5x text-secondary' 
                        }
                        document.getElementById('lib').disabled = true
                        document.getElementById('lib').className = 'btn btn-secondary mb-2 disabled'
                        break;

                    // Sports Display
                    case 'sps':
                        if (cursor.value.status == 'cleared'){
                            spsStatusIcon.className = 'fas fa-check-circle fa-5x text-success' 
                        } 
                        else if (cursor.value.status == 'rejected'){
                            spsStatusIcon.className = 'fas fa-times-circle fa-5x text-danger'
                            spsStatusIcon.parentElement.parentElement.firstElementChild.children[3].hidden = false
                            spsStatusIcon.parentElement.parentElement.firstElementChild.children[3].textContent += ` "${cursor.value.description}"`
                            spsStatusIcon.parentElement.parentElement.firstElementChild.children[4].hidden = false 
                        }
                        else {
                            spsStatusIcon.className = 'fas fa-user-clock fa-5x text-secondary' 
                        }
                        document.getElementById('sps').disabled = true
                        document.getElementById('sps').className = 'btn btn-secondary mb-2 disabled'
                        break;

                    // Dept Display
                    case 'dep':
                        if (cursor.value.status == 'cleared'){
                            dptStatusIcon.className = 'fas fa-check-circle fa-5x text-success' 
                        } 
                        else if (cursor.value.status == 'rejected'){
                            dptStatusIcon.className = 'fas fa-times-circle fa-5x text-danger'
                            dptStatusIcon.parentElement.parentElement.firstElementChild.children[3].hidden = false
                            dptStatusIcon.parentElement.parentElement.firstElementChild.children[3].textContent += ` "${cursor.value.description}"`
                            dptStatusIcon.parentElement.parentElement.firstElementChild.children[4].hidden = false 
                        }
                        else {
                            dptStatusIcon.className = 'fas fa-user-clock fa-5x text-secondary' 
                        }
                        document.getElementById('dep').disabled = true
                        document.getElementById('dep').className = 'btn btn-secondary mb-2 disabled'
                        break;

                    // Dorm Display
                    case 'drm':
                        if (cursor.value.status == 'cleared'){
                            drmStatusIcon.className = 'fas fa-check-circle fa-5x text-success' 
                        } 
                        else if (cursor.value.status == 'rejected'){
                            drmStatusIcon.className = 'fas fa-times-circle fa-5x text-danger'
                            drmStatusIcon.parentElement.parentElement.firstElementChild.children[3].hidden = false
                            drmStatusIcon.parentElement.parentElement.firstElementChild.children[3].textContent += ` "${cursor.value.description}"`
                            drmStatusIcon.parentElement.parentElement.firstElementChild.children[4].hidden = false 
                        }
                        else {
                            drmStatusIcon.className = 'fas fa-user-clock fa-5x text-secondary' 
                        }
                        document.getElementById('drm').disabled = true
                        document.getElementById('drm').className = 'btn btn-secondary mb-2 disabled'
                        break;
                
                    default:
                        break;
                }
            }
            cursor.continue()
        }
    }


}