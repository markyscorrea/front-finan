import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Utils } from 'src/app/Utils/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  message: string = ''
  fieldAlert: boolean = false;
  fieldClassPassword: string = '';
  loading: boolean = false;
  status: string = ''

  registerForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required)
  
  })

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  submit() {

    const nameValid = this.registerForm.controls.nome.errors
    const emailValid = this.registerForm.controls.email.errors
    const passwordValid = this.registerForm.controls.password.errors

    if(nameValid?.['required'] || emailValid?.['required']){
      this.onAlert('Preencha os campos!', 'danger')
    }else if(emailValid?.['email']){
      this.onAlert('Preencha o e-mail no padrão com @*****.com!', 'danger')
    }else if(passwordValid?.['required']){
      this.onAlert('Preencha a senha!', 'danger')
    }else if(this.registerForm.value.password != this.registerForm.value.passwordConfirm){
      this.onAlert('As senhas precisam ser iguais!', 'danger')
      this.fieldClassPassword = 'borderDanger'
      setTimeout(() => {
        this.fieldClassPassword = ''
      }, 3000)
    }else{
      this.registerUser(this.registerForm.value.nome, this.registerForm.value.email, this.registerForm.value.password)
    }
  }

  registerUser(nome: string | null | undefined, email: string | null | undefined, password: string | null | undefined){

    this.loading = true;

    this.usuarioService.register(nome, email, password)
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

  onAlert(info: string, status: string){
    this.message = info
    this.status = status
    this.fieldAlert = !this.fieldAlert;
    setTimeout(() => {
      this.fieldAlert = !this.fieldAlert
    }, 3000)
  }
}
