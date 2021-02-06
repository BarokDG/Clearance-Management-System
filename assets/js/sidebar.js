const gridContainer = document.querySelector('#grid-container');
const menuBtn = document.querySelector('.menu-btn');
const sidebarSmall = document.querySelector('.sidebar-small');

menuBtn.addEventListener('click', toggleSideMenu);

function toggleSideMenu() {

    if (window.matchMedia('(max-width: 700px)').matches) {
        if (sidebarSmall.classList.contains('sidebar-small-show')){
            sidebarSmall.classList.remove('sidebar-small-show');
            sidebarSmall.classList.add('sidebar-small-hide');
        }
        else {
            sidebarSmall.classList.remove('sidebar-small-hide');
            sidebarSmall.classList.add('sidebar-small-show');
        }
    }
}