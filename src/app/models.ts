export interface Usuario {
    nombre: string;
    // apellidos: string;
    // telefono: string;
    // direccion: string;
    uid: string;
}

export interface PedidoCarrito {
    id: string;
    usuario: Usuario;
    producto: ProductoPedido[];
    precioTotal: number
    estado: EstadoPedido

}


export interface ProductoPedido {
    producto: Producto;
    cantidad: number;
}

export interface Producto {
    marca: string;
    caracteristicas: string;
    color:String;
    talla:String;
    existencias:number
    precio: number;
    url: string;
    idFirebase: string;
}

export type EstadoPedido = 'Enviado' | 'En Camino' | 'Entregado' | 'En Proceso de Envio'