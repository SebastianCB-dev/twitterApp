import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  async validarUser() {

    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const name = this.miFormulario.controls["name"].value;
    const username = this.miFormulario.controls["username"].value;

    console.log({name, username})


  }

  campoEsValido(campo: string): boolean | null {
    return this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
  }

  usernameDeleteError(): void {
    this.usernameErrorValidation = false;
  }

}
