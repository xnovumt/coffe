import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageSliderComponent } from '../../components/image-slider/image-slider';
import { ProductCardComponent } from '../../components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ImageSliderComponent, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}
