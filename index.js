//import required libraries
import 'bootstrap'
import './site.scss'
const $ = require('jquery');


//setup event listeners and initialize function boxes
$(document).ready(function() {
    let functionsList = $('.carousel-item .carousel-function-box');
    let functionPreview = $('.preview');

    //set initial function box in carousel
    initCarousel(functionsList, functionPreview);

    //change status of active function box in carousel
    $('#functions-carousel').on('slid.bs.carousel', function(ev) {
        setActiveCarousel(ev);
    })

    //change carousel image and preview box
    $('#functions-carousel').on('slide.bs.carousel', function(slideEvent) {
        setInactiveCarousel(slideEvent);
        var id = slideEvent.relatedTarget.id - 1;
        id %= functionsList.length;
        let smallImagesList = $('.sm-images .image-holder');
        for (let index = 0; index < smallImagesList.length; index++) {
            if (index == id) {
                smallImagesList[index].classList.remove('d-none');
                smallImagesList[index].classList.add('d-block');
            }
            if (index == slideEvent.from) {
                if (smallImagesList[index].classList.contains('d-none')) {
                    continue;
                }
                smallImagesList[index].classList.add('d-none');
                smallImagesList[index].classList.remove('d-block');
            }

        }
        let nextId = id + 1;
        let next = functionsList[nextId == functionsList.length ? 0 : nextId].cloneNode(true);
        functionPreview.children().remove();
        functionPreview.append(next);

    })

    //change status of last/currently visited function box
    var largeFunctionsList = document.getElementsByClassName('functions');
    for (var i = 0; i < largeFunctionsList.length; i++)
        largeFunctionsList[i].addEventListener('mouseenter', setActive, false);
    document.getElementById("demo-form").addEventListener('submit', validateInput, false);
    document.getElementById("close-msg").addEventListener('click', confirmClose, false);


    //hide navbar when scroling down, show when scrolling up
    $(window).bind('mousewheel', function(event) {
        if (event.originalEvent.wheelDelta >= 0 && window.scrollY > 20) {
            $('#navbar').addClass("sticky-top");
        } else {
            $('#navbar').removeClass("sticky-top");
        }
    });
    let originScroll = 0;
    $(window).scroll(function(event) {
        if (window.scrollY - originScroll >= 50) {
            $('#navbar').removeClass("sticky-top");
        }
        originScroll = window.scrollY;
    })
});


//initialize carousel
function initCarousel(functionsList, functionPreview) {
    let activeElement = $('.carousel-item.active');
    let innerDivActive = activeElement[0].childNodes;
    //let innerDivActive = outerDivActive[1].childNodes;
    let parallelogram = document.createElement("div");
    parallelogram.classList.add("parallelogram");
    innerDivActive[1].appendChild(parallelogram);
    let nextPreview = functionsList[1].cloneNode(true);
    functionPreview.append(nextPreview);
}

//set normal status to inactive carousel function box
function setInactiveCarousel(slideEvent) {
    let elements = $('.carousel-item');
    let previousActiveElement = elements[slideEvent.from];
    let previousActiveInnerDiv = previousActiveElement.childNodes;
    //let previousActiveInnerDiv = previousActiveOuterDiv[0].childNodes;
    if (previousActiveInnerDiv[1].childNodes[3] != null) previousActiveInnerDiv[1].childNodes[3].remove();

}


//set active status to inactive carousel function box
function setActiveCarousel(slideEvent) {
    let newActiveInnerDiv = slideEvent.relatedTarget.childNodes;
    //let newActiveInnerDiv = newActiveOuterDiv[0].childNodes;
    let parallelogram = document.createElement("div");
    parallelogram.classList.add("parallelogram");
    newActiveInnerDiv[1].appendChild(parallelogram);
}

let lastIndex = "1";
let imagesList = document.getElementsByClassName("image-holder");

function setActive(event) {
    let target = event.target ? event.target : event.srcElement;
    deselect(lastIndex);
    let element = target.children;
    let parallelogram = document.createElement("div");
    element[0].classList.add("fbactive");
    parallelogram.classList.add("parallelogram");
    element[0].appendChild(parallelogram);
    imagesList[parseInt(target.id) - 1].classList.remove("d-none");
    imagesList[parseInt(target.id) - 1].classList.add("d-block");
    lastIndex = target.id;
}

function setInActive(target) {
    let element = target.children;
    element[0].classList.remove("fbactive");
    element[0].children[1].remove();
    imagesList[parseInt(target.id) - 1].classList.remove("d-block");
    imagesList[parseInt(target.id) - 1].classList.add("d-none");
}

function deselect(id) {
    let target = document.getElementById(id);
    setInActive(target);
}


//functions to handle form inputs
function validateInput() {
    submit();
    setTimeout(() => {
        let message = document.getElementById("confirmation-message");
        message.classList.add("display-mess");
        let button = document.getElementById("btn-val");
        button.classList.remove("d-none");
        button.classList.add("d-block");
        let loader = document.getElementsByClassName("lds-ring")[0];
        loader.classList.add("d-none");
        document.getElementsByTagName("form")[0].reset();
    }, 2000);
}

function confirmClose() {
    let confirmationMessage = document.getElementById("confirmation-message");
    confirmationMessage.classList.remove("display-mess");
}

function submit() {
    let button = document.getElementById("btn-val");
    button.classList.remove("d-block");
    button.classList.add("d-none");
    let loader = document.getElementsByClassName("lds-ring")[0];
    loader.classList.remove("d-none");
}