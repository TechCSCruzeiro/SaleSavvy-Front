import {NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { VendaComponent } from "./components/pages/venda/venda.component";
import { EstoqueComponent } from "./components/pages/estoque/estoque.component";
import { UsuarioComponent } from "./components/pages/usuario/register-user.component";
import { HomeComponent } from "./components/home/home.component";
import { TableOverviewExample } from "./components/pages/usuario/user-list.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'vendas', component: VendaComponent},
    {path: 'estoque', component: EstoqueComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: 'usuario/list', component: TableOverviewExample},
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}