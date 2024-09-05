import { updateView, initializeView, updateGridSize } from './render.js';
import { grid } from './grid.js';
import { collaspeGrid, findLowestScoreNode, getOneRandomPossibleValueFromNode } from './waveFunctionCollaspe.js';
const ref_gridItem = 'grid-item';
const ref_Influence = 'grid-item-influence';
const perIterationTimer = 50;
const waitBeforeNextRun = 500;
let prevSelectedInfluenceItems = [];
const button = document.querySelector('button');
//initialize grid
let gridInstance = new grid();
const renderGrid = initializeView(gridInstance);
updateGridSize();

window.addEventListener("resize", () => {
    updateGridSize();
});

let programID;
export const runProgram = () => {
    if (programID !== null) {
        clearInterval(programID);
        gridInstance = new grid();
        updateGridSize();
    }
    console.log('run');
    setValueToNodeAndUpdateView(gridInstance.getRandomNode(), gridInstance.generateRandomNumber());
    setValueToNodeAndUpdateView(gridInstance.getRandomNode(), gridInstance.generateRandomNumber());
    setValueToNodeAndUpdateView(gridInstance.getRandomNode(), gridInstance.generateRandomNumber());
    programID = setInterval(() => {
        const lowestNode = findLowestScoreNode(gridInstance);
        if (lowestNode === null) { }
        else {
            setValueToNodeAndUpdateView(lowestNode, getOneRandomPossibleValueFromNode(lowestNode));
            highlightInfluenceNodes(lowestNode);
            //play animation @keyframe on lowestNode
            const targetNodeElement = getElementFromGridNode(lowestNode);
            targetNodeElement === null || targetNodeElement === void 0 ? void 0 : targetNodeElement.classList.add('grid-item-animation');
            setTimeout(() => {
                targetNodeElement === null || targetNodeElement === void 0 ? void 0 : targetNodeElement.classList.remove('grid-item-animation');
            }, perIterationTimer * 0.75);
            console.log('running program - ' + programID);
        }
        const currentState = isSearchOver(gridInstance);
        if (currentState !== 0 /* programState.runnning */) {
            if (programID) {
                clearInterval(programID);
            }
            if (currentState === 2 /* programState.success */) {
                console.log('program suceeded');
                prevSelectedInfluenceItems.forEach(item => item.classList.remove(ref_Influence));
            }
            else {
                console.log('program failed');
                setTimeout(() => {
                    runProgram();
                }, waitBeforeNextRun);
            }
        }
    }, perIterationTimer);
};
//runProgram();
export function isSearchOver(gridInstance) {
    let state = 0 /* programState.runnning */;
    let hasSucceeded = true;
    gridInstance.grid.forEach((row) => {
        row.forEach((node) => {
            if (node.value === 0) {
                hasSucceeded = false;
                if (node.getPossibleValues().size === 0) {
                    state = 1 /* programState.failed */;
                    return state;
                }
            }
        });
    });
    if (hasSucceeded)
        return 2 /* programState.success */;
    else
        return state;
}
function getGridNodeFromElement(targetElement) {
    const refInfluence = 'grid-item-influence';
    const refGridItem = 'grid-item';
    // proper selection
    if (targetElement && targetElement.classList.contains(refGridItem)) {
        const row = parseInt(targetElement.id.split('-')[2]);
        const col = parseInt(targetElement.id.split('-')[3]);
        const gridNode = gridInstance.grid[row][col];
        return gridNode;
    }
    //improper selection
    else {
        return null;
    }
}
function getElementFromGridNode(gridNode) {
    const id = `${ref_gridItem}-${gridNode.pos.x}-${gridNode.pos.y}`;
    const gridItem = document.getElementById(id);
    return gridItem;
}
function highlightInfluenceNodes(targetNode) {
    // proper selection
    if (targetNode !== null) {
        if (prevSelectedInfluenceItems) {
            prevSelectedInfluenceItems.forEach(item => item.classList.remove(ref_Influence));
        }
        const influenceNodes = targetNode.influenceNodes;
        influenceNodes.forEach(node => {
            const id = `${ref_gridItem}-${node.pos.x}-${node.pos.y}`;
            const influenceNode = document.getElementById(id);
            if (influenceNode !== null) {
                influenceNode.classList.add(ref_Influence);
                prevSelectedInfluenceItems.push(influenceNode);
            }
        });
    }
    //improper selection
    else {
        if (prevSelectedInfluenceItems) {
            prevSelectedInfluenceItems.forEach(item => item.classList.remove(ref_Influence));
        }
    }
}
function setValueToNodeAndUpdateView(targetNode, value) {
    if (targetNode !== null) {
        targetNode.value = value;
        collaspeGrid(gridInstance);
        updateView(gridInstance);
    }
}
//not used
//detect hoover
document.addEventListener('mouseover', (event) => {
    // const targetNode = getGridItemElement(event.target as HTMLElement);
    // highlightInfluenceNodes(targetNode as gridNode);
});
//detec click and change value
document.addEventListener('click', (event) => {
    // const targetNode = getGridItemElement(event.target as HTMLElement);
    // assignValueToNode(targetNode as gridNode);
});
//# sourceMappingURL=app.js.map