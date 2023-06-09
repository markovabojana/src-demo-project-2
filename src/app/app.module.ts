import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './pages/users/users.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserDetailsComponent } from './pages/users/user-details/user-details.component';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { UserCartsComponent } from './pages/users/user-carts/user-carts.component';
import { CartsComponent } from './pages/carts/carts.component';
import { CarouselModule } from 'primeng/carousel';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuComponent } from './components/menu/menu.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    UserCartsComponent,
    CartsComponent,
    UserDialogComponent,
    MenuComponent,
    ProductDialogComponent,
    CartDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    TagModule,
    SliderModule,
    ProgressBarModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    CardModule,
    DataViewModule,
    RatingModule,
    PanelModule,
    DialogModule,
    CarouselModule,
    ReactiveFormsModule,
    CalendarModule,
    GalleriaModule,
    InputTextareaModule,
    SidebarModule,
    MenuModule,
    TabMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
