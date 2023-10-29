const input = document.querySelector('#searchBar');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
    lowerCasedStr = str.toLowerCase();

    for (let i = 0; i < fruit.length; i++){
        if(fruit[i].toLowerCase().includes(lowerCasedStr)){
            results.push(fruit[i]);
        } 
    }
    return results;
}

function searchHandler(e) {
    showSuggestions(search(e.target.value), e.target.value);
}

function showSuggestions(results, inputVal) {
    const items = document.querySelectorAll('.suggestions ul li');
    for (let item of items){
        item.remove();
    }

    if (inputVal === ""){
        results = [];
    } else {
        results = results.slice(0, 6);
    }

    for (let i = 0; i < results.length; i++){
        const li = document.createElement('li');
        li.innerText = results[i];
        suggestions.append(li);
    }
}

function useSuggestion(e) {
	input.value = e.target.innerText;
    const items = document.querySelectorAll('.suggestions ul li');
    for (let item of items){
        item.remove();
    }
}

// This works ~sorta~
// function highlight(e){
//     let hovered = document.querySelector('.highlight');
//     if (e.target === hovered) return;
//     if (hovered) { 
//       console.log('mouse out from', hovered);
//       hovered.classList.remove('highlight');
//     }
//     e.target.classList.add('highlight');
//     console.log('mouse over on', e.target)
//   }

function highlight (e) {
    console.log('mouseover');
    if (e.target.tagName === 'LI'){
        e.target.classList.add('highlight');
    }
}

function removeHighlight(e) {
    e.target.classList.remove('highlight');
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
suggestions.addEventListener('mouseover', highlight);
suggestions.addEventListener('mouseout', removeHighlight);