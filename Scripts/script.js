import {pick} from './Configs/columnHeaders.js'
import { fetchService } from './Service/service.js';
import {deBounce} from './Service/debounce.js'
import {tableDataStore} from './Service/tableDataStore.js'
import {setModalService} from './Service/setModalService.js'





window.onload = fetchEmployees;
var store = tableDataStore()
var modalService = setModalService()
 




//setting up event listeners
const searchButton = document.getElementById('search')
searchButton.addEventListener('input',deBounce(500, searchEmployee))

document.addEventListener("updateData", function(){
     
        updateTable(store.get())
});


// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {

    console.log('close damn it')
    console.log(event.target)
    if (!event.target.matches('.fa fa-list')) {
      var dropdowns = document.getElementsByClassName("drop-down-list");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

//setup dropdown
function setUpDropDown(){
        console.log('here')
        
        
        const menu = document.createElement('ul')
        const viewButton = document.createElement('li')
     
        viewButton.innerText = 'View'
        viewButton.setAttribute('id','view')
        const editButton = document.createElement('li')
        editButton.innerText = 'edit'
        editButton.setAttribute('id','edit')
        const deleteButton = document.createElement('li')
        deleteButton.innerText = 'delete'
        deleteButton.setAttribute('id','delete')
        menu.classList.add('drop-down-list')
        //menu.setAttribute('id','drop-down-menu')
        menu.appendChild(viewButton)
        menu.appendChild(editButton)
        menu.appendChild(deleteButton)

        var dropDownButtons = document.getElementsByClassName('fa fa-list')
        
        
        for(let i=0; i < dropDownButtons.length; i++){
            
            console.log('came here')
            var newMenu = menu.cloneNode(true)
            var id = 'dropDownMenu' + i
            newMenu.setAttribute('id',id)
            dropDownButtons[i].setAttribute('id' , 'dropButton' + i)
            dropDownButtons[i].appendChild(newMenu)
            dropDownButtons[i].addEventListener('click',showDropDown)
            
            console.log(dropDownButtons[i])
        }
  
         //setup Modal controls
         //setUpModal();

    }

 function setUpModal(dropDownOption, id){

    
    
    if(dropDownOption.innerHTML == 'View'){
        
        modalService.setView(id , store.getEmployee(id[10]) ,dropDownOption)
    }


    if(dropDownOption.innerHTML == 'create'){
        
       modalService.setCreate()
    }

    

    //if(dropDownOption.innerHTML == 'edit'){
      //   modalService.setEdit(id)
    // }

     if(dropDownOption.innerHTML == 'delete'){

    
         modalService.setDelete(id,store.getEmployee(id[10]),dropDownOption,store)
    }
}

function showDropDown(){
   
    
    
    var dropDownButton = document.getElementById(this.id)
    var dropDownOptions = dropDownButton.querySelectorAll('li')
    
      
    
    //set up modal for each option
    console.log(dropDownOptions.length + 'see here')
    for( let i=0; i < dropDownOptions.length;i++){
        setUpModal(dropDownOptions[i] , this.id)
    }

   
    //console.log(dropDownButton.firstChild)
     dropDownButton.firstChild.classList.add('show')
}


//state tableData
// var tableData = null;

//fetch Employee details on load for rendering
function fetchEmployees(){
     
    fetchService().then(data =>{
        

        //reformatting id - prefixing 'EM'
        data[0].forEach((datum) => {
            datum.id = (datum.id < 10 )? 'EM' + '0' + datum.id:'EM' + datum.id
        })
        
        //setting global state  
        //tableData = data
         store.set(data)
        renderTable(store.get())
         modalService.setCreate()
    }).catch(error => (console.error('script.js :-' + error)))
   
}
 



//called from fetchEmployee Method and redners the table 
function renderTable(tableData){

    
  console.log(JSON.stringify(tableData[0]))
    var table = document.createElement('table');
   
    let coloumnHeading = pick(Object.keys(tableData[0][0]))
    let columnCount = coloumnHeading.length;
    let rowCount = tableData[0].length

  
    //creating table
    document.getElementById('table-container').appendChild(table)
    var header = table.createTHead();
    var row= header.insertRow(-1);
    var body = table.createTBody();
    
    //creating table header
     for(var i=0; i <columnCount;i++){
            var headerCell = document.createElement('th')
            //headerCell.innerText = coloumnHeading[i].toUpperCase() 
            headerCell.innerText = coloumnHeading[i]
            // headerCell.innerHTML += "<span><i id='sort-icon' class='fa fa-sort-up float-right'></i></span>"
            headerCell.onclick = function(e){
                e =e || window.event
                var th = e.target
                console.log(th.innerText)
                sortByColumn(th.innerText)
            }
            row.appendChild(headerCell)
    }

    //Extra Column for Edit button
    headerCell = document.createElement('th')
    row.appendChild(headerCell)

    
     
    
    //attaching table body
    table.appendChild(body)


    //Add data rows 
    for( var i=0 ; i < rowCount;i++){
        
        row =body.insertRow(-1)
        for( var j=0; j < columnCount;j++){

            var cell = row.insertCell(-1)
            cell.setAttribute('data-label',coloumnHeading[j].toUpperCase())

            
            var obj = tableData[0][i]
            cell.innerText = obj[coloumnHeading[j]]
        }
        cell = row.insertCell(-1)
        cell.innerHTML  +='<i class="fa fa-list" aria-hidden="true"></i>'

    }

    setUpDropDown();

}


function searchEmployee(){

    let searchTearm = document.getElementById('search').value
    console.log(searchTearm)

    let token = searchTearm
                .toLowerCase()
                .split('')
                .filter(function(token){
                    return token!==' '
                })

                console.log(token)
   
    if(token.length){

        var filteredTableData = store.get()[0]
                                .filter((datum)=>{
                                  var searchString=''
                                  for(var key in datum){
                                      if(datum.hasOwnProperty(key) && datum[key]!=''){
                                          searchString +=datum[key].toString().toLowerCase().trim() + ' ';
                                      }
                                  }

                                 console.log(token.join(''))
                                   console.log(searchString)

                                  return searchString.includes(token.join(''))

                                }) 
                   }  
                  
                    
                   console.log(filteredTableData)
                   


                   if(filteredTableData && filteredTableData!=''){

                      updateTable([filteredTableData])
                   }else if(filteredTableData==undefined){
                       updateTable(store.get())
                   }
                   
}


function updateTable(filteredTableData){

    console.log('update happened') 
    var table = document.querySelector('table')
    document.querySelector('table').remove()
    renderTable(filteredTableData)
          
}

function sortByColumn(byColumn){

    console.log( typeof byColumn)

    let sortedTableData = store.sort(byColumn)
    console.log(JSON.stringify(sortedTableData))

    if(sortedTableData && sortedTableData!=''){

        updateTable([sortedTableData])
     }


}

    







