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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usernameErrorCreate: boolean = false;
  // Formulario
  miFormulario: FormGroup = this.fb.group({
    name: [, [Validators.required, Validators.maxLength(50)]],
    username: [, [Validators.required]],
    birthday: [, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getMinDate(): string {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    if (month.toString().length < 2) month = '0' + month.toString();
    return `${year}-${month}-${day}`;
  }

  async registrar() {

    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    // Firestore 

    // Validar username no registrado

    const isUserCreated = await this.firebaseService.getUserByUsername(this.miFormulario.controls["username"].value);
    if(isUserCreated) {
      this.usernameErrorCreate = true;
      return;
    }
    // Register 
    await this.firebaseService.registerUser(
      this.miFormulario.controls["name"].value,
      this.miFormulario.controls["username"].value,
      this.miFormulario.controls["birthday"].value,
    )
    .then( id => {
        localStorage.setItem('twitterApp-user', id);
        this.firebaseService.userLogin = id;
      }
    );
    this.router.navigate(['/home']);
  }

  campoEsValido(campo: string): boolean | null {
    return this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
  }

  usernameDeleteError(): void {
    this.usernameErrorCreate = false;
  }
}
