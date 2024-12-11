self.onmessage = (event) => {
    console.log(event.data);
};
self.postMessage("Hello from worker");
