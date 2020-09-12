import Store from "./Store.js";

const store = new Store();

const load = (state) => {
  store.setState(state);
}

const save = () => {
  clg(store.getJsonData());
}

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

let value = JSON.stringify({
  products: [{id:1, name:'prod1',itemsInstock:3},{id:2,name:'prod2',itemsInstock:2}],
  customers: [{id:11, name:'amit',address:'hadsad'},{id:22, name:'amit2',address:'rrrr'}],
  orders: [{customerId:1,productsIds:[2,3,4]},{customerId:2,productsIds:[4]}]
})

load(value);
console.log(store);
//  printOrders();

//  Add order execution
//    let orderResult = addOrder(11, [1,3,4]);
//    console.log(orderResult);

//console.log(store)
//console.log(save());
