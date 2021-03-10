// const newLoanButton = document.querySelector('#gradient-button');
var addForm;

// import from db.js
const dept = currentDept;

function personalizeTableHeader(){
    let loanedColumn = tableHeader.firstElementChild.children[5];
    switch (dept) {
        case 'lib':
            loanedColumn.id = 'bookTitle';
            loanedColumn.textContent = 'Book Title';
            break;
        case 'sps':
            loanedColumn.id = 'equipment';
            loanedColumn.textContent = 'Sports Equipment';
            break;
        case 'drm':
            loanedColumn.id = 'dormNo';
            loanedColumn.textContent = 'Dorm No.';
            break;
        case 'dep':
            tableHeader.firstElementChild.removeChild(loanedColumn)
            tableHeader.firstElementChild.children[3].textContent = 'Semester Status'
            break;

        case 'adm':
            const tableHeaderA = document.querySelector('.thead-requests')
            // let loanedColumn = tableHeader.firstChild
            const deptColumn = document.createElement('th')
            const allColumn = document.createElement('th')
            
            // document.querySelector('.search-bar').children[1].style.display = 'none'
            
            tableHeaderA.firstElementChild.appendChild(deptColumn)
            tableHeaderA.firstElementChild.appendChild(allColumn)
 
            tableHeaderA.firstElementChild.children[3].textContent = 'Library'
            tableHeaderA.firstElementChild.children[4].textContent = 'Sports'
            tableHeaderA.firstElementChild.children[5].textContent = 'Dorm'
            tableHeaderA.firstElementChild.children[6].textContent = 'Department'
            tableHeaderA.firstElementChild.children[7].textContent = 'All Clear'

        
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
