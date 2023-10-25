const memes = document.querySelector('#memes');

const memePhoto = document.querySelector('#linkToMeme');
const topText = document.querySelector('#topText');
const bottomText = document.querySelector('#bottomText');
const textColor = document.querySelector('input[name="textColor"]');
let textSizeOptions = document.querySelectorAll('input[name="textSize"]');

let form = document.querySelector('#memeForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Create container
    const meme = document.createElement('div');
    meme.classList.add('meme');


    // create and assign image
    const image = document.createElement('img');
    image.src = memePhoto.value;
    image.classList.add('image');
    console.log("button is working and here is my image source", image.src);

    // create, assign, and style top text
    const top = document.createElement('h3');
    top.innerText = topText.value;
    top.style.color = textColor.value;
    top.style.fontWeight = "bold";
    top.classList.add('top');

    // create, assign, and style bottom text
    const bottom = document.createElement('h3');
    bottom.innerText = bottomText.value;
    bottom.style.color = textColor.value;
    bottom.style.fontWeight = "bold";
    bottom.classList.add('bottom');


    // figure out which radio option is checked and assign
    // fontSize to both Bottom and Top texts
    for (let i = 0; i < textSizeOptions.length; i++) {
        if (textSizeOptions[i].checked) {
            console.log(textSizeOptions[i]);
            top.style.fontSize = textSizeOptions[i].value;
            bottom.style.fontSize = textSizeOptions[i].value;
        }
    }

    // combine elements inside of Meme container
    meme.append(image);
    meme.append(top);
    meme.append(bottom);

    // add meme to memes
    memes.append(meme);

    // reset fields of form on submission
    form.reset();
});


// clicking meme or any of it's childElements will delete the meme
// but not all the memes
memes.addEventListener('click', function (e) {
    if (e.target.classList.contains('meme')) {
        e.target.remove();
    } else if (e.target.parentElement.classList.contains('meme')) {
        e.target.parentElement.remove();
    }
});
