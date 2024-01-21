function sortedFrequency(arr, num){
    let firstOccurrence = -1;
    let secondOccurrence = -1;

    function findFirstOccurrence(){
        let leftIndx = 0;
        let rightIndx = arr.length - 1;
        while (leftIndx <= rightIndx){
            let middleIndx = Math.floor((leftIndx + rightIndx)/2);
            let middleVal = arr[middleIndx];
            
            if (middleVal < num){
                leftIndx = middleIndx + 1;
            } else if (middleVal > num) {
                rightIndx = middleIndx - 1;
            } else {
                rightIndx = middleIndx - 1;
                firstOccurrence = middleIndx;
            }
        }
        return firstOccurrence
        
    }

    function findSecondOccurrence(){
        let leftIndx = 0;
        let rightIndx = arr.length - 1;
    
        while (leftIndx <= rightIndx){
            let middleIndx = Math.floor((leftIndx + rightIndx)/2);
            let middleVal = arr[middleIndx];
            
            if (middleVal < num){
                leftIndx = middleIndx + 1;
            } else if (middleVal > num) {
                rightIndx = middleIndx - 1;
            } else {
                leftIndx = middleIndx + 1;
                secondOccurrence = middleIndx;
            }
        }
        return secondOccurrence
    }

    if (firstOccurrence === -1){
        return -1;
    } else {
        return (secondOccurrence - firstOccurrence + 1)
    }
}