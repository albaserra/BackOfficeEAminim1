import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID, Notificacion } from 'src/app/interfaces/notificacion';

import { NotificacionService } from 'src/app/services/notificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-notificacion',
  templateUrl: './add-edit-notificacion.component.html',
  styleUrls: ['./add-edit-notificacion.component.css']
})
export class AddEditNotificacionComponent {
  formNotificacion: FormGroup;
  loading: boolean = false;
  idNotificacion: string;
  operacion: string = 'Añadir ';

  constructor(private fb: FormBuilder,
    private _notificacionService: NotificacionService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _location: Location) {
    this.formNotificacion = this.fb.group({
      fecha: ['', Validators.required],
      mensaje: ['', Validators.required],
      tiempo: ['', Validators.required]
    })
    this.idNotificacion = aRouter.snapshot.paramMap.get("idNotificacion")!;

  }
  ngOnInit(): void {
    if (this.idNotificacion != null) {
      this.operacion = 'Actualizar ';
      this.getNotificacion(this.idNotificacion);
    }
  }

  goBack(){
    this._location.back();
  }


  addNotificacion() {
    const notificacion: Notificacion = {
      tipo: this.formNotificacion.value.tipo,
      mensaje: this.formNotificacion.value.mensaje,
      tiempo: this.formNotificacion.value.tiempo
    }

    this.loading = true;
    if (this.idNotificacion !== null) {
      //update
      this._notificacionService.updateNotificacion(this.idNotificacion, notificacion).subscribe(() => {
        this.toastr.info(`La notificacion de ${notificacion.tipo} fue actualizado con exito`, 'Notificacion actualizada');
        this.loading = false;
        //if (this.idUser !== null) {
          //this.router.navigate([`/ticket/${this.idTicket}/productos`]);
        //}
        //else{
          //this.router.navigate([`/producto`]);
       // }
       this.router.navigate([`/`]);
       
      })
    } else {
      //crear
      this._notificacionService.createNotificacion(notificacion).subscribe((data:Notificacion) => {
        this.toastr.success(`La notificacion de ${notificacion.tipo} fue agregado con exito`, 'Notificacion agregado')
        this.loading = false;
        this.idNotificacion=String(data._id!);
        console.log(data);
      })

    }
    
  }

  getNotificacion(id: string) {
    this.loading = true;
    this._notificacionService.getNotificacion(id).subscribe((data: Notificacion) => {
      this.loading = false;
      this.formNotificacion.patchValue({
        tipo: data.tipo,
        mensaje: data.mensaje,
        tiempo: data.tiempo
      })
    })
  }

}