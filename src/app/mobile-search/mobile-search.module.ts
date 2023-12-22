import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileSearchRoutingModule } from './mobile-search-routing.module';
import { MobileSearchComponent } from './mobile-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    MobileSearchComponent
  ],
  imports: [
    CommonModule,
    MobileSearchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ]
})
export class MobileSearchModule { }
