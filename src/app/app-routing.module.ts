import {NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { VendaComponent } from "./components/pages/venda/venda.component";
import { EstoqueComponent } from "./components/pages/estoque/estoque.component";
import { UsuarioComponent } from "./components/pages/usuario/register-user.component";
import { HomeComponent } from "./components/home/home.component";
import { TableOverviewExample } from "./components/pages/usuario/user-list.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { AuthGuard } from "./service/auth.guard";

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'vendas', component: VendaComponent, canActivate: [AuthGuard]},
    {path: 'estoque', component: EstoqueComponent, canActivate: [AuthGuard]},
    {path: 'usuario/cadastro', component: UsuarioComponent, canActivate: [AuthGuard]},
    {path: 'usuario', component: TableOverviewExample, canActivate: [AuthGuard]},
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}