import {Page, expect, Locator} from '@playwright/test'
import CheckoutPOM from './CheckoutPOM';
import NavBarPOM from './NavBarPOM';

export default class CartPOM {

    //variable declaration
    page: Page;

    //Instantiation
    constructor(page: Page){

        this.page = page;
        //expect(page).toHaveURL("https://www.edgewordstraining.co.uk/demo-site/cart/");

    }

    //locators
    get couponCodeField() {
        return this.page.getByPlaceholder('Coupon code');
    }

    get cartIsEmptyBanner() {
        return this.page.getByText('Your cart is currently empty.')
    }

    get applyCouponButton() {
        return this.page.getByRole('button', { name: 'Apply coupon'});
    }

    get cartSubtotal() {
        return this.page.locator(".cart-subtotal > td:nth-child(2) > span:nth-child(1)").textContent();
    }

    get cartDiscount() {
        return this.page.locator(".cart-discount > td:nth-child(2) > span:nth-child(1)").textContent();

    }

    get cartShippingCost(){
        return this.page.locator("#shipping_method > li > label > span").textContent();
    } 

    get cartTotal() {
        return this.page.locator(".order-total > td:nth-child(2) > strong:nth-child(1) > span:nth-child(1)").textContent();
    }

    get removeCoupon(){
        return this.page.getByText("[Remove]");
    }

    get proceedToCheckoutButton() {
        return 	this.page.getByText('Proceed to checkout');
    }

    get removeItem() {
        return this.page.getByLabel('Remove this item');
    }

    get returnToShopButton(){
        return this.page.getByText("Return to shop");
    }

    get productName() {
        return this.page.locator(".woocommerce-cart-form__cart-item > .product-name");
    }

    // service method

    async enterCouponCode(coupon: string) {
        
        await this.couponCodeField.fill(coupon);
        await expect(this.couponCodeField, "coupon code field should not be empty").not.toBeEmpty();
    }

    async clickApplyCoupon(){

        await this.applyCouponButton.click();
    }

    async clickProceedToCheckout(): Promise<CheckoutPOM> {

        await this.proceedToCheckoutButton.click();
        return new CheckoutPOM(this.page);
    }

    //TODO Complete this method 
    async cartCleanUpProcess(navbar: NavBarPOM) {

        if(await this.removeCoupon.isVisible()){

            await this.removeCoupon.click();
        }

        let total = await this.removeItem.count();

        while (total > 0) {

            await this.removeItem.first().hover();
            await this.removeItem.first().click();
            await expect(this.removeItem).toHaveCount(--total);
        }

        await expect(this.cartIsEmptyBanner).toBeVisible();
    } 
}
