import { HomeHeaderComponent } from './home-header.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeHeaderComponent],
  exports: [HomeHeaderComponent],
  imports: [RouterModule],
})
export class HomeHeaderModule {}
