import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [RouterLink],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css'
})
export class CartDrawerComponent {
  readonly cart = inject(CartService);

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.cart.isOpen()) this.cart.close();
  }
}
