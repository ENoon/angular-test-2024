import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service'; 
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  company?: string;
  showMore?: boolean;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  users: User[] = [];
  displayedUsers: User[] = []; 
  currentPage: number = 1;  // Usuários para exibir na página atual
  usersPerPage: number = 5;   // Quantidade de usuários por página

  constructor(private userService: DataService) {
    console.log('UserListComponent constructor');
   }

  ngOnInit(): void {
    console.log('UserListComponent ngOnInit');
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((data: any[]) => {
      // Mapeando os dados
      console.log('Dados recebidos:', data);
      this.users = data.map(user => ({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: ` ${user.address.street},${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
        website: user.website,
        company: `${user.company.name}`,
        showMore: false
      }));
      this.updateDisplayedUsers();
    });
  }

  updateDisplayedUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    this.displayedUsers = this.users.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  totalPages() {
    return Math.ceil(this.users.length / this.usersPerPage);
  }


  addUser() {
    // Lógica para adicionar um novo usuário
  }

  editUser(user: User) {
    // Lógica para editar o usuário

  }

  removeUser(userId: number) {
    // Lógica para remover o usuário
  }

  toggleMore(user: User) {
    user.showMore = !user.showMore;
  }

  handleAction(action: string) {
    alert(`Ação ${action} clicada`);
  }

}
