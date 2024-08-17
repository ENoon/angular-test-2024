import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service'; 
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  showMore?: boolean;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  users: User[] = [];

  constructor(private userService: DataService) {
    console.log('UserListComponent constructor');
   }

  ngOnInit(): void {
    console.log('UserListComponent ngOnInit');
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((data: any[]) => {
      // Mapeando os dados para a estrutura que você precisa
      console.log('Dados recebidos:', data);
      this.users = data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: `${user.address.street}, ${user.address.city}`,
        showMore: false
      }));
    });
  }

  addUser() {
    // Lógica para adicionar um novo usuário
  }

  editUser(user: User) {
    // Lógica para editar o usuário
    console.log('Editando usuário:', user);
  }

  removeUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  toggleMore(user: User) {
    user.showMore = !user.showMore;
  }

}
