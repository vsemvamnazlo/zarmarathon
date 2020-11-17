function countLetter(row, letter) {
    let count = 0;
    for (let i = 0; i < row.length; i++) {
      const value = row.charAt(i);
      
      if (value === letter) count++;
    }
    return count
  }

  function getRow(firstRow, secondRow) {
    if (countLetter(firstRow, letter) > countLetter(secondRow, letter)) return firstRow
    else return secondRow
  }
  
  const firstRow = prompt('введите первую строку', 'мама мыла раму');
  const secondRow = prompt('введите вторую строку', 'собака друг человека');
  let letter = prompt('введите букву', 'а');


  let result = getRow(firstRow, secondRow);

  alert ('в строке "' + result + '" буква "' + letter + '" встречается большее количество раз');
