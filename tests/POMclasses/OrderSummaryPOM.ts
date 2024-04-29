import { Page } from '@playwright/test'

export default class OrderSummaryPOM {

    page: Page;

    constructor(page: Page){

        this.page = page;
    }

    //Locators
    get Ordernumber() {

        return this.page.locator('#post-6 > div > div > div > ul > li.woocommerce-order-overview__order.order > strong').innerText();
    }
}
