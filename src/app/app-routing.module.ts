import { MeusModulosComponent } from './components/meus-modulos/meus-modulos.component';
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
import { EditarModuloComponent } from './components/editar-modulo/editar-modulo.component';
import { CadastroTopicoComponent } from './components/cadastro-topico/cadastro-topico.component';
import { EditarTopicoComponent } from './components/editar-topico/editar-topico.component';
import { PlataformaPageComponent } from './pages/plataforma-page/plataforma-page.component';
import { EditarPlataformaComponent } from './components/editar-plataforma/editar-plataforma.component';
import { MeuPerfilPageComponent } from './pages/meu-perfil-page/meu-perfil-page.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { GerenciarFichaTecnicaComponent } from './components/gerenciar-ficha-tecnica/gerenciar-ficha-tecnica.component';
import { GerenciarVantagensComponent } from './components/gerenciar-vantagens/gerenciar-vantagens.component';
import { GerenciarReferenciasComponent } from './components/gerenciar-referencias/gerenciar-referencias.component';
import { roleGuard } from './auth/role.guard';
import { MinhasPlataformasComponent } from './components/minhas-plataformas/minhas-plataformas.component';
import { TemplatesComponent } from './components/templates/templates.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutMenuComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'cadastros',
        component: CadastrosPageComponent,
        data: { title: 'Cadastrar' },
      },
      {
        path: 'meu-perfil',
        canActivate: [roleGuard],
        component: MeuPerfilPageComponent,
        data: { title: 'Meu Perfil', roles: ['professor'] },
      },
      {
        path: 'meus-modulos',
        canActivate: [roleGuard],
        component: MeusModulosComponent,
        data: { title: 'Meus Módulos', roles: ['professor'] },
      },
      {
        path: 'minhas-plataformas',
        canActivate: [roleGuard],
        component: MinhasPlataformasComponent,
        data: { title: 'Minhas Plataformas', roles: ['professor'] },
      },
            {
        path: 'templates',
        canActivate: [roleGuard],
        component: TemplatesComponent,
        data: { title: 'Biblioteca de Templates', roles: ['professor'] },
      },
      {
        path: 'usuarios',
        component: UsuariosPageComponent,
        canActivate: [roleGuard],
        data: { title: 'Usuarios', roles: ['adm'] },
      },
      {
        path: 'modulos',
        component: ModulosPageComponent,
        canActivate: [roleGuard],
        data: { title: 'Modulos', roles: ['adm'] },
      },
      {
        path: 'plataformas',
        component: PlataformaPageComponent,
        canActivate: [roleGuard],
        data: { title: 'Plataformas', roles: ['adm'] },
      },
    ],
  },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'cadastro-plataforma', component: CadastroPlataformaComponent },
  { path: 'registrar-modulo', component: RegistroModuloComponent },
  { path: 'editar-plataforma/:id', component: EditarPlataformaComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },

  { path: 'modulos/:id', component: ModuloUnicoComponent },
  {
    path: 'modulos/:id/gerenciar-ficha-tecnica',
    component: GerenciarFichaTecnicaComponent,
  },
  {
    path: 'modulos/:id/gerenciar-vantagens',
    component: GerenciarVantagensComponent,
  },
  {
    path: 'modulos/:id/gerenciar-referencias',
    component: GerenciarReferenciasComponent,
  },
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
