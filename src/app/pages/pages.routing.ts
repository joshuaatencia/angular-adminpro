import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

export const routes: Routes = [
    {
        path: 'dashboard', component: PagesComponent, 
        canActivate:[AuthGuard],
        children: [
            { path: '', component: DashBoardComponent, data:{titulo:'Dashboard'}},
            { path: 'progress', component: ProgressComponent, data:{titulo:'Progreso'}},
            { path: 'grafica1', component: Grafica1Component, data:{titulo:'Grafica'}},
            { path: 'account-settings', component: AccountSettingsComponent, data:{titulo:'Account Settings'}},
            { path: 'promesas', component: PromesasComponent, data:{titulo:'Promesas'}},
            { path: 'rxjs', component: RxjsComponent, data:{titulo:'Rxjs'}},
            { path: 'perfil', component: PerfilComponent, data:{titulo:'Perfil de Usuario'}},
            
            { path: 'usuarios', component: UsuariosComponent, data:{titulo:'Usuario de Aplicacion'}},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
