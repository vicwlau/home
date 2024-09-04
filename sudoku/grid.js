export const GRID_ROW = 9;
export const GRID_COL = 9;
export class grid {
    constructor() {
        this.grid = new Array();
        this.rows = GRID_ROW;
        this.columns = GRID_COL;
        for (let x = 0; x < this.rows; x++) {
            this.grid.push([]);
            for (let y = 0; y < this.columns; y++) {
                this.grid[x].push(new gridNode(0, x, y, this.grid));
            }
        }
        this.grid.forEach((x) => x.forEach((item) => item.initializeInfluenceNodes()));
    }
    generateRandomPuzzle() {
        this.grid.map((col, x) => col.map((_, y) => this.grid[x][y].value = this.generateRandomNumber()));
    }
    generateRandomNumber() {
        return Math.floor(Math.random() * 9) + 1;
    }
    getRandomNode() {
        const x = Math.floor(Math.random() * this.rows);
        const y = Math.floor(Math.random() * this.columns);
        return this.grid[x][y];
    }
    getGrid() {
        const numberGrid = Array(this.rows).fill(0).map(() => Array(this.columns).fill(0));
        this.grid.forEach((col, x) => col.forEach((node, y) => numberGrid[x][y] = node.value));
        return numberGrid;
    }
    duplicateGrid() {
        const newGrid = this.grid.map((col, x) => col.map((node, y) => node.value));
        return newGrid;
    }
    reset() {
        this.grid.forEach((col) => col.forEach((node) => node.value = 0));
    }
}
export class gridNode {
    constructor(value = 0, x, y, gridNodes) {
        this.value = 0;
        this.influenceNodes = [];
        this.value = value;
        this.pos = { x, y };
        this.possibleValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.gridNodes = gridNodes;
    }
    removePossibleValue(value) {
        this.possibleValues.delete(value);
    }
    getPossibleValues() {
        return this.possibleValues;
    }
    getScore() {
        return this.possibleValues.size;
    }
    initializeInfluenceNodes() {
        const newInfluenceNodes = new Array();
        //get row influence nodes
        newInfluenceNodes.push(...this.gridNodes[this.pos.x]);
        //get column influence nodes
        this.gridNodes.forEach(row => newInfluenceNodes.push(row[this.pos.y]));
        //get square influence nodes
        const squareSize = 3;
        const squareX = Math.floor(this.pos.x / squareSize);
        const squareY = Math.floor(this.pos.y / squareSize);
        for (let x = squareX * squareSize; x < squareX * squareSize + squareSize; x++) {
            for (let y = squareY * squareSize; y < squareY * squareSize + squareSize; y++) {
                if (x !== this.pos.x && y !== this.pos.y)
                    newInfluenceNodes.push(this.gridNodes[x][y]);
            }
        }
        //check diagonal influence nodes
        if (this.pos.x === this.pos.y || this.pos.x + this.pos.y === 8) {
            this.gridNodes.forEach((row) => {
                row.forEach((node) => {
                    if (this.pos.x === this.pos.y) {
                        if (node.pos.x === node.pos.y)
                            newInfluenceNodes.push(node);
                    }
                    if (this.pos.x + this.pos.y === 8) {
                        if (node.pos.x + node.pos.y === 8)
                            newInfluenceNodes.push(node);
                    }
                });
            });
        }
        this.influenceNodes = newInfluenceNodes;
    }
}
//# sourceMappingURL=grid.js.map