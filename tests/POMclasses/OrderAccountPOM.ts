import AccountNavBarPOM from './AccountNavBarPOM';

//inherits nav links (logout and orders) from account nav bar
export default class OrderAccount extends AccountNavBarPOM {

    get latestOrderNumber() {
        
        return this.page.locator('.woocommerce-orders-table__row:first-child > .woocommerce-orders-table__cell-order-number > a').innerText();
    }
}
