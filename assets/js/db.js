// Get UI elements
const tableHeader = document.querySelector('.thead-dark');
const tableBody = document.querySelector('.table-body');
const newLoanButton = document.querySelector('#gradient-button');
const anchors = document.querySelectorAll('a');
var addForm;
var addRecordButton;

// Any method to get the dept of current user
// --Use URL or as a single page app
const urlSearchParams = new URLSearchParams(window.location.search);
const currentDept = urlSearchParams.get('dp');


let db;


onload = function (){
    // Attaching ID to outgoing urls
    for (let i = 0; i < anchors.length; i++) {
        if (anchors[i].href.endsWith('.html')) {
            anchors[i].href += '?dp=' + currentDept;
        }
    }


    // Personalization Features
    personalizeTableHeader();


    // //////// Defining database schema
    // Request to open or create database
    let request = indexedDB.open('ClearanceDB', 1);
    
    request.onerror = () => {
        console.log('Error! ClearanceDB not opened.');
    }

    request.onsuccess = () => {
        console.log('ClearanceDB opened.');
        db = request.result;
        // Insert loan transaction data into UI
        displayTransactions();
    }

    request.onupgradeneeded = (e) => {
        let db = e.target.result;
        
        ////// Library Dept Table
        let libraryOS = db.createObjectStore('libraryOS', { keyPath: 'studentId', autoIncrement:false });
        
        // creating columns
        libraryOS.createIndex('firstName', 'firstName', { unique : false });
        libraryOS.createIndex('lastName', 'lastName', { unique : false });
        // libraryOS.createIndex('studentId', 'studentId', { unique : true });
        libraryOS.createIndex('phone', 'phone', { unique : false });
        libraryOS.createIndex('department', 'department', { unique : false });
        libraryOS.createIndex('bookTitle', 'bookTitle', { unique : false });
        libraryOS.createIndex('dateLoaned', 'dateLoaned', { unique : false });
        

        /////// Sports Dept Table
        let sportsOS = db.createObjectStore('sportsOS', { keyPath: 'studentId', autoIncrement:false });
        
        // creating columns
        sportsOS.createIndex('firstName', 'firstName', { unique : false });
        sportsOS.createIndex('lastName', 'lastName', { unique : false });
        // sportsOS.createIndex('studentId', 'studentId', { unique : true });
        sportsOS.createIndex('phone', 'phone', { unique : false });
        sportsOS.createIndex('department', 'department', { unique : false });
        sportsOS.createIndex('equipment', 'equipment', { unique : false });
        sportsOS.createIndex('dateLoaned', 'dateLoaned', { unique : false });
        

        ////// Dormitory Dept Table 
        let dormOS = db.createObjectStore('dormOS', { keyPath: 'studentId', autoIncrement:false });
        
        // creating columns
        dormOS.createIndex('firstName', 'firstName', { unique : false });
        dormOS.createIndex('lastName', 'lastName', { unique : false });
        // dormOS.createIndex('studentId', 'studentId', { unique : true });
        dormOS.createIndex('phone', 'phone', { unique : false });
        dormOS.createIndex('department', 'department', { unique : false });
        dormOS.createIndex('dormNo', 'dormNo', { unique : false });
        dormOS.createIndex('dateLoaned', 'dateLoaned', { unique : false });
        

        ////// Department Table 
        let deptOS = db.createObjectStore('deptOS', { keyPath: 'studentId', autoIncrement:false });
        
        // creating columns
        deptOS.createIndex('firstName', 'firstName', { unique : false });
        deptOS.createIndex('lastName', 'lastName', { unique : false });
        // deptOS.createIndex('studentId', 'studentId', { unique : true });
        deptOS.createIndex('phone', 'phone', { unique : false });
        deptOS.createIndex('semesterStatus', 'semesterStatus', { unique : false });
        

        ////// Staff Table 
        let staffOS = db.createObjectStore('staffOS', { keyPath: 'id', autoIncrement:true });
        
        // creating columns
        staffOS.createIndex('firstName', 'firstName', { unique : false });
        staffOS.createIndex('lastName', 'lastName', { unique : false });
        staffOS.createIndex('staffId', 'staffId', { unique : true });
        // --encrypt password
        staffOS.createIndex('password', 'password', { unique : false });
        staffOS.createIndex('phone', 'phone', { unique : false });



        ////// Students Table 
        let studentOS = db.createObjectStore('studentOS', { keyPath: 'studentId', autoIncrement:false });
        
        // creating columns
        studentOS.createIndex('firstName', 'firstName', { unique : false });
        studentOS.createIndex('lastName', 'lastName', { unique : false });
        studentOS.createIndex('phone', 'phone', { unique : false });
        
        
        console.log('ClearanceDB upgraded.');
    }
    //////////////////////////////////////////


    newLoanButton.addEventListener('click', getForm);
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


    // DISPLAY TRANSACTIONS //////////////////////////
    function displayTransactions(){
        while (tableBody.firstChild){
            tableBody.removeChild(tableBody.firstChild);
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

}