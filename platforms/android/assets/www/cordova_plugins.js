cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.geolocation/www/Coordinates.js",
        "id": "org.apache.cordova.geolocation.Coordinates",
        "clobbers": [
            "Coordinates"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/PositionError.js",
        "id": "org.apache.cordova.geolocation.PositionError",
        "clobbers": [
            "PositionError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/Position.js",
        "id": "org.apache.cordova.geolocation.Position",
        "clobbers": [
            "Position"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/geolocation.js",
        "id": "org.apache.cordova.geolocation.geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device-orientation/www/CompassError.js",
        "id": "org.apache.cordova.device-orientation.CompassError",
        "clobbers": [
            "CompassError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device-orientation/www/CompassHeading.js",
        "id": "org.apache.cordova.device-orientation.CompassHeading",
        "clobbers": [
            "CompassHeading"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device-orientation/www/compass.js",
        "id": "org.apache.cordova.device-orientation.compass",
        "clobbers": [
            "navigator.compass"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechsynthesis/www/SpeechSynthesis.js",
        "id": "org.apache.cordova.speech.speechsynthesis.SpeechSynthesis",
        "clobbers": [
            "window.speechSynthesis"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechsynthesis/www/SpeechSynthesisUtterance.js",
        "id": "org.apache.cordova.speech.speechsynthesis.SpeechSynthesisUtterance",
        "clobbers": [
            "SpeechSynthesisUtterance"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechsynthesis/www/SpeechSynthesisEvent.js",
        "id": "org.apache.cordova.speech.speechsynthesis.SpeechSynthesisEvent",
        "clobbers": [
            "SpeechSynthesisEvent"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechsynthesis/www/SpeechSynthesisVoice.js",
        "id": "org.apache.cordova.speech.speechsynthesis.SpeechSynthesisVoice",
        "clobbers": [
            "SpeechSynthesisVoice"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechsynthesis/www/SpeechSynthesisVoiceList.js",
        "id": "org.apache.cordova.speech.speechsynthesis.SpeechSynthesisVoiceList",
        "clobbers": [
            "SpeechSynthesisVoiceList"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.geolocation": "0.3.6",
    "org.apache.cordova.device-orientation": "0.3.5",
    "org.apache.cordova.speech.speechsynthesis": "0.1.0"
}
// BOTTOM OF METADATA
});