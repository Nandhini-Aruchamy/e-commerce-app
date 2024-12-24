import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DoCheck,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { pipe } from 'rxjs';
import { SampleComponent } from './sample/sample.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, SampleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements DoCheck, AfterViewChecked {
  name = new FormControl();
  name$ = this.name.valueChanges;
  nameSignal = toSignal(this.name$);
  cdr = inject(ChangeDetectorRef);

  print = computed(() => {
    this.nameSignal();
    //this.cdr.detectChanges();
    // return this.nameSignal();
  });

  test = signal<number>(0);
  ngDoCheck() {
    console.count('login cde');
  }
  ngAfterViewChecked() {
    console.count('login render');
  }
}
