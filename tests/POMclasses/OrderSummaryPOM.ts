import { Locator, Page } from '@playwright/test'

export default class OrderSummaryPOM {

    page: Page;
    orderNumber: Locator;
    
    constructor(page: Page){

        this.page = page;
        this.orderNumber = this.page.locator('.woocommerce-order-overview__order > strong');
    }

    //Locators
    async getOrderNumber() {

        return this.orderNumber.innerText();
    }
}
