let currentId = 0;

let moviesList = [];

$('#submit').on('click', function(e){
    if($('#movieName').val().length >= 3 && $('#rating').val() >=0 && $('#rating').val() <= 10){
        e.preventDefault();
        console.log("Default?");
        let title = $('#movieName').val();
        let rating = $('#rating').val();

        let movieData = {title, rating, currentId};
        let newRow = createMovieRow(movieData);
        currentId++;

        moviesList.push(movieData);
        $('#movieList').append(newRow);
        $('#new-movie-form').trigger("reset");
    }
})

$('#movieList').on('click', '.delete', function(e){
    let indexToRemove = moviesList.findIndex(movie => movie.currentId === +$(e.target).data("delId"));
    
    moviesList.splice(indexToRemove, 1);

    $(this).closest('tr').remove();
} )

$('#movieHeaders').on('click', 'th', function(e){
    let direction = $(e.target).hasClass("down") ? "down" : "up";
    let keyToSortBy = $(e.target).attr("id");

    console.log(keyToSortBy);
    console.log(direction);
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

    console.log(sortedMovies);
    console.log(e.target);

    $('#movieList').empty();

    for (let movie of sortedMovies){
        const HTMLtoAdd = createMovieRow(movie);
        $('#movieList').append(HTMLtoAdd);
    }

    moviesList = sortedMovies;

    $(e.target).toggleClass("down");
    $(e.target).toggleClass("up");
})

function createMovieRow(obj){
    return `
    <tr>
        <td>${obj.title}</td>
        <td>${obj.rating}</td>
        <td><button class="delete" data-del-Id=${obj.currentId}>X</button></td>
    </tr>
    `;
    
}

function sortBy(array, keyToSortBy, direction) {
    return array.sort(function(a, b){
        if (keyToSortBy === "rating"){
            a[keyToSortBy] = +a[keyToSortBy];
            b[keyToSortBy] = +b[keyToSortBy];
        }
        if (a[keyToSortBy] > b[keyToSortBy]) {
            return direction === "up" ? 1 : -1;
        } else if (b[keyToSortBy] > a[keyToSortBy]){
            return direction === "up" ? -1 : 1;
        }
    return 0;
    });
}