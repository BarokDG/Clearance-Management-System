// Get UI elements
const tableBody = document.querySelector('.table-body');
const newLoanButton = document.querySelector('#gradient-button');
var addForm;
var addRecordButton;

// Any method to get the dept of current user
// --Use URL or as a single page app
const currentDept = document.querySelector('#dept');


let db;

onload = function (){
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
        let libraryOS = db.createObjectStore('libraryOS', { keyPath: 'id', autoIncrement:true });
        
        // creating columns
        libraryOS.createIndex('firstName', 'firstName', { unique : false });
        libraryOS.createIndex('lastName', 'lastName', { unique : false });
        libraryOS.createIndex('studentId', 'studentId', { unique : true });
        libraryOS.createIndex('phone', 'phone', { unique : false });
        libraryOS.createIndex('department', 'department', { unique : false });
        libraryOS.createIndex('bookTitle', 'bookTitle', { unique : false });
        libraryOS.createIndex('dateLoaned', 'dateLoaned', { unique : false });
        

        /////// Sports Dept Table
        let sportsOS = db.createObjectStore('sportsOS', { keyPath: 'id', autoIncrement:true });
        
        // creating columns
        sportsOS.createIndex('firstName', 'firstName', { unique : false });
        sportsOS.createIndex('lastName', 'lastName', { unique : false });
        sportsOS.createIndex('studentId', 'studentId', { unique : true });
        sportsOS.createIndex('phone', 'phone', { unique : false });
        sportsOS.createIndex('department', 'department', { unique : false });
        sportsOS.createIndex('equipment', 'equipment', { unique : false });
        sportsOS.createIndex('dateLoaned', 'dateLoaned', { unique : false });
        

        ////// Dormitory Dept Table 
        let dormOS = db.createObjectStore('dormOS', { keyPath: 'id', autoIncrement:true });
        
        // creating columns
        dormOS.createIndex('firstName', 'firstName', { unique : false });
        dormOS.createIndex('lastName', 'lastName', { unique : false });
        dormOS.createIndex('studentId', 'studentId', { unique : true });
        dormOS.createIndex('phone', 'phone', { unique : false });
        dormOS.createIndex('department', 'department', { unique : false });
        dormOS.createIndex('dormNo', 'dormNo', { unique : false });
        dormOS.createIndex('dormCondition', 'dormCondition', { unique : false })
        dormOS.createIndex('dateLoaned', 'dateLoaned', { unique : false });
        

        ////// Department Table 
        let deptOS = db.createObjectStore('deptOS', { keyPath: 'id', autoIncrement:true });
        
        // creating columns
        deptOS.createIndex('firstName', 'firstName', { unique : false });
        deptOS.createIndex('lastName', 'lastName', { unique : false });
        deptOS.createIndex('studentId', 'studentId', { unique : true });
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
        staffOS.createIndex('semesterStatus', 'semesterStatus', { unique : false });
        
        
        console.log('ClearanceDB upgraded.');
    }
    //////////////////////////////////////////


    newLoanButton.addEventListener('click', getForm);
    // Get form after modal opens
    function getForm(){
        addForm = document.querySelector('.add-record-form');
        addRecordButton = document.querySelector('#addRecordButton');
        addRecordButton.addEventListener('click', addTransaction);
    }

    // addForm.addEventListener('submit', addTransaction);
    function addTransaction(e){
        e.preventDefault();

        // get new record from ui and put into object
        let newRecord = {};
        for(let i = 0; i < addForm.childElementCount; i++){
            newRecord[addForm.children[i].firstElementChild.id] = addForm.children[i].firstElementChild.value;
        }
        console.log(newRecord);
        
        // this obj literal will differ for d/f depts
        // let newRecord = {
        //     'firstName' : 'Abebe',
        //     'lastName' : 'Kebede',
        //     // studentId must be unique
        //     'studentId' : 'ATR/1113/11',
        //     'phone' : 0911445566,
        //     'department' : 'Mechanical',
        //     'bookTitle' : 'Stress: Calculating on Moving Objects By K.J. Brown',
        //     'dateLoaned' : new Date('2/11/2021').getTime()
        // };

        // get deptId from url / other method
        let dept = 01;


        // create transaction and get object store based on what dept is requesting access
        let transaction;
        let objectStore;
        // find out which table to store record on
        switch (dept) {
            // library
            case 01:
                transaction = db.transaction(['libraryOS'], 'readwrite');
                objectStore = transaction.objectStore('libraryOS');
                break;

            // sports
            case 02:
                transaction = db.transaction(['sportsOS'], 'readwrite');
                objectStore = transaction.objectStore('sportsOS');
                break;

            // dorm
            case 03:
                transaction = db.transaction(['dormOS'], 'readwrite');
                objectStore = transaction.objectStore('dormOS');
                break;

             // dept
             case 04:
                transaction = db.transaction(['deptOS'], 'readwrite');
                objectStore = transaction.objectStore('deptOS');
                break;

            default:
                console.log('Wrong department value found!');
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

    function displayTransactions(){
        while (tableBody.firstChild){
            tableBody.removeChild(tableBody.firstChild);
        }

        // create transaction and get object store based on what dept is requesting access
        let transaction;
        let objectStore;
        let dept = 01;
        // find out which table to store record on
        switch (dept) {
            // library
            case 01:
                transaction = db.transaction(['libraryOS'], 'readwrite');
                objectStore = transaction.objectStore('libraryOS');
                break;

            // sports
            case 02:
                transaction = db.transaction(['sportsOS'], 'readwrite');
                objectStore = transaction.objectStore('sportsOS');
                break;

            // dorm
            case 03:
                transaction = db.transaction(['dormOS'], 'readwrite');
                objectStore = transaction.objectStore('dormOS');
                break;

             // dept
             case 04:
                transaction = db.transaction(['deptOS'], 'readwrite');
                objectStore = transaction.objectStore('deptOS');
                break;

            default:
                console.log('Wrong department value found!');
                break;
        }

        objectStore.openCursor().onsuccess = (e) => {
            let cursor = e.target.result;

            if (cursor){
                const tableRow = document.createElement('tr');
                const idColumn = document.createElement('th');
                const firstNameColumn = document.createElement('td');
                const lastNameColumn = document.createElement('td');
                const studentIdColumn = document.createElement('td');
                const deptColumn = document.createElement('td');
                const phoneColumn = document.createElement('td');
                const bookLoanedColumn = document.createElement('td');
                // const dateLoanedColumn = document.createElement('td');

                tableRow.appendChild(idColumn);
                tableRow.appendChild(firstNameColumn);
                tableRow.appendChild(lastNameColumn);
                tableRow.appendChild(studentIdColumn);
                tableRow.appendChild(deptColumn);
                tableRow.appendChild(phoneColumn);
                tableRow.appendChild(bookLoanedColumn);
                // tableRow.appendChild(dateLoanedColumn);
                tableBody.appendChild(tableRow);

                idColumn.textContent = cursor.value.id;
                firstNameColumn.textContent = cursor.value.firstName;
                lastNameColumn.textContent = cursor.value.lastName;
                studentIdColumn.textContent = cursor.value.studentId;
                deptColumn.textContent = cursor.value.department;
                phoneColumn.textContent = cursor.value.phone;
                bookLoanedColumn.textContent = cursor.value.bookTitle;
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