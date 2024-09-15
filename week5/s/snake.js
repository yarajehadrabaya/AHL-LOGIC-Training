import Directions from "./directions.js";

class Snake {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.food = this.generateFood();
        this.direction = Directions.RIGHT;
        const initialSnakeCell = {
            row: Math.floor(rows / 2),
            column: Math.floor(columns / 2),
            color: "green"
        };
        this.body = [initialSnakeCell];
    }

    generateFood() {
        const randomRow = Math.floor(Math.random() * this.rows);  // Ensure integer row
        const randomColumn = Math.floor(Math.random() * this.columns);  // Ensure integer column

        const cell = {
            row: randomRow,
            column: randomColumn,
            color: "red"
        };
        
        return cell;  // Return the food cell
    }

    move() {
        const arrayLength = this.body.length;  // Corrected spelling mistake from bodey to body
        let newHead = { ...this.body[arrayLength - 1] };  // Create a shallow copy of the last element (head)

        switch (this.direction) {
            case Directions.RIGHT:
                newHead.column++;
                break;
            case Directions.LEFT:
                newHead.column--;
                break;
            case Directions.UP:
                newHead.row--;
                break;
            case Directions.DOWN:
                newHead.row++;
                break;
        }
       // If the snake goes beyond the left boundary
        if (newHead.column === -1) {
            newHead.column = this.columns - 1; // Wrap around to the right side
        }

        // If the snake goes beyond the right boundary
        if (newHead.column === this.columns) {
            newHead.column = 0; // Wrap around to the left side
        }

        // If the snake goes beyond the top boundary
        if (newHead.row === -1) {
            newHead.row = this.rows - 1; // Wrap around to the bottom side
        }

        // If the snake goes beyond the bottom boundary
        if (newHead.row === this.rows) {
            newHead.row = 0; // Wrap around to the top side
        }


        this.body.push(newHead); // Adding the new head
        this.body.shift(); // Removing the first cell (tail)
    }

    grow() {
        const tail = { ...this.body[0] };  // Create a copy of the first element (tail)
        this.body.unshift(tail);  // Add the copy to the start of the array (grow the snake)
    }


    isEating(){
        const arrayLength2 = this.body.length;
        let head = { ...this.body[arrayLength2 - 1] };
        if (head.row === this.food.row && head.column === this.food.column) {
    
           return true; 
        }
        return false; 
    };


    
    
}

export default Snake;
