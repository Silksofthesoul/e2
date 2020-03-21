if (obj.isStartGame) {
  // console.log(obj.data,'!!!');
  let data = [...obj.data];
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      // const element = data[y][x];
      // console.log(element, y, x);
      if (element.userInput) {
        const val = element.userInput;
        console.log(val, '!');
        // const sectorList = [0, 3, 6];
        // const width = 3;
        // const height = width;
        // const areaStartX = inRange(x, 0, 3) ? sectorList[0] : inRange(x, 3, 6) ? sectorList[1] : inRange(x, 5, 9) ? sectorList[2] : null;
        // const areaStartY = inRange(y, 0, 3) ? sectorList[0] : inRange(y, 3, 6) ? sectorList[1] : inRange(y, 5, 9) ? sectorList[2] : null;
        const column = getColumn(data, x);
        const stripe = getStripe(data, y);
        // const area = getMatrixArea(obj.data, areaStartX, areaStartY, width, height);

        const columnIndex = column.findIndex((item, i) => {
          if (y===i) return false;
          if (item.userInput !== undefined) {
            if (item.userInput !== null) {
              if (str(item.userInput) === str(val.userInput)) return true;
            }
          } else {
            if (str(item.value) === str(val.userInput)) return true;
          }
          return false;
        });

        // const stripeIndex = stripe.findIndex((item, i) => {
        //   if (x===i) return false;
        //   if (item.userInput !== undefined) {
        //     if (item.userInput !== null) {
        //       if (str(item.userInput) === str(val.userInput)) return true;
        //     }
        //   } else {
        //     if (str(item.value) === str(val.userInput)) return true;
        //   }
        //   return false;
        // });
        // const areaIndexs = area.map((itemY, yy) => {
        //   if (yy + y === y) return false;
        //   const indexes = itemY.map((itemX, xx) => {
        //     if (xx + x === x) return false;
        //     if (itemX === val) return [yy + y, xx + x];
        //     return false;
        //   });
        //   return indexes;
        // });
        // if (columnIndex !== -1) {
        //   obj.data[columnIndex][x].isError = true;
        //   element.isError = true;
        // }
        // if (stripeIndex !== -1) {
        //   obj.data[y][stripeIndex].isError = true;
        //   element.isError = true;
        // }
        // console.log('>>', areaIndexs);
        resolve();
      }
      return resolve();
    }
  }
} else {
  return resolve();
}
