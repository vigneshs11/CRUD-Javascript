

export function deBounce(delay , fn){
  
    let timerId;
     return function(){

       if(timerId != null) clearTimeout(timerId)

       timerId = setTimeout(() => {
           fn()
       }, delay);
     }
}
