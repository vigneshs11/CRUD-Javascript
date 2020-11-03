
//not used anywher - discard
export function sortFilter(){

    let toggle = false;
    let orderAsc = true;
    
   const toggleSort = () =>{
                
        toggle = !toggle
    }

    const getToggle =()=>{
         toggleSort()
         

        return toggle
    }

    return{

        getToggle:getToggle
    }

}