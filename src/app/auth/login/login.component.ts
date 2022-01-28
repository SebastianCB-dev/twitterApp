import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  usernameErrorValidation: boolean = false;
  // Formulario
  miFormulario: FormGroup = this.fb.group({
    name: [, [Validators.required, Validators.maxLength(50)]],
    username: [, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  async validarUser() {
    this.usernameErrorValidation = false;
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const name = this.miFormulario.controls["name"].value;
    const username = this.miFormulario.controls["username"].value;

    //  Validate username & password
    const user = this.firebaseService.getUserByUsername(username);
    user.then( data => {
      if( data === null || (  !(data['name'] == name && data['username'] == username) ) ) {
        this.usernameErrorValidation = true;
      }
      else {
          localStorage.setItem('twitterApp-user', username);
          this.router.navigateByUrl('/home');
      }
    });
  }

  campoEsValido(campo: string): boolean | null {
    return this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
  }

  usernameDeleteError(): void {
    this.usernameErrorValidation = false;
  }

}
