// API Key for GIPHY
// Ji1Ihs3RDjA5IhrDpgGO1Vs2Clpdhboo

let key = "Ji1Ihs3RDjA5IhrDpgGO1Vs2Clpdhboo";

const $gifList = $('#gifList');

async function gifSearch(e){
    e.preventDefault();

    let q = $('#search').val();
    $('#search').val('');

    let response = await axios.get("http://api.giphy.com/v1/gifs/search", {params: {q, api_key: key}});
    console.log(response);
    console.log(response.data.data);
    
    for (let gif of response.data.data){
        console.log(gif.images.original.url);
        appendGifs(gif);
    }
}

function appendGifs(gif){
    let $newDiv = $('<div>', { class: "col-md-4 col-12 mb-4" });
    let $newGif = $('<img>', {
        src: gif.images.original.url,
        class: "w-100"
    });

    $newDiv.append($newGif);
    $gifList.append($newDiv);
}

const searchButton = document.querySelector('#submit');
searchButton.addEventListener('click', gifSearch);

const removeButton = document.querySelector('#removeGifs');
searchButton.addEventListener('click', function(e){
    $('#gifList').empty();
});