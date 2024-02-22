import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";

const routeConfig: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full", // Certifique-se de que esta rota seja acessada somente quando o caminho for exatamente vazio
    data: { title: "Home Page" }, // Adicione dados adicionais à rota, se necessário
  },
  {
    path: "details/:id",
    component: DetailsComponent,
    data: { title: "Details Page" }, // Adicione dados adicionais à rota, se necessário
  },
  {
    path: "**", // Rota curinga para capturar rotas não encontradas
    redirectTo: "", // Redireciona para a página inicial caso a rota não seja encontrada
  },
];

export default routeConfig;
