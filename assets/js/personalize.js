const tableHeader = document.querySelector('.thead-dark');
// const newLoanButton = document.querySelector('#gradient-button');
var addForm;

// import from db.js
const dept = currentDept;

function personalizeTableHeader(){
    let loanedColumn = tableHeader.firstElementChild.children[6];
    switch (dept) {
        case 'lib':
            loanedColumn.textContent = 'Book Title';
            break;
        case 'sps':
            loanedColumn.textContent = 'Sports Equipment';
            break;
        case 'drm':
            loanedColumn.textContent = 'Dorm No.';
            break;
        case 'dep':
            tableHeader.firstElementChild.removeChild(loanedColumn)
            break;
        
        default:
            break;
    }
}


function personalizeFormInputs(){
    let loanItemInput = addForm.children[5].firstElementChild;
    switch (dept) {
        case 'lib':
            loanItemInput.id = 'bookTitle';
            loanItemInput.placeholder = 'Book Title';
            break;
        case 'sps':
            loanItemInput.id = 'equipment';
            loanItemInput.placeholder = 'Equipment';
            break;
        case 'drm':
            loanItemInput.id = 'dormNo';
            loanItemInput.placeholder = 'Dorm No.';
            break;
        case 'dep':
            addForm.children[4].removeChild(addForm.children[4].firstElementChild);
            addForm.children[5].removeChild(loanItemInput);
            break;
        
        default:
            break;
    }
}

