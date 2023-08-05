console.log('hello world');

const eventSource = new EventSource("http://localhost:8000/fetchdata");

const updateMessage = (msg) => {
    const list = document.getElementById("messages");
    const item  = document.createElement('p');
    item.textContent = msg;
    list.appendChild(item);
}

eventSource.onmessage = function(event) {
    console.log(event);
    console.log('ytjjjjj');
    console.log(event.data);
    updateMessage(event.data);
}

eventSource.onerror = function() {
    updateMessage('server close connection');
    eventSource.close();
}