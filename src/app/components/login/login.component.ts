import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Utils } from 'src/app/Utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword = false;
  loading: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)

  })

  fieldAlert: boolean = false;
  message: string = ''
  status: string = ''

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    const emailValid = this.loginForm.controls.email.errors
    const passwordValid = this.loginForm.controls.password.errors

    if (emailValid?.['required']) {
      this.onAlert('Preencha os campos!', 'danger')
    } else if (emailValid?.['email']) {
      this.onAlert('Preencha o e-mail no padrão com @*****.com!', 'danger')
    } else if (passwordValid?.['required']) {
      this.onAlert('Preencha a senha!', 'danger')
    } else {
      this.loginUser(this.loginForm.value.email, this.loginForm.value.password)
    }


  }

  loginUser(email: string | null | undefined, password: string | null | undefined) {

    this.loading = true;

    this.usuarioService.login(email, password)
      .subscribe({
        next: usuario => {
          Utils.insertToken('token', usuario.token)
          this.router.navigate(['/home'])
          this.loading = false;
        },
        error: err => {
          this.onAlert(err.error.info, 'danger')
          this.loading = false;
        }
      })
  }

  onAlert(info: string, status: string) {
    this.message = info
    this.status = status
    this.fieldAlert = !this.fieldAlert;
    setTimeout(() => this.fieldAlert = !this.fieldAlert, 3000)
  }

}
