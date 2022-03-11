import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject<any>('0');

subject.next(1);
subject.next(2);
// subject.subscribe(val => {
//     console.log('1', val)
// })
subject.next(3);

// subject.subscribe(val => {
//     console.log('2', val)
// })
subject.next(4);
// subject.subscribe(val => {
//     console.log('3', val)
// })

