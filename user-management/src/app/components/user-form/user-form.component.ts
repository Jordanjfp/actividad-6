import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class UserFormComponent implements OnInit {
  user = { first_name: '', last_name: '', email: '', image: '' };
  isEditing = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.userService.getUser(+id).subscribe((data) => {
        this.user = data;
      });
    }
  }

  saveUser(): void {
    if (this.isEditing) {
      const id = this.route.snapshot.paramMap.get('id');
      this.userService.updateUser(+id!, this.user).subscribe(() => {
        Swal.fire({
          title: 'Usuario actualizado',
          text: 'El usuario ha sido actualizado correctamente',
          icon: 'success',
        });
        this.router.navigate(['/home']);
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario ha sido creado correctamente',
          icon: 'success',
        });
        this.router.navigate(['/home']);
      });
    }
  }
}





