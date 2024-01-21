function findFloor(arr, num){
    let leftIndx = 0;
    let rightIndx = arr.length - 1;
    let floorX = -1;

    while (leftIndx <= rightIndx){
        let middleIndx = Math.floor((leftIndx + rightIndx)/ 2);
        let middleVal = arr[middleIndx];

        if (middleVal < num){
            floorX = middleVal;
            leftIndx = middleIndx + 1;
        } else {
            rightIndx = middleIndx - 1;
        }
    }
    return floorX
}