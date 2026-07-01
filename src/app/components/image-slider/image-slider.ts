import { Component, OnInit, OnDestroy, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Slide {
  image: string;
  title: string;
  description: string;
  link?: string;
  buttonText?: string;
}

@Component({
  selector: 'app-image-slider',
  imports: [RouterLink],
  templateUrl: './image-slider.html',
  styleUrl: './image-slider.css'
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly slides: Slide[] = [
    {
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      title: 'Tu Rincón de Café Perfecto',
      description: 'Sumérgete en el aroma, saborea la tradición.',
      link: '/menu',
      buttonText: 'Explora Nuestro Menú'
    },
    {
      image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=80',
      title: 'Despierta tus Sentidos',
      description: 'Cada taza, una experiencia única de sabor y pasión.',
      link: '/about',
      buttonText: 'Conoce Nuestra Historia'
    },
    {
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
      title: 'Momentos Inolvidables',
      description: 'El ambiente ideal para tus encuentros y tu inspiración diaria.',
      link: '/contact',
      buttonText: 'Visítanos'
    }
  ];

  readonly currentIndex = signal(0);
  readonly currentSlide = computed(() => this.slides[this.currentIndex()]);

  private intervalId: any = null;

  ngOnInit(): void {
    // Skip autoplay for SSR and for users who prefer reduced motion.
    if (isPlatformBrowser(this.platformId) && !this.prefersReducedMotion()) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy(): void {
    this.clearAutoPlay();
  }

  // Slides are stacked layers; switching index crossfades them via CSS opacity.
  goToSlide(index: number): void {
    if (index === this.currentIndex()) return;
    this.currentIndex.set(index);
    this.resetAutoPlay();
  }

  nextSlide(): void {
    this.goToSlide((this.currentIndex() + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.goToSlide((this.currentIndex() - 1 + this.slides.length) % this.slides.length);
  }

  private startAutoPlay(): void {
    this.clearAutoPlay();
    this.intervalId = setInterval(() => this.nextSlide(), 7000);
  }

  private resetAutoPlay(): void {
    if (isPlatformBrowser(this.platformId) && !this.prefersReducedMotion()) {
      this.startAutoPlay();
    }
  }

  private clearAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private prefersReducedMotion(): boolean {
    return isPlatformBrowser(this.platformId) &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
