import { Product, Customer, Order } from "./Store_entities.js";

export default class Store {
  constructor() {
    this.products = this.#initProducts();
		this.customers = this.#initCustomers();
		this.orders = this.#initOrders();
	}

  setOrder = (customerId, productsIds) => {
    
    this.orders.push(new Order(customerId, productsIds));

    productsIds.forEach((productId) => {
      this.products.map((product) => {
        (product.id === productId) && (product.itemsInstock--) 
      })
    })
  }

  getProducts = () => this.products;
  getCustomers = () => this.customers;
  getOrders = () => this.orders;
  

  #initProducts = () => [
    new Product(1, 'prod1', 1),
    new Product(2, 'prod2', 0),
    new Product(3, 'prod3', 2),
    new Product(4, 'prod3', 3),
  ];

  #initCustomers = () => [
    new Customer(11, 'customer11', 'hasas st. 11'),
    new Customer(22, 'customer22', 'hasas st. 22'),
    new Customer(33, 'customer33', 'hasas st. 33'),
  ];

  #initOrders = () => [
    new Order(11, [1]),
    new Order(22, [1,2]),
    new Order(33, [1,2,3]),
  ];

}