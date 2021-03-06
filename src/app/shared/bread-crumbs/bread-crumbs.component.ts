import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styles: [
  ]
})
export class BreadCrumbsComponent implements OnDestroy {

  titulo: string;
  tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentsRoute().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
    });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentsRoute() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data));
  }

}
