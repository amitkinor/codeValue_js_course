import Store from "./Store.js";

const store = new Store();

const printOrders = () => {
	const orders = store.getOrders();
	orders.forEach((order) => {
		console.log(`
     customer number: ${order.customerId} ${'-'} ${order.productsIds}`);
	});
};

const addOrder = (customerId, ...productIds) => {
	if (checkEmptyHelper(...productIds)) {
		return "Fail";
	}
	store.setOrder(customerId, ...productIds);
	return "stock is ready";
};

// checks if any of the products are out of stock
const checkEmptyHelper = (productIds) => {
	let isStockEmpty = false;
	const stock = store.getProducts();
	productIds.forEach((productId) => {
		for (let product of stock) {
			if (product.id === productId) {
				!product.itemsInstock && (isStockEmpty = true);
			}
		}
	});
	return isStockEmpty;
};

//    testing   //

//  printOrders();

//  Add order execution
//    let orderResult = addOrder(11, [1,3,4]);
//    console.log(orderResult);

//console.log(store)
