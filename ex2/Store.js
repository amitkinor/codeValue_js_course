import { Product, Customer, Order } from "./Store_entities.js";

export default class Store {
	constructor() {
		this.products = this.#initProducts();
		this.customers = this.#initCustomers();
		this.orders = this.#initOrders();
	}

	// checks if any of the products are out of stock
	checkEmptyProducts = (productIds) => {
		let isStockEmpty = false;
		productIds.forEach((productId) => {
			for (let product of this.products) {
				if (product.id === productId) {
					!product.itemsInstock && (isStockEmpty = true);
				}
			}
		});
		return isStockEmpty;
	};

	//  Setters  //

	setState = (state) => {
		const parsedState = JSON.parse(state);
		this.products = parsedState.products;
		this.customers = parsedState.customers;
		this.orders = parsedState.orders;
	};

	setOrder = (customerId, productsIds) => {
    // add order
    this.orders.push(new Order(customerId, productsIds));

    //  update stock
		productsIds.forEach((productId) => {
			this.products.map((product) => {
				product.id === productId && product.itemsInstock--;
			});
		});
	};

	//  Getters //

	getJsonData = () =>
		JSON.stringify({
			products: this.products,
			customers: this.customers,
			orders: this.orders,
		});

	getProducts = () => this.products;
	getCustomers = () => this.customers;
	getOrders = () => this.orders;

	//  dummy data  //

	#initProducts = () => [
		new Product(1, "prod1", 1),
		new Product(2, "prod2", 0),
		new Product(3, "prod3", 2),
		new Product(4, "prod4", 0),
		new Product(5, "prod5", 2),
	];

	#initCustomers = () => [
		new Customer(11, "customer11", "hasas st. 11"),
		new Customer(22, "customer22", "hasas st. 22"),
		new Customer(33, "customer33", "hasas st. 33"),
	];

	#initOrders = () => [
		new Order(11, [1]),
		new Order(22, [1, 2]),
		new Order(33, [1, 2, 3]),
	];
}
