import {animate, style, transition, trigger} from '@angular/animations';

export const move = trigger(
  'move',
  [
    transition(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('0.1s linear',
          style({ opacity: 1 }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('0.1s linear',
          style({ opacity: 0 }))
      ]
    )
  ]
);
