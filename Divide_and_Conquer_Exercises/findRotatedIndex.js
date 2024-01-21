function findRotatedIndex(arr, num){
    let leftIndx = 0;
    let rightIndx = arr.length - 1;

    while (leftIndx <= rightIndx){
        let middleIndx = Math.floor((leftIndx + rightIndx)/2);
        let middleVal = arr[middleIndx];

        if (middleVal === num){
            return middleIndx
        }

        if (arr[leftIndx] <= middleVal){
            if (num >= arr[leftIndx] && num < middleVal) {
                rightIndx = middleIndx - 1;
            } else {
                leftIndx = middleIndx + 1;
            }
        } else {
            if (num > middleVal && num <= arr[rightIndx]) {
                leftIndx = middleIndx + 1;
            } else {
                rightIndx = middleIndx - 1;
            }
        }
    }
    return -1;
}