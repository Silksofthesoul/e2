const rndMinMaxInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const makeMatrix = async (width, height, fn) => {
  const result = [];
  for (let y = 0; y < height; y++) {
    result.push([]);
    for (let x = 0; x < height; x++) {
      const newVal = await fn(x, y);
      result[result.length - 1].push(newVal);
    }
  }
  return result;
};
const range = (...args) => {
  let start = 0;
  let end = 0;
  let step = 0;
  if (args.length === 0) {
    return [];
  } if (args.length === 1) {
    start = 0;
    end = args[0];
    step = 1;
  } else if (args.length === 2) {
    start = args[0];
    end = args[1];
    step = 1;
  } else if (args.length === 3) {
    start = args[0];
    end = args[1];
    step = args[2];
  } else {
    start = args[0];
    end = args[1];
    step = args[2];
  }
  const result = [];
  let isRun = true;
  let current = start;
  while (isRun) {
    result.push(current);
    current += step;
    if (current > end) {
      isRun = false;
      break;
    }
  }
  return result;
};

const rotateSqMatrixRight = (arr) => {
  const y = arr.length;
  const x = arr[0].length;
  // let [xc, yc] = [0, 0];
  const res = [];
  for (let xc = 0; xc < y; xc++) {
    let row = [];
    for (let yc = 0; yc < x; yc++) {
      row.push(arr[yc][xc]);
    }
    res.push([...row]);
    row = [];
  }
  return res;
};

const str = (_) => String(_);

