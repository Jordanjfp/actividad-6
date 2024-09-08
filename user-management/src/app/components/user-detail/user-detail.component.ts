import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]  
})
export class UserDetailComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null && !isNaN(id)) {
      this.userService.getUser(id).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          this.goBack(); 
        }
      );
    } else {
      console.error('ID inválido:', idParam);
      this.goBack(); 
    }
  }

  goBack(): void {
    this.router.navigate(['/home']); 
  }

  confirmDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          () => {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
            this.router.navigate(['/home']); 
          },
          (error) => {
            console.error('Error al eliminar el usuario:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el usuario.', 'error');
          }
        );
      }
    });
  }
}




