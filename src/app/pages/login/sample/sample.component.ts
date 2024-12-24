import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  NgZone,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.css',
})
export class SampleComponent {
  name = new FormControl();
  age = new FormControl();

  cdr = inject(ChangeDetectorRef);

  name$ = this.name.valueChanges;
  nameSignal = toSignal(this.name$);

  constructor() {
    effect(() => {
      const newValue = this.nameSignal();
      this.cdr.markForCheck();
    });
  }
}
