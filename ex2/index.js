import Store from "./Store.js";

const store = new Store();

const addOrder = (customerId, ...productIds) => {
	if (store.checkEmptyProducts(...productIds)) {
		return "Fail";
	}
	store.setOrder(customerId, ...productIds);
};

const printOrders = () => {
	const orders = store.getOrders();
	orders.forEach((order) => {
		console.log(`
     customer number: ${order.customerId} ${"-"} ${order.productsIds}`);
	});
};

const save = () => {
	clg(store.getJsonData());
};

const load = (state) => {
	store.setState(state);
};

const notify = () => {
	setTimeout(() => {
		const products = store.getProducts();
		products.forEach((product) => {
			product.itemsInstock === 0 && console.log(product.name);
		});
	}, 1000);
};

//  Tested  successfully  //

//  1.
//  Add order execution
//    let orderResult = addOrder(11, [1,3,4]);
//    console.log(orderResult);

//  2.
//  printOrders();

//  3.
//  save();

//  4.
// let value = JSON.stringify({
//   products: [{id:1, name:'prod1',itemsInstock:3},{id:2,name:'prod2',itemsInstock:2}],
//   customers: [{id:11, name:'amit',address:'hadsad'},{id:22, name:'amit2',address:'rrrr'}],
//   orders: [{customerId:1,productsIds:[2,3,4]},{customerId:2,productsIds:[4]}]
// });
// load(value);
// console.log(store);

//  5.
//notify();
