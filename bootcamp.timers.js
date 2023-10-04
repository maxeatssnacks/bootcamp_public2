function countdown(num){
    let timer = setInterval(function(){
        num--;
        if(num <= 0){
          clearInterval(timer);
          console.log('DONE!');
        } else {
          console.log(num);
        }

  },1000)
};

function randomGame(){
    let count = 0;
    let timer = setInterval(function(){
        let i = Math.round(Math.random()*100);
        count++;
        if (i > 75){
            clearInterval(timer);
            console.log(`That took ${count} tries`)
        }
    }, 1000)
};