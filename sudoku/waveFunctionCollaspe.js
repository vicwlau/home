export function collaspeGrid(inputGrid) {
    inputGrid.grid.forEach((row) => {
        row.forEach((node) => {
            collaspeInfluencedNodes(node);
        });
    });
}
export function collaspeInfluencedNodes(gridNode) {
    gridNode.influenceNodes.forEach((targetInfluenceNode) => {
        targetInfluenceNode.possibleValues.delete(gridNode.value);
    });
}
export function findLowestScoreNode(inputGrid) {
    let lowestScoreNode = null;
    let lowestScore = 100000;
    inputGrid.grid.forEach((row) => {
        row.forEach((node) => {
            if (node.value === 0) {
                const newScore = node.getScore();
                if (newScore >= 1) {
                    if (newScore < lowestScore) {
                        lowestScore = newScore;
                        lowestScoreNode = node;
                    }
                }
            }
        });
    });
    return lowestScoreNode;
}
export function getOneRandomPossibleValueFromNode(node) {
    const possibleValues = Array.from(node.possibleValues);
    return possibleValues[Math.floor(Math.random() * possibleValues.length)];
}
//# sourceMappingURL=waveFunctionCollaspe.js.map