import ScoreCalculator from './scoreCalculator.js';

const scoreCalculator = new ScoreCalculator(3, 3, 3, 30, -30);

export default class MiniMax {

    // playerはplayerオブジェクト
    calcMiniMax(depth, board, playerSignal, alpha, beta) {
        console.log('calcMiniMaxメソッドが呼ばれました');

        let capableMovesArray = this.makeCapableMoveArray(board);

        console.log('前');
        let score;
        let row = -1;
        let column = -1;

        console.log('後');

        // 試合が終了か、深さが0の場合は、スコアを
        if (capableMovesArray.length === 0 || depth === 0) {

            console.log('---capableMovesArray.length---' + capableMovesArray.length);
            console.log('---depth---' + depth);


            // ここ要変更
            score = scoreCalculator.calcScore(board.getGameBoardState());

            console.log('1段目');
            return { rowVal: row, columnVal: column, bestScore: score };
        } else {
            // CPUの点数であるαの方が、βよりも大きい場合、それ以上探索しなくても良い(その時のαが最大なので)ので、探索を打ち切る
            for (let cell of capableMovesArray) {

                board.addMove(cell.rowValue, cell.columnValue, playerSignal);

                if (playerSignal === '×') {
                    score = this.calcMiniMax(depth - 1, board, '○', alpha, beta).bestScore;
                    if (score > alpha) {
                        alpha = score;
                        row = cell.rowValue;
                        column = cell.columnValue;

                    }
                } else if (playerSignal === '○') {
                    score = this.calcMiniMax(depth - 1, board, '×', alpha, beta).bestScore;
                    if (score < beta) {
                        beta = score;
                        row = cell.rowValue;
                        column = cell.columnValue;
                    }
                }
                board.addMove(cell.rowValue, cell.columnValue, ' ');

                if (alpha >= beta) break;
            }

            return (playerSignal === '×') ? { rowVal: row, columnVal: column, bestScore: alpha } : { rowVal: row, columnVal: column, bestScore: beta };
        }

    }

    makeCapableMoveArray(board) {
        let capableMovesArray = [];
        console.log('makeCapableMoveArrayメソッドが呼ばれました');

        for (let row = 0; row < board.getRowSize(); row++) {
            for (let column = 0; column < board.getColumnSize(); column++) {
                if (board.getMove(row, column) === ' ') {
                    let cellObj = { rowValue: row, columnValue: column };
                    capableMovesArray.push(cellObj);
                }
            }
        }
        console.log('capableMovesArray:' + JSON.stringify(capableMovesArray));
        return capableMovesArray;
    }

}