import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  getCollections<tipo>(path: string) {
    const coollection = this.firestore.collection<tipo>(path);
    return coollection.valueChanges();
  }

  getId() {
    return this.firestore.createId();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }

  objecjSorce = new BehaviorSubject<{}>({})
  data: any = []

  $getObjecjtSorce = this.objecjSorce.asObservable();


  constructor(
    private firestore: AngularFirestore,
    private router: Router) { }

  getUser() {
    return this.firestore.collection("usuarios").snapshotChanges();
  }

  createUser(user: any) {
    return this.firestore.collection("usuarios").add(user);
  }

  sendObjectSorce(data: any) {
    this.objecjSorce.next(data);
  }

  getProductos() {
    return this.firestore.collection("productos").snapshotChanges();
  }

  // metodo alterno para cargar coleciones generico
  getDoc<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
    // return this.firestore.collection(path).snapshotChanges();
  }

  crearDoc(path: string, data: any, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  // 
  createProducto(Producto: any) {
    return this.firestore.collection("productos").add(Producto);
  }

  updateProducto(id: any, Producto: any) {
    return this.firestore.collection("productos").doc(id).update(Producto);
  }

  eliminarProducto(id: any) {
    return this.firestore.collection("productos").doc(id).delete();
  }

  agregarUrl(Producto: any) {
    return this.firestore.collection("productos").doc(Producto.id).update(Producto.url);
  }


}


