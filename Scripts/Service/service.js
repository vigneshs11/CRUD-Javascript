


 export const fetchService =  async function(){
     
    var tableData = new Object()
    var filteredData = new Object()

    await fetch('https://my-json-server.typicode.com/darshanp40/employeedb/employees')
     .then(response => response.json())
     .then(json =>{
         tableData = json;
       filteredData = json;
       //console.log(tableData)
       
      }).catch(error => (console.error('servcie.js - fetch employees')))
      //console.log(tableData)
      return tableData;
}