const loginbtn = document.querySelector('.btn');

const show_password = document.querySelector('#show_password');
const passwordInput = document.querySelector('#password');


let db;

onload = function (){
    show_password.addEventListener('click', show);

    function show () {
        show_password.classList.toggle("fa-eye-slash");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }
    
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
        addStudentMembers();
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
        let staffOS = db.createObjectStore('staffOS', { keyPath: 'staffId', autoIncrement:false });
        
        // creating columns
        staffOS.createIndex('firstName', 'firstName', { unique : false });
        staffOS.createIndex('lastName', 'lastName', { unique : false });
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

    
    // Add staff members
    function addStaffMembers() {
	// Admin can add new staff here
        let newRecord = {
        
            'firstName' : 'Abebe',
            'lastName' : 'Kebede',
            // studentId must be unique
            'staffId' : 'A1',
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

    // Add staff members
    function addStudentMembers() {
        // Admin can add new staff here
            let newRecord = {
            
                'firstName' : 'A',
                'lastName' : 'B',
                // studentId must be unique
                'studentId' : 'TT/99/01',
                'phone' : 0911445566,
            };
            transaction = db.transaction(['studentOS'], 'readwrite');
            objectStore = transaction.objectStore('studentOS');
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

        let objectStore = db.transaction(["staffOS"]).objectStore("staffOS");
        let request =  objectStore.get(staffId);
        

        request.onerror =  function(e){
            alert("user not Authenticated")
            return;
        };
        request.onsuccess = function(e){
            if(typeof(request.result) == 'undefined'){
                alert("user not authenticated")
                return;
            }
            else if(password != request.result.password){
                 alert("user not authenticated")
                 return;    
            }else{
                // The first letter of the staff ID indicates their department
                let deptID;
                switch (staffId[0]) {
                    case 'L':
                        deptID = 'lib';
                        break;
                    case 'S':
                        deptID = 'sps';
                        break;
                    case 'D':
                        deptID = 'drm';
                        break;
                    case 'F':
                        deptID = 'dep';
                        break;
                    case 'A':
                        deptID = 'adm';
                        window.location.replace('./admin.html?' + 'dp=' + deptID);
                        return;
                    
                    default:
                        break;
                };
                window.location.replace('./dash.html?' + 'dp=' + deptID);
                 
            }
            
            console.log("You are Logged IN")
        }      
    }

}