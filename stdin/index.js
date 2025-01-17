import EventEmitter from "events";

class MyTransmitter extends EventEmitter {};

const myTransmitter = new MyTransmitter();
const eventName = "user: click";

myTransmitter.on(eventName, function (click) {
    console.log("A user click in", click);
});

const stdin = process.openStdin();

function main() {
    return new Promise(function (resolve, reject) {
        stdin.addListener("data", function (value) {
            resolve(value)
        });
    });
};

main().then(function (result) {
    myTransmitter.emit(eventName, result.toString().trim());
});