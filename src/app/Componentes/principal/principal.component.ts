import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

nombre:String

  constructor(
    private authServ:AuthService
  ) { }

  ngOnInit(): void {
    this.authServ.getUserCurrent().subscribe(user => {
      if (user) {
        // console.log(user.displayName);
        this.nombre=user.displayName
      } else {
        console.log("No estas logueado");
      }
    });
  }

}
