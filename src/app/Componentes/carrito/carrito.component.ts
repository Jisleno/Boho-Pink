import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PedidoCarrito, Producto } from 'src/app/models';
import { AuthService } from 'src/app/Servicios/auth.service';
import { CarritoService } from 'src/app/Servicios/carrito.service';
import { FirebaseService } from 'src/app/Servicios/firebase.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  opcion: any
  cantidadOpt = [1, 2, 3, 4, 5]
  carrito: any = {}
  producto: Producto;

  usuario: any;
  pedidos: PedidoCarrito;
  articulos: any[];
  total: number;
  cantidad: number;

  idFirebase: String;
  toast = false

  public isMenuCollapsed = true;
  public isCollapsed = true;


  public user$: Observable<any> = this.authServ.afServ.user;
  vacio: any;
  data: { idFirebase: any; }[];
  closeResult: string;

  pagado=true


  constructor(
    private modalService: NgbModal,
    private authServ: AuthService,
    private carritoServ: CarritoService,
    private firebaseServ: FirebaseService,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.cargarCarrito();
    // this.authServ.getUserCurrent().subscribe(user => {
    //   if (user) {
    //   } else {
    //     console.log("No estas logueado");
    //   }
    // });
  }

 
  comprar() {
    if (!this.pedidos.producto.length) {
      this.vacio = true;
      return
    }
    this.pedidos.precioTotal = this.total
    this.pedidos.estado = "En Proceso de Envio"
    this.pedidos.id = this.firebaseServ.getId();
    const uid = this.carritoServ.getUid();
    const path = "Usuarios/" + uid + "/Pedidos"
    this.firebaseServ.crearDoc(path, this.pedidos, this.pedidos.id).then(() => {
      this.carritoServ.clearCarrito();
      console.log("Guardado con exito");
      this.carrito=null
      this.router.navigate(['inicio'])
    })
    console.log("comprar-> ", this.pedidos, uid)

  }

  
  validarPago(){
    this.pagado=false;
  }
  
  nuevo(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cerrar(){
    this.modalService.dismissAll();
  }

  regresar(){
    this.router.navigate(['inicio'])
  }

  add(producto: Producto) {
    this.cargarCarrito();
    this.carritoServ.addProducto(producto);

  }

  delete(producto: Producto) {
    this.carritoServ.removeProducto(producto);
    this.cargarCarrito();
  }


  cargarCarrito() {
    this.carritoServ.getCarrito().subscribe(resp => {
      if (!resp.producto.length) {
        this.vacio = true
        // console.log("Esta vacio");

      } else {
        this.vacio = false
        this.pedidos = resp
        this.articulos = this.pedidos.producto
        this.getCantidad();
        this.getTotat();
        console.log("Nooooo Esta vacio", this.articulos);
      }
    })
  }

  getId() {
    this.firebaseServ.getProductos().subscribe(
      resp => {
        this.data = resp.map((e: any) => {
          return {
            idFirebase: e.payload.doc.id,
          }
        })
        // console.log('cargando ids ', this.data[5]);
      }
    )

  }

  agregarCarrito(producto: any) {

    if (producto != undefined) {
      this.producto = {
        color: producto.color,
        caracteristicas: producto.caracteristicas,
        precio: producto.precio,
        existencias: producto.existencias,
        marca: producto.marca,
        talla: producto.talla,
        url: producto.url,
        idFirebase: producto.idFirebase
      }
      this.toast = true
      // console.log('cargando ids ', this.data[5]);
      // console.log('agregar carrito->>>',this.producto);
      this.carritoServ.addProducto(this.producto);
      setTimeout(() => {
        this.toast = false
        console.log('estamos en el delay');

      }, 5000)
    }
    // else {
    //   this.router.navigate['login'];
    // }

    // this.carritoServ.addProducto(smartphone)

  }

  getTotat() {
    this.total = 0
    this.pedidos.producto.forEach(producto => {
      this.total = ((producto.producto.precio) * producto.cantidad) + this.total;      
    });
    this.pedidos.precioTotal = this.total
  }

totalProducto:number

  getCantidad() {
    this.cantidad = 0
    this.pedidos.producto.forEach(producto => {
      this.cantidad = producto.cantidad + this.cantidad
    });
  }

}
