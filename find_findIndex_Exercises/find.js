// findUserByUsername
function findUserByUsername(arr, user){
    return arr.find(function(val){
        return val.username === user;
    })
}

// removeUser
function removeUser(arr, user){
    let index = arr.findIndex(function(val){
        return val.username === user;
    })
    if(foundIndex == -1) return;
    
    let left = arr.slice(0, index);
    let right = arr.slice(index + 1);
    return left.concat(right);
}