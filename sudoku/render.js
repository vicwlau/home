import { GRID_COL, GRID_ROW } from './grid.js';
import { isSearchOver, runProgram } from './app.js';
const ref_MainHTMLSection = '.section-sudoku';

const ref_MainContainer = 'main-container';
const ref_Grid = 'grid';
const ref_GridItem = 'grid-item';
const ref_GridItemInvalid = 'grid-item-invalid';
const ref_PossibleValueContainer = 'possible-value-container';
const ref_PossibleValueTile = 'possible-value-tile';
const ref_ResetButton = 'reset-button';
const cs_DIV = 'div';
const cs_BUTTON = 'button';
//initialize 2D matrix for mainView
const mainView = Array(GRID_ROW).fill(null).map(() => Array(GRID_COL).fill(null));
const possibleValuesView = Array(GRID_ROW).fill(null).map(() => Array(GRID_COL).fill(null));
export function initializeView(inputGrid) {
    var _a, _b;
    //create main container
    const rows = inputGrid.rows;
    const columns = inputGrid.columns;
    let mainContainer = document.querySelector(`.${ref_MainContainer}`);
    //create reset button before main container
    const resetButton = document.createElement('button');
    resetButton.classList.add(ref_ResetButton);
    resetButton.textContent = "run";
    resetButton.addEventListener('click', () => {
        runProgram();
    });
    (_a = document.querySelector(ref_MainHTMLSection)) === null || _a === void 0 ? void 0 : _a.appendChild(resetButton);
    if (mainContainer) { }
    else {
        mainContainer = document.createElement(cs_DIV);
        mainContainer.classList.add(ref_MainContainer);
        (_b = document.querySelector(ref_MainHTMLSection)) === null || _b === void 0 ? void 0 : _b.appendChild(mainContainer);
    }
    //create grid layout
    const grid = document.createElement(cs_DIV);
    grid.classList.add(ref_Grid);
    mainContainer.appendChild(grid);
    //create possible values layout
    const gridPossibleValues = document.createElement(cs_DIV);
    gridPossibleValues.classList.add(ref_Grid);
    mainContainer.appendChild(gridPossibleValues);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const gridItem = document.createElement(cs_DIV);
            gridItem.classList.add(ref_GridItem);
            //add id to element
            gridItem.id = `${ref_GridItem}-${i}-${j}`;
            grid.appendChild(gridItem);
            mainView[i][j] = gridItem;
            const possibleValues = inputGrid.grid[i][j].possibleValues;
            const possibleValueContainerElement = document.createElement(cs_DIV);
            possibleValueContainerElement.classList.add(ref_PossibleValueContainer);
            gridPossibleValues.appendChild(possibleValueContainerElement);
            possibleValues.forEach((value) => {
                const possibleValuesElement = document.createElement(cs_DIV);
                possibleValuesElement.classList.add(ref_PossibleValueTile);
                possibleValuesElement.textContent = value.toString();
                possibleValueContainerElement.appendChild(possibleValuesElement);
            });
            possibleValuesView[i][j] = possibleValueContainerElement;
        }
    }
}
export function updateView(inputGrid) {
    const rows = inputGrid.rows;
    const columns = inputGrid.columns;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const _value = inputGrid.grid[i][j].value;
            const mainViewElement = mainView[i][j];
            //update main tile value
            mainViewElement.textContent = _value === 0 ? '' : _value.toString();
            const possibleValueContainerElement = possibleValuesView[i][j];
            //update possible value container bg color based on number of possible values
            const numberPossibleValues = inputGrid.grid[i][j].possibleValues.size;
            //reset invalid tile color
            mainViewElement.classList.remove(ref_GridItemInvalid);
            if (numberPossibleValues === 0) {
                if (_value === 0) {
                    mainViewElement.classList.add(ref_GridItemInvalid);
                    possibleValueContainerElement.style.backgroundColor = 'rgba(255,0,0,0.25)';
                }
                else {
                    possibleValueContainerElement.style.opacity = '0.1';
                }
            }
            else {
                possibleValueContainerElement.style.opacity = '1';
                const alpheValue = Math.max(0, .7 - (numberPossibleValues / 9));
                possibleValueContainerElement.style.backgroundColor = `rgba(0,255,0,${alpheValue})`;
            }
            const possibleValueElements = possibleValueContainerElement.children;
            //grey out possible values
            Array.from(possibleValueElements).forEach((element) => {
                const value = parseInt(element.textContent);
                if (inputGrid.grid[i][j].possibleValues.has(value)) {
                    element.classList.remove('possible-value-removed');
                }
                else {
                    element.classList.add('possible-value-removed');
                }
            });
        }
    }
    if (isSearchOver(inputGrid) === 2 /* programState.success */) {
        mainView.forEach((row) => row.forEach((element) => element.classList.add('grid-item-success')));
    }
    else {
        mainView.forEach((row) => row.forEach((element) => element.classList.remove('grid-item-success')));
    }
}
//# sourceMappingURL=render.js.map