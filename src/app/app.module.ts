import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { CadastroPlataformaComponent } from './components/cadastro-plataforma/cadastro-plataforma.component';
import { CadastroModuloComponent } from './components/cadastro-modulo/cadastro-modulo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { CardsCadastroComponent } from './components/cards/cards-cadastro/cards-cadastro.component';
import { CadastrosPageComponent } from './pages/cadastros-page/cadastros-page.component';
import { LayoutMenuComponent } from './pages/layout-menu/layout-menu.component';
import {MatCardModule} from '@angular/material/card';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';
import { TituloSecaoComponent } from './components/titulo-secao/titulo-secao.component';
import { CardsUsuariosComponent } from './components/cards/cards-usuarios/cards-usuarios.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmacaoExclusaoComponent } from './components/confirmacao-exclusao/confirmacao-exclusao.component';
import { RegistroModuloComponent } from './components/registro-modulo/registro-modulo.component';
import { ModulosPageComponent } from './pages/modulos-page/modulos-page.component';
import { CardsModulosComponent } from './components/cards/cards-modulos/cards-modulos.component';
import { ModuloUnicoComponent } from './pages/modulo-unico/modulo-unico.component';
import { CardTopicosComponent } from './components/cards/card-topicos/card-topicos.component';
import { EditarModuloComponent } from './components/editar-modulo/editar-modulo.component';
import { CadastroTopicoComponent } from './components/cadastro-topico/cadastro-topico.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { HeaderVoltarComponent } from './components/header-voltar/header-voltar.component';
import { EditarTopicoComponent } from './components/editar-topico/editar-topico.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    CadastroPlataformaComponent,
    CadastroModuloComponent,
    DashboardComponent,
    CardsCadastroComponent,
    CadastrosPageComponent,
    LayoutMenuComponent,
    UsuariosPageComponent,
    TituloSecaoComponent,
    CardsUsuariosComponent,
    EditarUsuarioComponent,
    ConfirmacaoExclusaoComponent,
    RegistroModuloComponent,
    ModulosPageComponent,
    CardsModulosComponent,
    ModuloUnicoComponent,
    CardTopicosComponent,
    EditarModuloComponent,
    CadastroTopicoComponent,
    HeaderVoltarComponent,
    EditarTopicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
