// wait form dom to load
$(function(){
    console.log("Let's get ready to party with jQuery!");
})

// add image-center class to all images inside an anchor tag
$('a img').addClass('image-center');

// remove last paragraph
let $lastP = $('p').length - 1;
console.log($lastP);
$('p').eq($lastP).remove();

// random font size for title
$('#title').css('font-size', Math.floor(Math.random()*101) + "px")

// add item to list
$('ol').append("<li>This is whatever I want it to say</li>");

// remove list and apologize via paragraph
$('aside').empty();
$("<p>Yo that's my bad G</p>").appendTo('aside');

// change color of body on input change
$('body').on('change', 'input', function(){
    let r = $('input').get(0).value;
    console.log(r)
    let g = $('input').get(1).value;
    let b = $('input').get(2).value;
    $('body').css('background-color', `rgb(${r}, ${g}, ${b})`);
})

// delete image on click
$('body').on('click', 'img', function(){
    $(this).remove();
});