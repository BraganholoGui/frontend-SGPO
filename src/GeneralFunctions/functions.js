import Swal from 'sweetalert2';
const XLSX = require('xlsx');


export function toast(icon, msg) {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    }).fire({
      icon: icon,
      title: msg
    });
  }

  export function formattedDate(date) {
    let dateFormated = new Date(date)
    let finalDate = (adicionaZero(dateFormated.getDate().toString())) + '/' + (adicionaZero(dateFormated.getMonth().toString())) + '/' + dateFormated.getFullYear()
    return finalDate;
  }

  function adicionaZero(numero){
    if (numero <= 9) 
        return "0" + numero;
    else
        return numero; 
}

export function arrayToXLSX(arrayOfObjects, sheetName, fileName) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(arrayOfObjects);
  
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
  XLSX.writeFile(wb, fileName);
}

export function findMaxPrice(listOfObjects) {
  let maxPrice = -1; 

  for (const obj of listOfObjects) {
    if (obj.price > maxPrice) {
      maxPrice = obj.price;
    }
  }

  return maxPrice;
}
export function findMaxQtdMin(listOfObjects) {
  let maxQtdMin = -1; 

  for (const obj of listOfObjects) {
    if (obj.quantity_min > maxQtdMin) {
      maxQtdMin = obj.quantity_min;
    }
  }

  return maxQtdMin;
}

// export function validateEmail(email) {
//   const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//   return regex.test(email);
// }