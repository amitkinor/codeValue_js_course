export class Product {
	constructor(id, name, itemsInStock) {
		this.id = id;
		this.name = name;
		this.itemsInstock = itemsInStock;
	}
}

export class Customer {
	constructor(id, name, address) {
		this.id = id;
		this.name = name;
		this.address = address;
	}
}

export class Order {
	constructor(customerId, productsIds) {
		this.customerId = customerId;
		this.productsIds = productsIds;
		
	}
}
