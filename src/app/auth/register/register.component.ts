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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Formulario
  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.maxLength(50)]],
    username: [, [Validators.required]],
    birthday: [, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  getMinDate() {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    if (month.toString().length < 2) month = '0' + month.toString();
    return `${year}-${month}-${day}`;
  }

  registrar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    // Firestore 
    console.log("Registrando...");
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
  }
}
