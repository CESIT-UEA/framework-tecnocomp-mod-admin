import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutMenuComponent, // Layout principal com menu lateral
    canActivate: [authGuard], // Proteção para todas as rotas filhas
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'cadastros', component: CadastrosPageComponent, data: { title: 'Cadastrar' }  },
      { path: 'meu-perfil', component: CadastrosPageComponent, data: { title: 'Meu Perfil' }  },
      { path: 'usuarios', component: UsuariosPageComponent, data: { title: 'Usuarios' }  },
      { path: 'modulos', component: ModulosPageComponent, data: { title: 'Modulos' }  },
      { path: 'plataformas', component: CadastrosPageComponent, data: { title: 'Plataformas' }  },
    ],
  },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent},
  { path: 'cadastro-plataforma', component: CadastroPlataformaComponent },
  { path: 'cadastro-modulo', component: CadastroModuloComponent },
  { path: 'registrar-modulo', component: RegistroModuloComponent },
  { path: 'modulos/:id', component: ModuloUnicoComponent },

  { path: 'editar-usuario/:id', component: EditarUsuarioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
