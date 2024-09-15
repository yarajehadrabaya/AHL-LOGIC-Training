class Drawer {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
    }

    getCell(row, column) {
        return document.getElementById(`${row}-${column}`);
    }

    fillCell(row, column, color) {
        const cell = this.getCell(row, column);
        if (cell) { // تحقق أن العنصر موجود
            cell.style.backgroundColor = color;
        }
    }

    fillCells(arrayOfCells) {
        arrayOfCells.forEach((cell) => {
            this.fillCell(cell.row, cell.column, cell.color);
        });
    }

    clearGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                this.fillCell(row, column, "white");
            }
        }
    }
}

export default Drawer;
