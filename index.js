const rndMinMax = (min, max) => Math.random() * (max - min) + min;
const rndMinMaxInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rndFromArray = (arr) => arr[rndMinMaxInt(0, arr.length - 1)];
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
const inRange = (val, a, b) => val >= a && val < b;

const str = (_) => String(_);

const d = (f, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (f % arr[i] === 0) return true;
  }
  return false;
};

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
  if (params.event) newElement.addEventListener(params.event.type, params.event.handler);
  return newElement;
};
const clss = (arg) => {
  if (!arg && !arg.element) return false;
  if (arg.add) {
    if (!arg.element.classList.contains(arg.add)) {
      arg.element.classList.add(arg.add);
    }
  }
  if (arg.remove) {
    if (arg.element.classList.contains(arg.remove)) {
      arg.element.classList.remove(arg.remove);
    }
  }
};

const s = (_) => JSON.stringify(_);

(()=>{
  const obj = {
    cssCorn: null,
    data: [],
    scene: null,
    isSceneReady: false,
    isStartGame: false,
  };

  const countX = 9;
  const countY = countX;
  const fonts = [
    'Georgia, serif',
    '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    '"Times New Roman", Times, serif',
    'Arial, Helvetica, sans-serif',
    '"Arial Black", Gadget, sans-serif',
    'Impact, Charcoal, sans-serif',
    '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
    'Tahoma, Geneva, sans-serif',
    '"Trebuchet MS", Helvetica, sans-serif',
    'Verdana, Geneva, sans-serif',
    '"Courier New", Courier, monospace',
    '"Lucida Console", Monaco, monospace',
  ];

  obj.addStyles = () => {
    // console.log('[addStyles]');
    const wWidth = window.innerWidth - 20;
    const wHeigth = window.innerHeight - 20;
    const sqSize = Math.min(wWidth, wHeigth);
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
        .add('.loading', `
        font-size: ${rndMinMax(1.2, 4.5)}em;
        font-family: ${rndFromArray(fonts)};
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
        width: ${sqSize}px;
        height: ${sqSize}px;
        transition: width 0.15s 0s ease-out, height 0.1s 0s ease-out;
    `)
        .add('.scene div', `
        box-sizing: border-box;
        text-align: center;
        line-height: 1;
        outline: 1px solid rgba(255, 0, 0, 0.25);
        width: ${sqSize / countX}px;
        height: ${sqSize / countY}px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;
        transition: width 0.15s 0s ease-out, height 0.15s 0s ease-out, font-size 0.25s 0s ease-out;
        font-weight 0.25s 0s ease-out;
    `)
        .add('.scene div span', `
        transition: transform 0.25s 0s ease-out;
    `)
        .add('.startScreen', `
        display: flex;
        background-color: #fff;
        flex-direction: column;
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
        .add('.btn', `
        display: inline-block;
        background-color: #fff;
        outline: 1px solid #ccc;
        padding: 1em 2em;
        margin-bottom: 1em;
        line-height: 1;
        font-size: 18px;
        cursor: pointer;
    `)
        .add('.btn:hover', `
        display: inline-block;
        background-color: #efa;
        outline: 2px solid #ccc;
    `)
        .add('.navigationPanel', `
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      top: 20px;
      left: 20px;
      padding: 1em;
    `)
        .add('.invisible', `background: rgb(230,230,230)!important; `)
        .add('.invisible span', ` opacity: 0!important; `);
  };

  obj.makeScene = async () => {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        // console.log('[makeScene]');
        obj.scene = element('div', {
          id: 'scene',
          class: 'scene hidden',
          style: 'transform: scale(1);',
        });
        obj.loading = document.body.querySelector('.loading');
        if (!obj.loading) {
          obj.loading = element('div', {
            id: 'loading',
            class: 'loading',
            text: 'Loading! Please wait!...',
          });
        }
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
        stdStyle += `
          font-size: ${rndMinMax(0.9, 3.1)}em;
          font-family: ${rndFromArray(fonts)};
        `;

        let error = ``;
        error += `${x === 2 || x === 5 ? borderRight : ''}`;
        error += `${y === 2 || y === 5 ? borderBottom : ''}`;
        error += `background: rgba(255, 0, 0, 0.30);`;

        const newElement = element('div', {
          class: xItem.isVisible === undefined || xItem.isVisible === false ? '' : 'invisible',
          style: xItem.double ? error : stdStyle,
        });
        const span = element('span', {
          text: str(xItem.value),
          style: `transform: rotate(${rndMinMaxInt(-22, 22)}deg);`,
        });
        insert(span, newElement);
        insert(newElement, obj.scene);
      });
    });
  };

  obj.loop = (callbackArray) => {
    let timeout = rndMinMaxInt(80, 320);
    const process = async () => {
      timeout = rndMinMaxInt(80, 320);
      const countX = 9;
      const countY = 9;
      const wWidth = window.innerWidth - 20;
      const wHeigth = window.innerHeight - 20;
      const sqSize = Math.min(wWidth, wHeigth);

      for (let i = 0; i < callbackArray.data.length; i++) {
        await callbackArray.data[i]();
      }
      let x = 0;
      let y = 0;
      const childrens = [...obj.scene.querySelectorAll('div')];
      for (let i = 0; i < childrens.length; i++) {
        const item = childrens[i];
        if (x > countX - 1) {
          x=0; y++;
        }
        for (let i = 0; i < callbackArray.render.length; i++) {
          await callbackArray.render[i]({x, y, item, wWidth, wHeigth, sqSize});
        }
        x++;
      }

      setTimeout(process, timeout);
    };
    process();
  };

  obj.sizeControll = (arg) => {
    return new Promise((resolve, reject) => {
      if (obj.isSceneReady) {
        const {x, y, item, wWidth, wHeigth, sqSize} = arg;
        obj.scene.style.width = `${sqSize}px`;
        obj.scene.style.height = `${sqSize}px`;
        item.style.width = `${sqSize / countX}px`;
        item.style.height = `${sqSize / countY}px`;
      }
      return resolve();
    });
  };

  obj.charsMutate = (arg) => {
    return new Promise((resolve, reject) => {
      if (obj.isSceneReady) {
        const {x, y, item, wWidth, wHeigth, sqSize} = arg;
        const fqtr = rndMinMaxInt(0, 222);
        if (d(fqtr, [13, 121])) item.style.fontSize = `${rndMinMax(0.9, 3.1)}em`;
        if (d(fqtr, [5, 221])) item.style.fontFamily = rndFromArray(fonts);
        if (d(fqtr, [13, 147])) {
          item.querySelector('span')
              .style.transform = `rotate(${rndMinMaxInt(-22, 22)}deg)`;
        }
      }
      return resolve();
    });
  };

  obj.watchWin = (arg) => {
    return new Promise((resolve, reject) => {
      if (obj.isStartGame) {
        let hasInvisible = true;
        for (let dy = 0; dy < obj.data.length; dy++) {
          for (let dx = 0; dx < obj.data[dy].length; dx++) {
            let element = obj.data[dy][dx];
            if(!element.isVisible) hasInvisible = false;
            break;
          }
          if(!hasInvisible) break;
        }
        console.log('not win');
        return resolve();
      } else {
        return resolve();
      }
    });
  };

  obj.makeGame = (_levelSelector='ease') => {
    const levels = {
      'ease': [13, 23],
      'hard': [2, 3, 5],
    };
    let levelSelector = null;
    if (!Object.keys(levels).includes(_levelSelector)) levelSelector = 'ease';
    else levelSelector = _levelSelector;
    obj.data.forEach((itemY, y) => {
      itemY.forEach((itemX, x) => {
        const fqtr = rndMinMaxInt(0, 222);
        obj.data[y][x].isVisible = d(fqtr, levels[levelSelector]) ? true : false;
      });
    });
  };

  obj.makeStartScreen = () => {
    obj.startScreen = element('div', {
      id: 'startScreen',
      class: 'startScreen hidden',
    });
    obj.btnShowSudoku = element('div', {
      id: 'btnShowSudoku',
      class: 'btnShowSudoku btn',
      text: 'Show sudoku',
      event: {
        type: 'click',
        handler() {
          clss({element: obj.scene, remove: 'hidden'});
          clss({element: obj.startScreen, add: 'hidden'});
          clss({element: obj.navigationPanel, remove: 'hidden'});
          obj.render();
          obj.isSceneReady = true;
        },
      },
    });

    obj.btnStartGame = element('div', {
      id: 'btnStartGame',
      class: 'btnStartGame btn',
      text: 'Start game',
      event: {
        type: 'click',
        handler() {
          obj.makeGame('ease');
          clss({element: obj.scene, remove: 'hidden'});
          clss({element: obj.startScreen, add: 'hidden'});
          clss({element: obj.navigationPanel, remove: 'hidden'});
          obj.render();
          obj.isSceneReady = true;
          obj.isStartGame = true;
        },
      },
    });


    insert(obj.btnShowSudoku, obj.startScreen);
    insert(obj.btnStartGame, obj.startScreen);
    insert(obj.startScreen);
    clss({element: obj.loading, add: 'hidden'});
    clss({element: obj.startScreen, remove: 'hidden'});
  };

  obj.makeNavigation = () => {
    obj.navigationPanel = element('div', {
      id: 'navigationPanel',
      class: 'navigationPanel hidden',
    });
    obj.navigationBack = element('div', {
      id: 'navigationBack',
      class: 'navigationBack btn',
      text: 'Back',
      event: {
        type: 'click',
        handler() {
          window.location.reload();
        },
      },
    });

    insert(obj.navigationBack, obj.navigationPanel);
    insert(obj.navigationPanel);
  };

  obj.makeUI = () => {
    obj.makeStartScreen();
    obj.makeNavigation();
  };

  obj.init = async () => {
    obj.cssCorn = new $CssCorn({id: 'cssCorn', willRender: true});
    obj.addStyles();
    await obj.makeScene();
    await obj.createData();
    obj.makeUI();
    obj.loop({
      render: [
        obj.sizeControll,
        obj.charsMutate,
      ],
      data: [
        obj.watchWin,
      ],
    });
  };

  obj.run = () => {
    obj.init();
  };
  document.addEventListener('DOMContentLoaded', () => obj.run());
})();
