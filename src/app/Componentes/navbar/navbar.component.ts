import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PedidoCarrito, Producto, ProductoPedido } from 'src/app/models';
import { AuthService } from 'src/app/Servicios/auth.service';
import { CarritoService } from 'src/app/Servicios/carrito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: any;
  pedidos: PedidoCarrito;
  articulos: any[];
  total: number;

  public isMenuCollapsed = true;
  public isCollapsed = true;


  public user$: Observable<any> = this.authServ.afServ.user;

  constructor(
    private authServ: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.authServ.getUserCurrent().subscribe(user => {
      if (user) {
        console.log(user.displayName);
      } else {
        console.log("No estas logueado");
      }
    });

  }

  async onLogout() {
    try {
      await this.authServ.logout();
      this.router.navigate(['login']);
    }
    catch (error) {
      console.log(error);
    }
  }
}
