var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var DETAIL_PREVIOUS_BUTTON_SELECTOR = '[data-image-role="previous"]';
var DETAIL_NEXT_BUTTON_SELECTOR = '[data-image-role="next"]';

var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var index = 0;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-url');
}

function titleFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumb) {
    setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
}

function setDetailsFromThumbIndex() {
    array = getThumbnailsArray();
    thumb = array[index];
    setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('clicked');
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function addPreviousClickHandler(previousButton) {
    'use strict';
    previousButton.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('previousClicked');
        var array = getThumbnailsArray();
        index = (index + 4) % array.length;
        var thumb = array[index];
        setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
        showDetails();
    });
}

function addNextClickHandler(nextButton) {
    'use strict';
    nextButton.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('nextClicked');
        var array = getThumbnailsArray();
        index = ++index % array.length;
        var thumb = array[index];
        setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function getPreviousButton() {
    'use strict';
    var previousButton = document.querySelector(DETAIL_PREVIOUS_BUTTON_SELECTOR);
    return previousButton;
}

function getNextButton() {
    'use strict';
    var nextButton = document.querySelector(DETAIL_NEXT_BUTTON_SELECTOR);
    return nextButton;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
 'use strict';
 var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
 document.body.classList.remove(HIDDEN_DETAIL_CLASS);
 frame.classList.add(TINY_EFFECT_CLASS);
 setTimeout(function() {
     frame.classList.remove(TINY_EFFECT_CLASS);
 }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    var previousButton = getPreviousButton();
    var nextButton = getNextButton();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    addPreviousClickHandler(previousButton);
    addNextClickHandler(nextButton);
}

initializeEvents();
