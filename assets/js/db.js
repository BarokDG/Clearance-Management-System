// Get UI elements
const tableHeader = document.querySelector('.thead');
const tableBody = document.querySelector('.table-body');
const newLoanButton = document.querySelector('#gradient-button');
const search= document.querySelector('#search')
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
        personalizeTableHeader();
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
        
        transaction.oncomplete = () => {
            console.log('Succesfully added new record.');
            // display data
            displayTransactions();
        }

        transaction.onerror = () => {
            console.log('Error! Cannot add new record!' + request.error);
        }

    }

    
}