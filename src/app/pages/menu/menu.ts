import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { MenuService, Product } from '../../services/menu.service';
import { ProductCardComponent } from '../../components/product-card/product-card';

@Component({
  selector: 'app-menu',
  imports: [ProductCardComponent],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent implements OnInit {
  private readonly menuService = inject(MenuService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly menu = signal<Product[]>([]);
  readonly isDemoMode = signal(false);

  // Mock data to fall back to if backend is offline
  private readonly mockMenu: Product[] = [
    { name: 'Espresso Americano', description: 'Café espresso diluido en agua caliente, de aroma intenso.', price: '5.00', category: 'Bebidas Calientes' },
    { name: 'Cappuccino Clásico', description: 'Espresso doble, leche evaporada y abundante espuma de leche.', price: '5.50', category: 'Bebidas Calientes' },
    { name: 'Latte de Temporada', description: 'Cremoso latte infusionado con jarabe de calabaza y especias.', price: '6.00', category: 'Bebidas Calientes' },
    { name: 'Mocaccino', description: 'Deliciosa combinación de espresso, chocolate artesanal y leche.', price: '5.75', category: 'Bebidas Calientes' },
    
    { name: 'Cold Brew Fresa', description: 'Café extraído en frío por 18 horas con notas afrutadas.', price: '6.50', category: 'Bebidas Frías' },
    { name: 'Latte Frío de Vainilla', description: 'Espresso servido sobre hielo, leche fresca y jarabe de vainilla.', price: '7.50', category: 'Bebidas Frías' },
    { name: 'Frappé de Caramelo', description: 'Bebida granizada con café, salsa de caramelo y crema batida.', price: '7.00', category: 'Bebidas Frías' },
    
    { name: 'Pastel de Zanahoria', description: 'Húmedo bizcocho con nueces, especias y glaseado de queso crema.', price: '4.75', category: 'Repostería y Snacks' },
    { name: 'Croissant de Mantequilla', description: 'Hojaldre crujiente horneado diariamente según receta francesa.', price: '3.50', category: 'Repostería y Snacks' },
    { name: 'Cheesecake de Frutos Rojos', description: 'Suave tarta de queso con base crujiente y coulis de bayas.', price: '5.00', category: 'Repostería y Snacks' }
  ];

  // Computed state to group menu items by category
  readonly categorizedMenu = computed(() => {
    const items = this.menu();
    const categories: Record<string, Product[]> = {};
    
    for (const item of items) {
      const cat = item.category;
      if (!categories[cat]) {
        categories[cat] = [];
      }
      categories[cat].push(item);
    }
    
    return categories;
  });

  // Getter to easily list category names as keys
  readonly categoryNames = computed(() => Object.keys(this.categorizedMenu()));

  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.menu.set(data);
        } else {
          // If empty array, use mock menu in demo mode
          this.menu.set(this.mockMenu);
          this.isDemoMode.set(true);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.warn('Backend server offline. Falling back to Mock Menu (Demo Mode).', err);
        // Fallback to mock data so the app runs beautifully
        this.menu.set(this.mockMenu);
        this.isDemoMode.set(true);
        this.loading.set(false);
      }
    });
  }
}
