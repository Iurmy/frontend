import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Subject, Observer } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {

  validateForm: FormGroup;
  private clicks$ = new Subject<any>();
  constructor(private fb: FormBuilder, public service: HomeService) {
    this.validateForm = this.fb.group({
      userName: ['123', [Validators.required],
        //  [this.userNameAsyncValidator]
      ],
      email: ['123@123.com', [Validators.email, Validators.required]],
      password: ['123', [Validators.required]],
      confirm: ['123', [this.confirmValidator]],
      comment: ['123', [Validators.required]]
    });
  }
  submitForm = ($event, value) => {
    $event.preventDefault();
    this.clicks$.next(value)
  };

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      if (control.value === 'JasonWood') {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (this.validateForm && (control.value !== this.validateForm.controls.password.value)) {
      return { confirm: true, error: true };
    }
  };


  ngOnInit(): void {
    this.clicks$
      .pipe(
        debounceTime(1000),
        // distinctUntilChanged() //这个函数作用是如果值没变，终止数据流
      )
      .subscribe(value => {
        for (const key in this.validateForm.controls) {
          this.validateForm.controls[key].markAsDirty();
          this.validateForm.controls[key].updateValueAndValidity();
        }
        let req = {
          userId: '7e799558b5cf44459a7286147e19116c',
          current: 2,
          size: 10
        }
        this.service.tryHttp(req)
          .subscribe(res => {
            console.log(res)
          });
      });

  }

}
