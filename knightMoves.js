// Game Board
// Goal: record if the spot has been taken, to minimize the tree structure
const gameBoard = () => {
    let board = new Array(8).fill().map(() => Array(8).fill(null));

    return{
        board
    }
}

// Find Possible Move
const findPossibleMove = (array, board) => {
    let x = array[0];
    let y = array[1];
    let possibleMove = [];
    let allMove =[];
    allMove.push(Node(x + 2, y + 1, array));
    allMove.push(Node(x + 1, y + 2, array));
    allMove.push(Node(x - 1, y + 2, array));
    allMove.push(Node(x - 2, y + 1, array));
    allMove.push(Node(x - 2, y - 1, array));
    allMove.push(Node(x - 1, y - 2, array));
    allMove.push(Node(x + 1, y - 2, array));
    allMove.push(Node(x + 2, y - 1, array));

    for(let i = 0; i < allMove.length; i++){
        // check if out of bound, and if the spot was taken
        let x = allMove[i].data[0];
        let y = allMove[i].data[1];

        if(
            (x >= 1 && x <= 8) 
            && (y >= 1 && y <= 8) 
            && (board.board[x - 1][y - 1] !== 1)
            ){
                board.board[x - 1][y - 1] = 1;
                possibleMove.push(allMove[i]);
        } 
    }

    return possibleMove;
}

// Build Tree
const Node = (x, y, prev) => {
    return{
        data: [x, y],
        prev: prev,
        child: [],
    }
}

const buildTree = (array1, array2, board) => {
    let x1 = array1[0];
    let y1 = array1[1];
    let root = Node(x1, y1, null);

    // create first-in-first-out queue
    let queue = [];
    queue.push(root);

    while(queue.length){
        let pointer = queue[0];
        let possibleMove = findPossibleMove(pointer.data, board);
        pointer.child.push(...possibleMove);
        
        for(let i = 0; i < possibleMove.length; i++){
            if(possibleMove[i].data[0] == array2[0] && possibleMove[i].data[1] == array2[1]){
                return root;
            }
        }

        queue.push(...possibleMove);
        queue.shift();
    }

}

// Traverse Tree to find End Node with Breadth-First-Search
const findPath = (tree, array2) => {
    let path = [];
    const findPathReverse = (tree, array2) => {
        path.push(array2);

        if(array2 == null) return path;
        let endX = array2[0];
        let endY = array2[1];

        let queue = [];
        queue.push(tree);
        while(queue.length){
            let pointer = queue[0];
            if(pointer.child){
                for (let i = 0; i < pointer.child.length; i++){
                    queue.push(pointer.child[i]);
                }
            }
            if((pointer.data[0] == endX) && (pointer.data[1] == endY)){
                queue = [];
                findPathReverse(tree, pointer.prev);
            }
            queue.shift();
        }
    }
    findPathReverse(tree, array2);
    path.pop();

    console.log(`=> You made it in ${path.length - 1} moves!  Here's your path:`);
    for(let i = path.length; i > 0; i--){
        console.log(path[i - 1]);
    }
}

// Wrap everything together
const knightMoves = (array1, array2) => {
    let board = gameBoard();
    let tree = buildTree(array1, array2, board);
    let path = findPath(tree, array2);
}

// driver script
knightMoves([7,8], [1,6]);