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
    socket.on('vote totals', data => {
        // const li = document.createElement('li');
        // li.innerHTML = `Vote recorded: ${data.selection}`;
        // document.querySelector('#votes').append(li);
        document.querySelector('#yes').innerHTML = data.yes;
        document.querySelector('#no').innerHTML = data.no;
        document.querySelector('#maybe').innerHTML = data.maybe;
    });
});