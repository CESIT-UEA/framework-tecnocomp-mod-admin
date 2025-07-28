import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard, resetPasswordGuard } from './auth/auth.guard';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { CadastroPlataformaComponent } from './components/cadastro-plataforma/cadastro-plataforma.component';
import { CadastroModuloComponent } from './components/cadastro-modulo/cadastro-modulo.component';
import { CadastrosPageComponent } from './pages/cadastros-page/cadastros-page.component';
import { LayoutMenuComponent } from './pages/layout-menu/layout-menu.component';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { RegistroModuloComponent } from './components/registro-modulo/registro-modulo.component';
import { ModulosPageComponent } from './pages/modulos-page/modulos-page.component';
import { ModuloUnicoComponent } from './pages/modulo-unico/modulo-unico.component';
import { EditarModuloComponent } from './components/editar-modulo/editar-modulo.component';
import { CadastroTopicoComponent } from './components/cadastro-topico/cadastro-topico.component';
import { EditarTopicoComponent } from './components/editar-topico/editar-topico.component';
import { PlataformaPageComponent } from './pages/plataforma-page/plataforma-page.component';
import { EditarPlataformaComponent } from './components/editar-plataforma/editar-plataforma.component';
import { MeuPerfilPageComponent } from './pages/meu-perfil-page/meu-perfil-page.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';

import { AutoCadastroComponent } from './components/auto-cadastro/auto-cadastro.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmacaoAutoCadastroComponent } from './components/confirmacao-auto-cadastro/confirmacao-auto-cadastro.component';
  
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: AutoCadastroComponent},
  { path: 'cadastrar/teste', component: ConfirmacaoAutoCadastroComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [resetPasswordGuard]},
  {
    path: '',
    component: LayoutMenuComponent, // Layout principal com menu lateral
    canActivate: [authGuard], // Proteção para todas as rotas filhas
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'cadastros', component: CadastrosPageComponent, data: { title: 'Cadastrar' }  },
      { path: 'meu-perfil', component: MeuPerfilPageComponent, data: { title: 'Meu Perfil' }  },
      { path: 'usuarios', component: UsuariosPageComponent, data: { title: 'Usuarios' }  },
      { path: 'modulos', component: ModulosPageComponent, data: { title: 'Modulos' }  },
      { path: 'plataformas', component: PlataformaPageComponent, data: { title: 'Plataformas' }  },
    ],
  },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent},
  { path: 'cadastro-plataforma', component: CadastroPlataformaComponent },
  { path: 'registrar-modulo', component: RegistroModuloComponent },
  { path: 'editar-plataforma/:id', component: EditarPlataformaComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },

  { path: 'modulos/:id', component: ModuloUnicoComponent },
  { path: 'editar-topico/:id', component: EditarTopicoComponent },
  { path: 'editar-modulo/:id', component: EditarModuloComponent },
  { path: 'cadastrar-topico', component: CadastroTopicoComponent },
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
