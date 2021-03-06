import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  public intervalSubs: Subscription;


  constructor() { }

  ngOnInit(): void {
    this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

    return interval(100)
            .pipe(
              // take(10),
              map( valor => valor + 1), // 0 => 1
              filter( valor => ( valor % 2 === 0 ) ? true : false ),
            );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    
    return new Observable<number>( observer => {
      
      const intervalo = setInterval( () => {
        
        i++;
        observer.next(i);

        if ( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        if ( i === 2 ) {
          observer.error('i llego al valor de 2');
        }

      }, 1000 )

    });

  }

}
