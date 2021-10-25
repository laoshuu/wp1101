var mainPic = document.getElementById("display");
var picture0 = document.getElementById("preview0");
var picture1 = document.getElementById("preview1");
var picture2 = document.getElementById("preview2");
var picture3 = document.getElementById("preview3");
var picture4 = document.getElementById("preview4");
var picture5 = document.getElementById("preview5");

var appendix0 = document.getElementById("appendix0");
var appendix1 = document.getElementById("appendix1");
var appendix2 = document.getElementById("appendix2");
var appendix3 = document.getElementById("appendix3");

var title = document.getElementById("title_name");
var background = document.getElementById("background_pic");

const album = [["./rat/rat.jpg", "./rat/carrot rat.jpg", "./rat/handsome rat.jpg", "./rat/laoshuu.jpg", "./rat/spiderman.jpg", "./rat/mouse.png"],
["./dog/doggy1.jpg", "./dog/doggy2.jpg", "./dog/doggy3.jpg", "./dog/doggy4.jpg", "./dog/doggy5.jpg", "./dog/doggy6.jpg"],
["./momo/momo1.jpg", "./momo/momo2.jpg", "./momo/momo3.jpg", "./momo/momo4.jpg", "./momo/momo5.jpg", "./momo/momo6.jpg"]];

var currentPic = picture0;
var currentIndex = 0;
var currentAppendix = appendix0;
var currentAppendixIndex = 0;

function setImage(index) {
    picture0.src = album[index][0];
    picture1.src = album[index][1];
    picture2.src = album[index][2];
    picture3.src = album[index][3];
    picture4.src = album[index][4];
    picture5.src = album[index][5];
    mainPic.src = album[index][currentIndex];
    currentPic.classList.add("selected");
}

setImage(currentAppendixIndex);
appendix0.classList.add("appendix_selected");

function switchPic0() {
    mainPic.src = picture0.src;
    currentPic.classList.remove("selected");
    picture0.classList.add("selected");
    currentPic = picture0;
    currentIndex = 0;

}

function switchPic1() {
    mainPic.src = picture1.src;
    currentPic.classList.remove("selected");
    picture1.classList.add("selected");
    currentPic = picture1;
    currentIndex = 1;
}

function switchPic2() {
    mainPic.src = picture2.src;
    currentPic.classList.remove("selected");
    picture2.classList.add("selected");
    currentPic = picture2;
    currentIndex = 2;
}

function switchPic3() {
    mainPic.src = picture3.src;
    currentPic.classList.remove("selected");
    picture3.classList.add("selected");
    currentPic = picture3;
    currentIndex = 3;
}

function switchPic4() {
    mainPic.src = picture4.src;
    currentPic.classList.remove("selected");
    picture4.classList.add("selected");
    currentPic = picture4;
    currentIndex = 4;
}

function switchPic5() {
    mainPic.src = picture5.src;
    currentPic.classList.remove("selected");
    picture5.classList.add("selected");
    currentPic = picture5;
    currentIndex = 5;
}

function checkBackground(previousIndex) {
    if (previousIndex === 0)
        background.classList.remove("background");
    else if (previousIndex === 2)
        background.classList.remove("background_water");
}

function checkTitleColor(previousIndex) {
    if (previousIndex === 0)
        title.classList.remove("title");
    else if (previousIndex === 1)
        title.classList.remove("title1");
    else if (previousIndex === 2)
        title.classList.remove("title2");
}

function switchAlbum0() {
    currentAppendix.classList.remove("appendix_selected");
    checkBackground(currentAppendixIndex);
    checkTitleColor(currentAppendixIndex);
    currentAppendix = appendix0;
    currentAppendixIndex = 0;
    setImage(currentAppendixIndex);
    title.innerHTML = "Rat's Photo Library";
    appendix0.classList.add("appendix_selected");
    background.classList.add("background");
    title.classList.add("title");
}

function switchAlbum1() {
    currentAppendix.classList.remove("appendix_selected");
    checkBackground(currentAppendixIndex);
    checkTitleColor(currentAppendixIndex);
    currentAppendix = appendix1;
    currentAppendixIndex = 1;
    setImage(currentAppendixIndex);
    title.innerHTML = "Doggy's Photo Library";
    appendix1.classList.add("appendix_selected");
    title.classList.add("title1");
}

function switchAlbum2() {
    currentAppendix.classList.remove("appendix_selected");
    checkBackground(currentAppendixIndex);
    checkTitleColor(currentAppendixIndex);
    currentAppendix = appendix2;
    currentAppendixIndex = 2;
    setImage(currentAppendixIndex);
    title.innerHTML = " Momo's Photo Library";
    appendix2.classList.add("appendix_selected");
    background.classList.add("background_water");
    title.classList.add("title2");
}

function switchAlbum3() {
    alert("The album is empty. Please choose another album.");
}