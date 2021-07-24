import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models';
import { AuthService } from 'src/app/Servicios/auth.service';
import { CarritoService } from 'src/app/Servicios/carrito.service';
import { FirebaseService } from 'src/app/Servicios/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carrito: any = {}
  smart: any = []

  producto: Producto;

  data: any = []
  id: any
  i: number
  config: any

  constructor(
    private firebaseServ: FirebaseService,
    private authServ: AuthService,
    private router: Router,
    private carritoServ: CarritoService
  ) {

    this.authServ.getUserCurrent().subscribe(res => {
      // console.log(res);
      if (res) {
        // this.loadCarrito();
      }
    })
  }


  loadCarrito() {
    console.log('cargando carrito');
  }

  ngOnInit(): void {
    this.loadData();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.data.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  agregarCarrito(producto: any) {
    this.producto = {
      marca: producto.marca,
      caracteristicas: producto.caracteristicas,
      color: producto.color,
      precio: producto.precio, 
      talla: producto.talla,
      existencias: producto.existencias,
      url: producto.url,
      idFirebase: producto.idFirebase
    }
    // console.log(this.producto);
    this.carritoServ.addProducto(this.producto);

    // this.carritoServ.addProducto(Producto)

  }

  loadData() {
    this.firebaseServ.getProductos().subscribe(
      resp => {
        this.data = resp.map((e: any) => {
          return {
            marca: e.payload.doc.data().marca,
            caracteristicas: e.payload.doc.data().caracteristicas,
            color: e.payload.doc.data().color,
            talla: e.payload.doc.data().talla,
            precio: e.payload.doc.data().precio,
            existencias: e.payload.doc.data().existencias,
            url: e.payload.doc.data().url,
            idFirebase: e.payload.doc.id
          }
        })
        this.smart = this.data
        // console.log('cargando celulares ', this.smart);
      }
    )
  }

  modificar() { }

  verProducto(item: any) {
    // console.log(item);
    
    this.firebaseServ.sendObjectSorce(item)
    this.router.navigate(['detalles', item.idFirebase])
  }

}
