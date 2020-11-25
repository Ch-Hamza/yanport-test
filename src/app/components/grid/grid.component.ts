import {Component, OnInit} from '@angular/core';
import {VacuumModel} from '../../models/vacuum.model';
import {orientationEnum} from '../../models/orientation.enum';
import {move} from '../../shared/animations';
import {concatMap, delay} from 'rxjs/operators';
import {from, of} from 'rxjs';

@Component({
  selector: 'app-grid',
  animations: [ move ],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  rows: number;
  cols: number;
  vacuum: VacuumModel;
  instructions: string;
  editEnabled = true;

  constructor() { }

  ngOnInit(): void {
    const vacuum = new VacuumModel();
    vacuum.x = 5;
    vacuum.y = 5;
    vacuum.orientation = orientationEnum.N;
    this.initGrid(10, 10, vacuum);
    // this.executeInstructions('DADADADAA');
  }

  initGrid(x: number, y: number, vacuum: VacuumModel): void {
    this.cols = x;
    this.rows = y;
    this.vacuum = vacuum;
    this.instructions = 'DADADADAA';
  }

  executeInstructions(): void {
    // (this.instructions);
    if (this.instructions) {
      this.editEnabled = false;
      const chars = [...this.instructions];
      from(chars).pipe(
        concatMap(instruction => of(instruction).pipe(delay(500)))
      ).subscribe(
        instruction => {
          switch (instruction) {
            case 'D':
              this.vacuum.orientation = this.rotateRight(this.vacuum.orientation);
              break;
            case 'G':
              this.vacuum.orientation = this.rotateLeft(this.vacuum.orientation);
              break;
            case 'A': {
              if (this.vacuum.orientation === orientationEnum.N && this.vacuum.y + 1 <= this.rows) {
                this.vacuum.y++;
              } else if (this.vacuum.orientation === orientationEnum.E && this.vacuum.x + 1 <= this.cols) {
                this.vacuum.x++;
              } else if (this.vacuum.orientation === orientationEnum.W && this.vacuum.x - 1 > 0) {
                this.vacuum.x--;
              } else if (this.vacuum.orientation === orientationEnum.S && this.vacuum.y - 1 > 0) {
                this.vacuum.y--;
              }
              break;
            }
          }
        },
        error => {
          console.log(error);
          this.editEnabled = true;
        },
        () => {
          console.log(this.vacuum);
          this.editEnabled = true;
        }
      );
    }
  }

  rotateRight(orientation: orientationEnum): orientationEnum {
    switch (orientation) {
      case orientationEnum.N: return orientationEnum.E;
      case orientationEnum.E: return orientationEnum.S;
      case orientationEnum.S: return orientationEnum.W;
      case orientationEnum.W: return orientationEnum.N;
    }
  }

  rotateLeft(orientation: orientationEnum): orientationEnum {
    switch (orientation) {
      case orientationEnum.N: return orientationEnum.W;
      case orientationEnum.W: return orientationEnum.S;
      case orientationEnum.S: return orientationEnum.E;
      case orientationEnum.E: return orientationEnum.N;
    }
  }
}
