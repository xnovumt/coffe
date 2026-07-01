import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
  name: string;
  price: number;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);

  // ponytail: placeholder number from the Contact page — replace with the café's real WhatsApp.
  private readonly whatsappPhone = '573001234567';

  readonly items = signal<CartItem[]>([]);
  readonly isOpen = signal(false);

  readonly count = computed(() => this.items().reduce((n, i) => n + i.qty, 0));
  readonly total = computed(() => this.items().reduce((s, i) => s + i.price * i.qty, 0));

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('cart');
      if (saved) {
        try { this.items.set(JSON.parse(saved)); } catch { /* ignore corrupt cart */ }
      }
      effect(() => localStorage.setItem('cart', JSON.stringify(this.items())));
    }
  }

  add(name: string, price: number | string): void {
    const p = typeof price === 'number' ? price : parseFloat(price);
    this.items.update((items) => {
      const found = items.find((i) => i.name === name);
      return found
        ? items.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i))
        : [...items, { name, price: p, qty: 1 }];
    });
  }

  setQty(name: string, qty: number): void {
    if (qty <= 0) { this.remove(name); return; }
    this.items.update((items) => items.map((i) => (i.name === name ? { ...i, qty } : i)));
  }

  remove(name: string): void {
    this.items.update((items) => items.filter((i) => i.name !== name));
  }

  clear(): void {
    this.items.set([]);
  }

  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }

  // Builds the order message and hands off to WhatsApp — no backend, no payment gateway.
  checkoutWhatsApp(): void {
    if (!isPlatformBrowser(this.platformId) || this.items().length === 0) return;
    const lines = this.items().map((i) => `• ${i.qty}x ${i.name} — $${(i.price * i.qty).toFixed(2)}`);
    const msg = `¡Hola Coloquial! Quiero hacer este pedido:\n${lines.join('\n')}\n\nTotal: $${this.total().toFixed(2)}`;
    window.open(`https://wa.me/${this.whatsappPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  }
}
