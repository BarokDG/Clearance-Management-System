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
        studentOS.createIndex('password', 'password', { unique : false })
        studentOS.createIndex('phone', 'phone', { unique : false });



        /////// Clearance Table
        let clearanceOS = db.createObjectStore('clearanceOS', { keyPath: 'requestId', autoIncrement:true });

        // creating columns
        clearanceOS.createIndex('studentId', 'studentId', { unique : false });
        clearanceOS.createIndex('deptId', 'deptId', { unique : false });
        clearanceOS.createIndex('status', 'status', { unique : false });
        clearanceOS.createIndex('description', 'description', { unique : false });


        
        console.log('ClearanceDB upgraded.');
    }
    //////////////////////////////////////////

    
    // Add staff members
    function addStaffMembers() {
	// A0dmin can add new staff here
        let librarystaff = {
        
            'firstName' : 'Abebe',
            'lastName' : 'Kebede',
            // studentId must be unique
            'staffId' : 'L96',
            'phone' : 0911445566,
            'password' : 'cldb'    
        };
        let sportsstaff = {
            'firstName' : 'Kebede',
            'lastName' : 'Belechu',
            // studentId must be unique
            'staffId' : 'S96',
            'phone' : 0911445066,
            'password' : 'cldb'    
        };
        let dormstaff = {
            'firstName' : 'Belechu',
            'lastName' : 'Alemayehu',
            // studentId must be unique
            'staffId' : 'D96',
            'phone' : 0911445066,
            'password' : 'cldb'    
        };
        let departmentstaff = {
            'firstName' : 'Alemitu',
            'lastName' : 'Belechu',
            // studentId must be unique
            'staffId' : 'F96',
            'phone' : 0911445066,
            'password' : 'cldb'    
        };
        let clearanceadmin = {
            'firstName' : 'Kassech',
            'lastName' : 'Belechu',
            // studentId must be unique
            'staffId' : 'A1',
            'phone' : 0911445066,
            'password' : 'cldb'    
        };

        transaction = db.transaction(['staffOS'], 'readwrite');
        objectStore = transaction.objectStore('staffOS');
        // add record to correct OS
        let requestAddStaff = objectStore.add(librarystaff);
        let requestAddStaff1 = objectStore.add(sportsstaff);
        let requestAddStaff2 = objectStore.add(dormstaff);
        let requestAddStaff3 = objectStore.add(departmentstaff);
        let requestAddStaff4 = objectStore.add(clearanceadmin);
        
        requestAddStaff.onsuccess = () => {
            // clear form / close modal
            console.log('Add request successful.');
        }
        
        requestAddStaff1.onsuccess = () => {
            // clear form / close modal
            console.log('Add request successful.');
        }
        
        requestAddStaff2.onsuccess = () => {
            // clear form / close modal
            console.log('Add request successful.');
        }
        
        requestAddStaff3.onsuccess = () => {
            // clear form / close modal
            console.log('Add request successful.');
        }
        
        requestAddStaff4.onsuccess = () => {
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
            
                'firstName' : 'Yohan',
                'lastName' : 'Belay',
                // studentId must be unique
                'studentId' : 'TT/99/11',
                'password' : 'add',
                'phone' : 0911445566,
            };
            let newRecord1 = {
            
                'firstName' : 'Meseret',
                'lastName' : 'Damte',
                // studentId must be unique
                'studentId' : 'TT/99/12',
                'password' : 'add',
                'phone' : 0911445566,
            };
            let newRecord2 = {
            
                'firstName' : 'Melat',
                'lastName' : 'Mola',
                // studentId must be unique
                'studentId' : 'TT/99/13',
                'password' : 'add',
                'phone' : 0911445566,
            };
            transaction = db.transaction(['studentOS'], 'readwrite');
            objectStore = transaction.objectStore('studentOS');
            // add record to correct OS

            let requestAddStaff = objectStore.add(newRecord);
            let requestAddStaff1 = objectStore.add(newRecord1);
            let requestAddStaff2 = objectStore.add(newRecord2);

            
            requestAddStaff.onsuccess = () => {
                // clear form / close modal
                console.log('Add request successful.');
            }
            

            requestAddStaff1.onsuccess = () => {
                // clear form / close modal
                console.log('Add request successful.');
            }
            

            requestAddStaff2.onsuccess = () => {
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
        var loginStatus = true

        e.preventDefault()

        let staffId = document.querySelector('#staffId').value;
        let password = document.querySelector('#password').value;

        let objectStoreStaff = db.transaction(["staffOS"]).objectStore("staffOS");
        let request =  objectStoreStaff.get(staffId);
        

        request.onerror =  function(e){
            // alert("user not Authenticated")
            return;
        };
        request.onsuccess = function(e){
            if(typeof(request.result) == 'undefined'){
                // alert("user not authenticated")
                return;
            }
            else if(password != request.result.password){
                //  alert("user not authenticated")
                 return;    
            }else{
                loginStatus = true
            }
            console.log("You are Logged IN")
        } 
        
        
        let objectStoreStudent = db.transaction(["studentOS"]).objectStore("studentOS");
        let request2student =  objectStoreStudent.get(staffId);
        

        request2student.onerror =  function(e){
            // alert("user not Authenticated")
            return;
        };
        request2student.onsuccess = function(e){
            if(typeof(request2student.result) == 'undefined'){
                // alert("user not authenticated")
                return;
            }
            else if(password != request2student.result.password){
                //  alert("user not authenticated")
                 return;    
            }else{
                loginStatus = true
            }
            console.log("You are Logged IN")
        } 
        

        if (loginStatus){
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
                
                case 'T':
                    deptID = 'std';
                    window.location.replace('./students.html?' + 'dp=' + deptID + '&id=' + staffId);
                    return;
                    
                default:
                    break;
            };
            window.location.replace('./dash.html?' + 'dp=' + deptID);
        } else {
            alert('User not authenticated!')
        }
         
    }

}