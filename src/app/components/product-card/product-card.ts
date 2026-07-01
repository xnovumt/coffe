import { Component, input, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  private readonly cart = inject(CartService);

  readonly name = input.required<string>();
  readonly description = input.required<string>();
  readonly price = input.required<string | number>();

  add(): void {
    this.cart.add(this.name(), this.price());
  }
}
