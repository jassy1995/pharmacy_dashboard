import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('backdrop', [
      state('void', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition(':enter', animate(300)),
      transition('visible => void', [
        animate(300), style({ display: 'none' })
      ])
    ]),
    trigger('dialogMobile', [
      state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
      state('visible', style({ transform: 'translateY(0', opacity: 1 })),
      transition(':enter', animate('300ms ease-in-out')),
      transition('visible => void', animate('300ms ease-in-out'))
    ]),
    trigger('dialogDesktop', [
      state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
      state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
      transition(':enter', animate('300ms ease-in-out')),
      transition('visible => void', animate('300ms ease-in-out'))
    ]),
  ]
})
export class DialogComponent implements OnInit, OnDestroy {
  state = 'visible';
  @Output() close = new EventEmitter<any>();
  @Output() successAction = new EventEmitter<any>();
  @Input() title: string | undefined;
  @Input() image: string | undefined;
  @Input() successText: string | undefined;
  @Input() cancelText: string | undefined;
  @Input() size = 'md';
  @Input('close-button') closeButton = true;
  @Input() closable = true;
  @Input() fullscreen = false;
  @Input() centered = false;
  @Input() nested = false;
  @Input('confirmation') confirmation = false;
  @Input('no-padding') noPadding = false;

  mobile = window.innerWidth < 768;
  subscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnInit() {
    if (!this.nested) document.body.style.overflow = 'hidden';
    this.subscriptions.push(
      fromEvent(window, 'resize').subscribe((e: any) => {
        this.mobile = e.target.innerWidth < 768;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  dismiss() {
    this.state = 'void';
  }

  done(event: { toState: string; }) {
    if (event.toState === 'visible') {
      if (!this.nested && document.body.style.overflow !== 'hidden') {
        document.body.style.overflow = 'hidden';
      }
    }
    if (event.toState === 'void') {
      if (!this.nested) document.body.style.overflow = 'auto';
      this.close.emit();
    }
  }
}
