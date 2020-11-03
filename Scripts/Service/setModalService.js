




export function setModalService(){

  

function create(){
  
   console.log('open modal')
  var modal = document.getElementById('create-modal')
  var btn = document.getElementById('createButton')
   var span = document.getElementsByClassName('close')[2]
   var createForm = document.querySelector('createForm')
   //var createForm =document.forms.createForm;
   var createButton = document.getElementById('createSubmit')
   var createFormbody = document.getElementsByClassName('modal-label')

   ///////////////////////
   var bufferModel = {
       
       
    jobtitle:{value: ''},
    fName:{value: ''},
    lName:{value: ''},
    email:{value: ''},
    phoneNumber:{value: ''},
    dob:{value: ''}
}

var inputSet = document.querySelectorAll('.modal-body input')

                                           
var res =  Array.from(inputSet,item =>{item.addEventListener('change',(event)=> {
 var copyModel = bufferModel
copyModel = {...copyModel, 
  [event.target.id]:{value : event.target.value}}
   
   console.log(copyModel)
  return copyModel

  }

)}

) 
  
   //////////////////

   console.log(createFormbody[0])

   console.log(span)
   span.onclick = function() {
    modal.style.display = "none";
  }
  
  btn.onclick = function(){
    modal.style.display='block'
  }

  window.onclick = function(event) {

    if(modal)
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

createButton.addEventListener("submit", (event) => {
   event.preventDefault();
   let reqBody = {};
   Object.keys(createFormbody).forEach(key => {
        console.log(key.innerHTML)
        console.log(key)
    });
   console.log(reqBody);
 });
    

}  

function View(id, data , dropDownOption){

    var currData = data
    console.log(currData)
    var modal = document.getElementById('view-modal')
    //var btn =document.getElementById('view')
    var btn = dropDownOption
    var span = document.getElementsByClassName('close-button')[0]
    console.log(span)
    var name = document.getElementById('vname')
    console.log(name)
    var employeeCode = document.getElementById('vemployeeCode')
    name.innerHTML = `<p>NAME</p><h2>${currData.preferredFullName}</h2>`
    employeeCode.innerHTML = `<p>Employee Code</p><h2>${currData.employeeCode}</h2>`

            span.onclick = function() {
              console.log('registering')
              modal.style.display = "none";
            }

            btn.onclick = function(){
              modal.style.display='block'
            }
         
            window.onclick = function(event) {
              if(modal)
              if (event.target == modal) {
                modal.style.display = "none";
              }
          }   
          
  } 


   function Delete(id, data , dropDownOption,store){

            var currData = data
            var modal = document.getElementById('delete-modal')
            //var btn =document.getElementById('view')
            var btn = dropDownOption
            var span = document.getElementsByClassName('close')[1]
        
            var name = document.getElementById('dname')
            console.log(name)
            var employeeCode = document.getElementById('demployeeCode')

            var deleteButton = document.getElementById('deleteButton')
            name.innerHTML = `<p>NAME</p><h2>${currData.preferredFullName}</h2>`
            employeeCode.innerHTML = `<p>Employee Code</p><h2>${currData.employeeCode}</h2>`
        
                    span.onclick = function() {
                      modal.style.display = "none";
                    
                    }
        
                    btn.onclick = function(){
                      modal.style.display='block'
                    }
                 
                    window.onclick = function(event) {
                      if(modal)
                      if (event.target == modal) {
                        modal.style.display = "none";
                        
                      }

                      deleteButton.onclick = function(event){
                          
                        console.log(data)
                          store.deleteEmployee(id)
                          modal.style.display='none'

                          
                      }
                  }    
    }


 return {

  setView :View,
  setDelete:Delete,
  setCreate:create
 }

 

}