import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  pagedUsers: any[] = [];
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      data => {
        if (data && data.length) { 
          this.users = data;
          this.totalPages = Math.ceil(this.users.length / this.pageSize);
          this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
          this.updatePagedUsers();
        } else {
          console.error('No se encontraron usuarios.');
        }
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  updatePagedUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedUsers = this.users.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedUsers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedUsers();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagedUsers();
  }

  deleteUser(id: number): void {
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
            this.users = this.users.filter(user => user.id !== id);
            this.updatePagedUsers();
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          },
          error => {
            console.error('Error al eliminar el usuario:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el usuario.', 'error');
          }
        );
      }
    });
  }
}
