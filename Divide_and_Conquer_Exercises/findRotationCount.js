function findRotationCount(arr){
    let leftIndx = 0;
    let rightIndx = arr.length - 1;
    let rotationCount = 0;

    while (leftIndx <= rightIndx){
        let middleIndx = Math.floor((leftIndx + rightIndx)/ 2);
        let middleVal = arr[middleIndx];

        if (middleVal > arr[middleIndx+1]){
            rightIndx = middleIndx - 1;
            rotationCount = middleIndx + 1;
        } else if (middleVal < arr[middleIndx+1]) {
            leftIndx = middleIndx + 1;
        }
    }
    return rotationCount
}