function countZeros(arr){
    /// L   M     R
    ///       L   R
    /// 1 1 1 0 0 0 

    /// L   M     R
    /// 0 0 0 0 0 0 

    /// L   M     R
    ///       L M R
    ///         L M
    ///           L
    /// 1 1 1 1 1 1 

    /// L   M     R
    /// L R
    ///   M L  
    /// 1 1 0 0 0 0 

    let leftIndx = 0;
    let rightIndx = arr.length - 1;

    if(arr[arr.length-1] !== 0) {
        return 0
    }

    while (leftIndx <= rightIndx){
        let middleIndx = Math.floor((leftIndx + rightIndx)/ 2);
        let middleVal = arr[middleIndx];
        
        if (middleVal === 0){
            rightIndx = middleIndx - 1;
        } else {
            leftIndx = middleIndx + 1;
        }
    }
    return arr.length - leftIndx
}