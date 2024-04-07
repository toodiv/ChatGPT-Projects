// Check if browser supports SpeechRecognition
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onstart = function () {
        console.log('Voice recognition started. Speak now...');
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('output').textContent = transcript;
    };

    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
    };

    document.getElementById('startBtn').addEventListener('click', function () {
        recognition.start();
    });

    document.getElementById('clearBtn').addEventListener('click', function () {
        document.getElementById('output').textContent = '';
    });
} else {
    alert('Your browser does not support Speech Recognition API.');
}
