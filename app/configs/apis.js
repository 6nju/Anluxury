
import Axios from 'axios'

export default apis = {
	
	getNew(page) {
		return Axios.get('news?page='+page)
	},
	getRecruitment(page) {
		return Axios.get('api/recruitment?page='+page)
	},
	getHomePage() {
		
		return Axios.get('api/home-page')
	},
	order(id, name, phone, address, coupon, promotion, products, values, total, method, ghichu) {
		return Axios.post('api/save-order', { 
			id: id,
			name: name,
			phone: phone,
			address: address,
			coupon: coupon,
			values: values,
			promotion: promotion,
			products: products,
			total: total,
			method: method,
			ghichu: ghichu,
			ship: 0,
			pay_m: '',

		})
	},
	coupon(coupon) {
		return Axios.post('api/get-coupon-code', { couponcode: coupon })
	},
	getHot(page) {
		return Axios.get('api/get-hot?page='+page)
	},
	
	getNewInfo(id) {
		return Axios.get('api/get-info/'+id)
	},
	getMenu() {
		return Axios.get('api/get-menu')
	},
	getSlider() {
		return Axios.get('api/get-slider')
	},
	getWarrantyPolicy() {
		return Axios.get('api/policy/warranty')
	},
	getPolicyRetunExchange() {
		return Axios.get('api/policy/return-exchange')
	},
	getPaymentPolicy() {
		return Axios.get('api/policy/payment')
	},
	getShippingPolicy() {
		return Axios.get('api/policy/shipping')
	},
	forgot(email) {
		return Axios.post('api/customer/forgot-password', { email: email })
	},
	login(username, password) {
		return Axios.post('api/login', { username: username, password: password })
    },
	getProduct(id) {
		return Axios.get('api/product/'+id)
	},
	getNewProduct() {
		return Axios.get('api/new/products/')
	},
	getBestSale(page) {
		return Axios.get('api/best-sellers/products?page='+page)
	},
	getHomePage() {
		return Axios.get('api/get-home/')
	},
	getFlashSale() {
		return Axios.get('api/get-sale/')
	},
	getShip() {
		return Axios.get('api/get-ship')
	},
	getOrder(phone) {
		return Axios.get('api/get/order/'+phone)
	},
	getCatalog() {
		return Axios.get('api/document/catalog/')
	},
	getCategory(id) {
		return Axios.get('api/get-categories/'+id)
	},
	register(username, phone, password, email, address) {
		return Axios.post('api/create-account-customer', {
			name: username,
			phone: phone,
			email: email,
			address: address,
			password: password,
		})
    },
	getCategorySon(id, page) {
		return Axios.get('api/category-child/'+id+'?page='+page)
	},

	getSearchOption(from, to, category, catalog) {
		return Axios.get('api/products?price[from]='+from+'&price[to]='+to+'&category_id='+category+'&catalog='+catalog)
		
	},
	getProductList(id) {
		return Axios.get('api/product/'+id)
	},
    getSearch(search, page) {
		return Axios.get('api/products/search/'+search+'?page='+page)
	},
    
}
