import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service'; 
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { PaginationComponent } from '../pagination/pagination.component';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent,PaginationComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {

  users: User[] = [];
  displayedUsers: User[] = []; 
  currentPage: number = 1;  // Usuários para exibir na página atual
  usersPerPage: number = 5;   // Quantidade de usuários por página  
    
  constructor(private userService: DataService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((data: any[]) => {
      // Mapeando os dados
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

  handlePageChange(page: number) {
     this.currentPage = page;
     this.updateDisplayedUsers();
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
    if (window.confirm('Você tem certeza que quer deletar esse usuário?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert('Usuário deletado com sucesso');
          this.users = this.users.filter(user => user.id !== userId);
          this.updateDisplayedUsers(); // Atualizar a exibição
        },
        error: (err) => {
          alert('Um erro ocorreu ao deletar esse usuário');
          console.error('Delete user error:', err);
        }
      });
    }
  }

  toggleMore(user: User) {
    user.showMore = !user.showMore;
  }

  handleAction(action: string) {
    alert(`Ação ${action} clicada`);
  }

}
