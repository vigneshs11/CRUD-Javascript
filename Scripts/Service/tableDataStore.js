

export function tableDataStore(){


    var tableData  = new Object()
    var ASC_ORDER = false;

    function setTableDataStore(tableData){
       
        this.tableData = tableData;

        
    }

    function dispatchUpdateEvent(){
           
        var event = new CustomEvent("updateData", { "detail": "tabelData has been updated" });
        console.log(event)
         document.dispatchEvent(event);
    }

    function getTableDataStore(){
           
         
        return [...this.tableData]
    }

    function getToggle(){
        ASC_ORDER =!ASC_ORDER

        return ASC_ORDER
    }

    function returnEmployee(id){
        
        return this.tableData[0][id]
    }

    function deleteEmployee(id){
          
        console.log('delete store ' + id[10] + ' ')
        this.tableData[0].splice(id[10],1)
        dispatchUpdateEvent();
        

    }


    function sortData(byColumn){

        console.log(byColumn)

        return this.tableData[0].sort((a,b)=> {
               
               
              
                if(a[byColumn].toLowerCase() > b[byColumn].toLowerCase())
                 return 1
                 else if (a[byColumn].toLowerCase() < b[byColumn].toLowerCase()) 
                 return -1
                 else
                 return 0 
              
    })
    }


    return {
        get:getTableDataStore,
        set:setTableDataStore,
        sort:sortData,
        getEmployee:returnEmployee,
        deleteEmployee:deleteEmployee
    }
}

