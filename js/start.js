function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "../img/logo.webp";

}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }
    else {
        document.querySelector('body').classList.add('no-webp');
    }
});