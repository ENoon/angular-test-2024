import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() label!: string;
  @Input() buttonClass!: string;
  @Input() disabled: boolean = false; 
  @Input() action!: string;
  @Output() clickEvent  = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled){
      this.clickEvent.emit();
    }
  }
  
}
