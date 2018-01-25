import { PizzaService } from './pizza.service';
import { ToppingsService } from './toppings.service';

export const services: any[] = [PizzaService, ToppingsService];

export * from './pizza.service';
export * from './toppings.service';