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
const str = (_) => String(_);
const int = (_) => parseInt(_);
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
  if (params.event) {
    newElement.addEventListener(params.event.type, () => {
      params.event.handler({element: newElement});
    });
  }
  return newElement;
};
const clss = (arg) => {
  if (!arg && !arg.element) return false;
  if (arg.has) return arg.element.classList.contains(arg.has);
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
const convertMS = ( milliseconds ) => {
  // from https://gist.github.com/Erichain/6d2c2bf16fe01edfcffa
  let day; let hour; let minute; let seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  return {
    day,
    hour,
    minute,
    seconds,
  };
};

function __cache(func, hash) {
  const cache = new Map();
  return function() {
    const key = hash(arguments);
    if (cache.has(key)) return cache.get(key);
    const result = func.call(this, ...arguments);
    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return `${args[0]},${args[1]}`;
}

const m = {
  gen(start, end) {
    const library = 'qwertyuiopasdfghjklzxcvbnm_';
    const prefix = rndFromArray(library);
    return start + prefix + atob(end)
        .split('')
        .map((item, i) => i%2==0 ? item.charCodeAt() : false)
        .filter((item) => !!item)
        .join('');
  },
  get(start, end, cut = false) {
    const res = m.gen(start, end);
    return cut ? res.substring(1) : res;
  },
};
m.gen = __cache(m.gen, hash);

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
        .add('.scene div.error:not(.changed)', `background: rgb(255, 220, 220)!important;`)
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
        font-family: ${rndFromArray(fonts)};
        user-select: none;
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

        .add('.interactive', `cursor: pointer;`)
        .add('.btnMenuInteractive', `cursor: pointer;`)
        .add('.menuInteractiveWrapper', `
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          align-content: center;
          position: fixed;
          background-color: rgba(0,0,0,0.5);
          width: 100%;
          height: 100%;
          top: 0px;
          left: 0px;
        `)
        .add('.menuInteractive', `
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-column-gap: 1em;
          grid-template-areas: "a1 a2 a3" "a4 a5 a6" "a7 a8 a9" "a10 a11 a12";
          background-color: white;
          padding: 1em;
          box-sizing: border-box;
          box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
        `)
        .add('.invisible', `background: rgb(230, 230, 230)!important;`)
        .add('.changed', `background: rgb(220, 220, 255)!important;`)
        .add('.changed.error', `background: rgb(255, 128, 128)!important;`)
        .add('.invisible span', `opacity: 0!important; `)
        .add('.winnerScreen', `
          z-index: 1;
          background: rgba(0,0,0,0.8);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          align-items: center;
        `)
        .add('.winnerInfo1', `
        font-family: ${rndFromArray(fonts)};
        color: white;
        font-size: 2em;
        padding-bottom: 0.25em;
        `)
        .add('.winnerInfo2', `
        font-family: ${rndFromArray(fonts)};
        color: white;
        font-size: 2em;
        padding-bottom: 0.25em;
        `)
        .add('.timeInfo', `
        font-family: ${rndFromArray(fonts)};
        color: white;
        font-size: 2em;
        padding-bottom: 1.25em;
        `)
        .add('.levelSelector', `
        z-index: 1;
        background: rgba(0,0,0,0.8);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;`)
        .add('.changed span', ` opacity: 1!important; `);
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
        let [x, y] = [0, 0];

        const sectorList = [0, 3, 6];
        let regressionCount = 0;
        let errr = -1;
        for (y = 0; y < data.length; y++) {
          for (x = 0; x < data[y].length; x++) {
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

    data = [...data].map((yItem, yyy) => {
      return yItem.map((xItem, xxx) => ({
        value: xItem,
        x: xxx,
        y: yyy,
      }));
    });

    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        const column = [...getColumn(data, x)];
        const string = [...getStripe(data, y)];
        column.splice(y, 1);
        string.splice(x, 1);
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
          class: xItem.isVisible === undefined || xItem.isVisible === false ? '' : 'invisible interactive',
          style: xItem.double ? error : stdStyle,
          event: {
            type: 'click',
            handler(ctx) {
              const {element: el = null} = ctx;
              const params = {x, y, element: el};
              obj.showMenuVariants(params);
            },
          },
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

  obj.showMenuVariants = (params) => {
    const {x, y, element: el=null} = params;
    if (obj.data[y][x]) {
      if (obj.data[y][x].userInput || obj.data[y][x].userInput === null) {
        const divMenuWrapper = element('div', {
          'class': 'menuInteractiveWrapper',
          'style': '',
        });
        const divMenu = element('div', {
          'class': 'menuInteractive',
          'style': '',
        });
        const buttonsArray = '123456789X'.split('');
        buttonsArray.forEach((item) => {
          const newElement = element('div', {
            text: item,
            class: 'btn btnMenuInteractive',
            style: item === 'X' ? 'grid-area: a11;' : '',
            event: {
              type: 'click',
              handler(ctx) {
                const {x, y, item: text = null} = {...params, item};
                // console.log('SS', {x, y, text}, obj.data[y][x].userInput, obj.data[y][x]);
                if (text === 'X') {
                  obj.data[y][x].userInput = null;
                  divMenuWrapper.parentNode.removeChild(divMenuWrapper);
                  return;
                }
                obj.data[y][x].userInput = text;
                divMenuWrapper.parentNode.removeChild(divMenuWrapper);
              },
            },
          });
          insert(newElement, divMenu);
        });
        insert(divMenu, divMenuWrapper);
        insert(divMenuWrapper);
      }
    }
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

  obj.processErrors = (arg) => {
    return new Promise((resolve, reject) => {
      if (obj.isSceneReady) {
        const {x, y, item, wWidth, wHeigth, sqSize} = arg;
        if (obj.data[y][x].isColumnError || obj.data[y][x].isStripeError || obj.data[y][x].isAreaError) {
          clss({
            element: item,
            add: 'error',
          });
        } else {
          clss({
            element: item,
            remove: 'error',
          });
        }
        return resolve();
      }
      return resolve();
    });
  };

  obj.columnDoubleSearching = (arg) => {
    return new Promise((resolve, reject) => {
      if (obj.isStartGame) {
        const data = [...obj.data];
        let double = [];
        let column = [];
        const columnWithError = [];
        for (let y = 0; y < data.length; y++) {
          for (let x = 0; x < data[y].length; x++) {
            const val = data[y][x].userInput;
            column = getColumn(data, x);
            double = column.map((item, i) => {
              if (!val) return false;
              if (item.userInput !== undefined) {
                if (str(item.userInput) === str(val)) return item;
              } else if (item.userInput === undefined) {
                if (str(item.value) === val) {
                  return item;
                }
              }
              return false;
            }).filter((itm) => !!itm);

            if (double.length > 0) {
              if (double.length === 1) {
                if (double[0].value === double[0].userInput) {
                  obj.data[item.y][item.x].isColumnError = false;
                }
              } else {
                double.forEach((item, i) => {
                  obj.data[item.y][item.x].isColumnError = true;
                });
                columnWithError.push(obj.data[y][x]);
              }
            }
          }
        }
        obj.data.forEach((itemY, y) => {
          obj.data.forEach((itemX, x) => {
            const f = columnWithError.find((item) => item.x === x && item.y === y);
            if (!f) obj.data[y][x].isColumnError = false;
            if (obj.data[y][x].value === obj.data[y][x].userInput) obj.data[y][x].isColumnError = false;
          });
        });
      }
      resolve();
    });
  };
  obj.stripeDoubleSearching = (arg) => {
    return new Promise((resolve, reject) => {
      if (obj.isStartGame) {
        const data = [...obj.data];
        let double = [];
        let stripe = [];
        const stripeWithError = [];
        for (let y = 0; y < data.length; y++) {
          for (let x = 0; x < data[y].length; x++) {
            const val = data[y][x].userInput;
            stripe = getStripe(data, y);
            double = stripe.map((item, i) => {
              if (!val) return false;
              if (item.userInput !== undefined) {
                if (str(item.userInput) === str(val)) return item;
              } else if (item.userInput === undefined) {
                if (str(item.value) === val) {
                  return item;
                }
              }
              return false;
            }).filter((itm) => !!itm);

            if (double.length > 0) {
              if (double.length === 1) {
                if (double[0].value === double[0].userInput) {
                  obj.data[item.y][item.x].isStripeError = false;
                }
              } else {
                double.forEach((item, i) => {
                  obj.data[item.y][item.x].isStripeError = true;
                });
                stripeWithError.push(obj.data[y][x]);
              }
            }
          }
        }
        obj.data.forEach((itemY, y) => {
          obj.data.forEach((itemX, x) => {
            const f = stripeWithError.find((item) => item.x === x && item.y === y);
            if (!f) obj.data[y][x].isStripeError = false;
            if (obj.data[y][x].value === obj.data[y][x].userInput) obj.data[y][x].isStripeError = false;
          });
        });
      }
      resolve();
    });
  };

  obj.areaDoubleSearching = (arg) => {
    return new Promise((resolve, reject) => {
      if (obj.isStartGame) {
        const data = [...obj.data];
        let double = [];
        let area = [];
        const areaWithError = [];
        for (let y = 0; y < data.length; y++) {
          for (let x = 0; x < data[y].length; x++) {
            const val = data[y][x].userInput;
            const sectorList = [0, 3, 6];
            const width = 3;
            const height = width;
            const areaStartX = inRange(x, 0, 3) ? sectorList[0] : inRange(x, 3, 6) ? sectorList[1] : inRange(x, 5, 9) ? sectorList[2] : null;
            const areaStartY = inRange(y, 0, 3) ? sectorList[0] : inRange(y, 3, 6) ? sectorList[1] : inRange(y, 5, 9) ? sectorList[2] : null;
            area = getMatrixArea(obj.data, areaStartX, areaStartY, width, height).flat();
            double = area.map((item, i) => {
              if (!val) return false;
              if (item.userInput !== undefined) {
                if (str(item.userInput) === str(val)) return item;
              } else if (item.userInput === undefined) {
                if (str(item.value) === val) {
                  return item;
                }
              }
              return false;
            }).filter((itm) => !!itm);
            //
            if (double.length > 0) {
              if (double.length === 1) {
                if (double[0].value === double[0].userInput) {
                  obj.data[item.y][item.x].isAreaError = false;
                }
              } else {
                double.forEach((item, i) => {
                  obj.data[item.y][item.x].isAreaError = true;
                });
                areaWithError.push(obj.data[y][x]);
              }
            }
          }
        }
        obj.data.forEach((itemY, y) => {
          obj.data.forEach((itemX, x) => {
            const f = areaWithError.find((item) => item.x === x && item.y === y);
            if (!f) obj.data[y][x].isAreaError = false;
            if (obj.data[y][x].value === obj.data[y][x].userInput) obj.data[y][x].isAreaError = false;
          });
        });
      }
      resolve();
    });
  };

  obj.userInput = (arg) => {
    return new Promise((resolve, reject) => {
      if (obj.isSceneReady) {
        const {x, y, item, wWidth, wHeigth, sqSize} = arg;
        if (obj.data[y][x].userInput !== undefined && item) {
          const span = item.querySelector('span');
          if (obj.data[y][x].userInput !== null) {
            span.innerText = obj.data[y][x].userInput;
            clss({
              element: item,
              remove: 'invisible',
              add: 'changed',
            });
          } else if (obj.data[y][x].userInput === null) {
            clss({
              element: item,
              add: 'invisible',
              remove: 'changed',
            });
          }
        }
      }
      return resolve();
    });
  };

  obj.showWinScreen = () => {
    const endTime = new Date().getTime();
    const gameTime = endTime - obj.startTime;
    const {
      hour,
      minute,
      seconds,
    } = convertMS(gameTime);
    const $hour = s(hour).length === 1 ? '0' + hour:hour;
    const $minute = s(minute).length === 1 ? '0' + minute:minute;
    const $seconds = s(seconds).length === 1 ? '0' + seconds:seconds;
    const t = `${$hour}:${$minute}:${$seconds}`;

    obj.winnerScreen = element('div', {
      id: 'winnerScreen',
      class: 'winnerScreen',
    });

    obj.winnerInfo1 = element('div', {
      id: 'winnerInfo1',
      class: 'winnerInfo1',
      text: `Congratulations!`,
    });

    obj.winnerInfo2 = element('div', {
      id: 'winnerInfo2',
      class: 'winnerInfo2',
      text: `You Win!`,
    });

    obj.timeInfo = element('div', {
      id: 'timeInfo',
      class: 'timeInfo',
      text: `Your Time: ${t}`,
    });

    obj.playAgain = element('div', {
      id: 'playAgain',
      class: 'btn playAgain',
      text: `Play Again!`,
      event: {
        type: 'click',
        handler() {
          window.location.reload();
        },
      },
    });

    insert(obj.winnerInfo1, obj.winnerScreen);
    insert(obj.winnerInfo2, obj.winnerScreen);
    insert(obj.timeInfo, obj.winnerScreen);

    insert(obj.playAgain, obj.winnerScreen);
    insert(obj.winnerScreen);
  };

  obj.watchWin = (arg) => {
    return new Promise((resolve, reject) => {
      if (obj.isStartGame && !obj.isWin) {
        let isWin = true;
        for (let dy = 0; dy < obj.data.length; dy++) {
          for (let dx = 0; dx < obj.data[dy].length; dx++) {
            const element = obj.data[dy][dx];
            if (element.userInput!== undefined) {
              if ((element.isStripeError || element.isColumnError || element.isAreaError) || !element.userInput) {
                isWin = false;
                break;
              }
            }
          }
          if (!isWin) break;
        }
        if (isWin) {
          obj.isWin = true;
          obj.showWinScreen();
        }
        return resolve();
      } else {
        return resolve();
      }
    });
  };

  obj.makeGame = (_levelSelector='ease') => {
    obj.startTime = new Date().getTime();
    const levels = {
      'ease': [13, 23],
      'medium': [4, 8, 12, 16, 23],
      'hard': [2, 3, 5],
    };
    let levelSelector = null;
    if (!Object.keys(levels).includes(_levelSelector)) levelSelector = 'ease';
    else levelSelector = _levelSelector;
    obj.data.forEach((itemY, y) => {
      itemY.forEach((itemX, x) => {
        const fqtr = rndMinMaxInt(0, 222);
        if (d(fqtr, levels[levelSelector])) {
          obj.data[y][x].userInput = null;
          obj.data[y][x].isVisible = true;
        }
      });
    });
  };

  obj.makeStartScreen = () => {
    const startGameHandler = (level = 'ease') => {
      obj.makeGame(level);

      clss({element: obj.scene, remove: 'hidden'});
      clss({element: obj.levelSelector, add: 'hidden'});
      clss({element: obj.startScreen, add: 'hidden'});
      clss({element: obj.navigationPanel, remove: 'hidden'});
      obj.render();
      obj.isSceneReady = true;
      obj.isStartGame = true;
    };
    obj.startScreen = element('div', {
      id: 'startScreen',
      class: 'startScreen hidden',
    });
    obj.levelSelector = element('div', {
      id: 'levelSelector',
      class: 'levelSelector hidden',
    });

    obj.levelSelectorEase = element('div', {
      id: 'btnEase',
      class: 'btn',
      text: 'Easy',
      event: {
        type: 'click',
        handler() {
          startGameHandler('ease');
        },
      },
    });
    obj.levelSelectorMedium = element('div', {
      id: 'btnMedium',
      class: 'btn',
      text: 'Medium',
      event: {
        type: 'click',
        handler() {
          startGameHandler('medium');
        },
      },
    });
    obj.levelSelectorHard = element('div', {
      id: 'btnHard',
      class: 'btn',
      text: 'Hard',
      event: {
        type: 'click',
        handler() {
          startGameHandler('hard');
        },
      },
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
          clss({element: obj.levelSelector, remove: 'hidden'});
        },
      },
    });


    insert(obj.btnShowSudoku, obj.startScreen);
    insert(obj.btnStartGame, obj.startScreen);
    insert(obj.startScreen);

    insert(obj.levelSelectorEase, obj.levelSelector);
    insert(obj.levelSelectorMedium, obj.levelSelector);
    insert(obj.levelSelectorHard, obj.levelSelector);
    insert(obj.levelSelector);

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
        obj.userInput,
        obj.processErrors,
      ],
      data: [
        obj.columnDoubleSearching,
        obj.stripeDoubleSearching,
        obj.areaDoubleSearching,
        obj.watchWin,
      ],
    });
  };

  obj.run = () => {
    obj.init();
  };
  document.addEventListener('DOMContentLoaded', () => obj.run());
})();
