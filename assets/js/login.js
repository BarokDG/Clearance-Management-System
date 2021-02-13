const loginbtn = document.querySelector('.btn');


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
        // displayTransactions();
        addStaffMembers();
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
        // staffOS.createIndex('semesterStatus', 'semesterStatus', { unique : false });
        
        
        console.log('ClearanceDB upgraded.');
    }
    //////////////////////////////////////////

    
    // Add staff members
    function addStaffMembers() {
	// Admin can add new staff here
        let newRecord = {
            'firstName' : 'Abebe',
            'lastName' : 'Kebede',
            // studentId must be unique
            'staffId' : 'S95',
            'phone' : 0911445566,
            'password' : 'cldb'
        };
        transaction = db.transaction(['staffOS'], 'readwrite');
        objectStore = transaction.objectStore('staffOS');
        // add record to correct OS
        let requestAddStaff = objectStore.add(newRecord);
        requestAddStaff.onsuccess = () => {
            // clear form / close modal
            console.log('Add request successful.');
        }
        
        transaction.oncomplete = () => {
            console.log('Succesfully added new record.');
            // display data
            // displayTransactions();
        }

        transaction.onerror = () => {
            console.log('Error! Cannot add new record!' + request.error);
        }
    }


/////////////////////
    loginbtn.addEventListener('click', login);

    function login (e){

        e.preventDefault()

        let staffId = document.querySelector('#staffId').value;
        let password = document.querySelector('#password').value;

        let objectStore = transaction = db.transaction(["staffOS"]).objectStore("staffOS");
        let request =  objectStore.get(staffId);
        
        request.onerror =  function(e){
            alert("user not Authenticated")
            return;
        };
         request.onsuccess = function(e){
             if(password != request.result.password){
                 alert("user not authenticated")
                 return;    
            }
            console.log("You are Logged IN")
        }      
    }

}