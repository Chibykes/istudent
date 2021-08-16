import QrScanner from "./qr.js";
QrScanner.WORKER_PATH = '../js/qr-scanner-worker.min.js';

const video = document.getElementById('qr-video');
const camQrResult = document.getElementById('cam-qr-result');

function setResult(label, result) {
    console.log(result);
}

// ####### Web Cam Scanning #######

const scanner = new QrScanner(video, result => setResult(camQrResult, result));
scanner.start();

// for debugging
window.scanner = scanner;

video.parentNode.insertBefore(scanner.$canvas, video.nextSibling);
scanner.$canvas.style.display = 'block';