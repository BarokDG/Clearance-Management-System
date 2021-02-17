const postDiv = document.getElementById('messages');

function loadPosts() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/assets/jsonData/messages.json', true);
    console.log('Here');

    xhr.onload = function () {
        if (this.status === 200) {
            const messages = JSON.parse(this.responseText);

            let output = '<div class="col-12 sticky-top text-center bg-dark text-light mt-0 p-2">Recent Messages</div>';

            messages.forEach(message => {

                output += `
                    <div class="col-12">${message.message}</div>
                    `;

            postDiv.innerHTML = output;
            })
        }
    }

    xhr.send();
}

loadPosts();