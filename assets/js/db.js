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
        
        ////// Library Table
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
        

        ////// Dormitory Table 
        let dormOS = db.createObjectStore('dormOS', { keyPath: 'id', autoIncrement:true });
        
        // creating columns
        dormOS.createIndex('firstName', 'firstName', { unique : false });
        dormOS.createIndex('lastName', 'lastName', { unique : false });
        dormOS.createIndex('studentId', 'studentId', { unique : true });
        dormOS.createIndex('phone', 'phone', { unique : false });
        dormOS.createIndex('department', 'department', { unique : false });
        dormOS.createIndex('dormNo', 'dormNo', { unique : false });
        dormOS.createIndex('dateLoaned', 'dateLoaned', { unique : false });
        
        
        console.log('ClearanceDB upgraded.');
    }
    //////////////////////////////////////////


    // form.addEven


}