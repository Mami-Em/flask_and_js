// wait for the dom to load
document.addEventListener('DOMContentLoaded', () => {

    // connect to wwebsoccket
    var socket = io.connect('http://127.0.0.1:5000');

    // when connected change buttons
    socket.on('connect', () => {

        // button on click
        document.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                const selection = button.dataset.vote;
                socket.emit('submit vote', {'selection': selection});
            };
        });
    });


    // when a new vote is announced, add the unnordered list
    socket.on('announce vote', data => {
        const li = document.createElement('li');
        li.innerHTML = `Vote recorded: ${data.selection}`;
        document.querySelector('#votes').append(li);
    });
});