const insert = (child, _root=null) => {
  const root = _root || document.body;
  if (!child) return false;
  root.appendChild(child);
};
const element = (type, _params = {}) => {
  const params = {
    ..._params,
  };
  const newElement = document.createElement(type);
  if (params.id) newElement.setAttribute('id', params.id);
  if (params.class) newElement.setAttribute('class', params.class);
  if (params.style) newElement.setAttribute('style', params.style);
  if (params.text) newElement.innerText = params.text;
  return newElement;
};
const s = (_) => JSON.stringify(_);
(()=>{
  const obj = {
    cssCorn: null,
    data: [],
    scene: null,
  };

  obj.addStyles = () => {
    console.log('[addStyles]');
    const width = 600;
    const height = width;
    const countX = 9;
    const countY = countX;

    obj.cssCorn
        .add('body', `
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;
        position: fixed;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        line-height: 1;
        font-size: 18px;
    `)
        .add('.hidden', `
        display: none!important;
    `)
        .add('.scene', `
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        background: rgba(255, 0, 0, 0.15);
        width: 600px;
        height: 600px;
    `)
        .add('.scene div', `
        box-sizing: border-box;
        text-align: center;
        line-height: 3.6em;
        outline: 1px solid rgba(255, 0, 0, 0.25);
        width: ${width / countX}px;
        height: ${height / countY}px;
    `);
  };

  obj.makeScene = async () => {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        console.log('[makeScene]');
        obj.scene = element('div', {id: 'scene', class: 'scene hidden'});
        obj.loading = element('div', {id: 'loading', class: 'loading', text: 'Loading! Please wait!...'});
        insert(obj.scene);
        insert(obj.loading);
        resolve();
      }, 1000);
    });
  };

  obj.createData = async () => {
    const getColumn = (matrix, x) => [...matrix].map((item) => item[x]);
    const getStripe = (matrix, y) => [...matrix][y];
    const getMatrixArea = (matrix, startX, startY, width, height) => [...matrix]
        .map((itemY, y) =>
          y >= startY && y < startY + height ?
            itemY
                .map((itemX, x) =>
              x >= startX && x < startX + width ?
                itemX : false)
                .filter((itm)=>itm!==false) : false)
        .filter((itm)=>itm!==false);
    const setMatrixElement = (_matrix, x, y, newVal) => {
      const matrix = [..._matrix];
      matrix[y][x] = newVal;
      return matrix;
    };
    const setMatrixArea = (matrix, startX, startY, width, height, fn) => [...matrix]
        .map((itemY, y) =>
            y >= startY && y < startY + height ?
              itemY
                  .map((itemX, x) =>
                x >= startX && x < startX + width ?
                  fn(x, y, itemX) : itemX)
                  : itemY);
    const rndFromArray = (arr) => arr[rndMinMaxInt(0, arr.length - 1)];
    const inRange = (val, a, b) => val >= a && val < b;

    const asset = range(1, 9);
    const width = 9;
    const height = width;
    const EMPTY = '.';
    const dataTemplate = await makeMatrix(width, height, (x, y) => EMPTY);
    const generateNewVal = async (gen, exclude) => {
      return new Promise(async (resolve, reject) => {
        let newVal = gen();
        if (exclude.length >= asset.length) return reject('error!');
        if (exclude.includes(newVal)) {
          try {
            newVal = await generateNewVal(gen, exclude);
          } catch (e) {
            return reject(e);
          }
        }
        return resolve(newVal);
      });
    };

    const generateMatrix = async (_data) => {
      return new Promise(async (resolve, reject) => {
        let data = [..._data];
        // const isStop = false;
        // const stopX = 7;
        // const stopY = 7;
        let [x, y] = [0, 0];

        const sectorList = [0, 3, 6];
        let regressionCount = 0;
        let errr = -1;
        for (y = 0; y < data.length; y++) {
          // if (y > stopY) break;
          // if (isStop) break;
          for (x = 0; x < data[y].length; x++) {
            // if (x > stopX) break;
            // if (x > stopX && y > stopY) isStop=true;
            const column = getColumn(data, x);
            const stripe = getStripe(data, y);
            let areaStartX = inRange(x, 0, 3) ? sectorList[0] : inRange(x, 3, 6) ? sectorList[1] : inRange(x, 5, 9) ? sectorList[2] : null;
            let areaStartY = inRange(y, 0, 3) ? sectorList[0] : inRange(y, 3, 6) ? sectorList[1] : inRange(y, 5, 9) ? sectorList[2] : null;
            if (areaStartX===null || areaStartY===null) console.log('alarm');
            const areaWidth = 3;
            const areaHeight = 3;
            const area = getMatrixArea(data, areaStartX, areaStartY, areaWidth, areaHeight);
            const exclude = [...new Set([...column, ...stripe, ...area.flat()].filter((itm) => itm !== EMPTY))];
            let newVal = null;
            let isError = false;
            try {
              newVal = await generateNewVal(() => rndFromArray(asset), [...exclude]);
            } catch (e) {
              isError = true;
            }
            if (!isError) {
              data = setMatrixElement(data, x, y, newVal);
            } else {
              errr++;
              if (errr > 500) return reject(['error']);
              x = areaStartX - 1;
              y = areaStartY - 1;
              if (y < 0) y = 0;
              if (x < 0) x = 0;
              if (y !== 0 && x !== 0) {
                regressionCount++;
                if (regressionCount > 3) {
                  regressionCount = 0;
                  x = 0;
                  y = 0;
                  areaStartX = 0;
                  areaStartY = 0;
                  data = setMatrixArea(data, 0, 0, 9, 9, ()=> EMPTY);
                }
              }
              data = setMatrixArea(data, areaStartX, areaStartY, areaWidth, areaHeight, ()=> EMPTY);
              if (x === 0 && y === 0) data = setMatrixElement(data, x, y, rndFromArray(asset));
            }
          }
        }
        return resolve(data);
      });
    };


    let data = [];
    const maxTry = 20;
    let tryIt = -1;
    let isError = false;
    while (data.length < 0 || tryIt < maxTry) {
      isError = false;
      try {
        tryIt++;
        data = await generateMatrix(dataTemplate);
      } catch (e) {
        isError = true;
      }
      if (!isError) break;
    }
    if (data.length === 0) window.location.reload();

    data = [...data].map((yItem) => {
      return yItem.map((xItem) => ({value: xItem}));
    });

    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        const column = [...getColumn(data, x)];
        const string = [...getStripe(data, y)];
        // console.log(x,y, column, string);
        column.splice(y, 1);
        string.splice(x, 1);
        // console.log(data[y][x].value, column, string, '!@#');
        fY = column.find((itm) => itm.value === data[y][x].value);
        fX = string.find((itm) => itm.value === data[y][x].value);
        if (fY || fX) data[y][x].double = true;
      }
    }

    obj.data = data;
  };

  obj.render = () => {
    if (!obj.data) return false;
    const borderRight = 'border-right: 3px solid rgba(0,0,100,0.5);';
    const borderBottom = 'border-bottom: 3px solid rgba(0,0,100,0.5);';

    obj.data.forEach((yItem, y) => {
      yItem.forEach((xItem, x) => {
        let stdStyle = ``;
        stdStyle += `${x === 2 || x === 5 ? borderRight : ''}`;
        stdStyle += `${y === 2 || y === 5 ? borderBottom : ''}`;
        stdStyle += `background: rgba(255, 255, 255, 1);`;

        let error = ``;
        error += `${x === 2 || x === 5 ? borderRight : ''}`;
        error += `${y === 2 || y === 5 ? borderBottom : ''}`;
        error += `background: rgba(255, 0, 0, 0.30);`;

        const newElement = element('div', {
          text: str(xItem.value),
          style: xItem.double ? error : stdStyle,
        });
        insert(newElement, obj.scene);
      });
    });
    setTimeout(() => {
      if (obj.scene.classList.contains('hidden')) {
        obj.scene.classList.remove('hidden');
      }
      if (!obj.loading.classList.contains('hidden')) {
        obj.loading.classList.add('hidden');
      }
    }, 1000);
  };

  obj.init = async () => {
    obj.cssCorn = new $CssCorn({id: 'cssCorn', willRender: true});
    await obj.makeScene();
    await obj.createData();
    obj.addStyles();
    obj.render();
  };

  obj.run = () => {
    obj.init();
  };
  document.addEventListener('DOMContentLoaded', () => obj.run());
})();
