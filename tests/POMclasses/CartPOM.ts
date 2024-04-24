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

    //Service methods
    async enterCouponCode(coupon: string): Promise<void> {
        
        await this.couponCodeField.fill(coupon);
        await expect(this.couponCodeField, "coupon code field should not be empty").not.toBeEmpty();
    }

    async applyCoupon(): Promise<void>{

        await this.applyCouponButton.click();
    }

    async goToCheckout(): Promise<CheckoutPOM> {

        await this.proceedToCheckoutButton.click();
        return new CheckoutPOM(this.page);
    }

    //Clean up
    async cartCleanUpProcess(navbar: NavBarPOM): Promise<void> {

        if(await this.removeCoupon.isVisible()){ //deletes coupon code if its been applied to cart

            await this.removeCoupon.click();
            console.log("Deletes coupon code")
        }

        let total = await this.removeItem.count();

        while (total > 0) { // loops through all of the items of the list and deletes them one by one

            await this.removeItem.first().click();
            await expect(this.removeItem).toHaveCount(--total); //waits until count updates 
        }

        await expect(this.cartIsEmptyBanner).toBeVisible(); 
    } 
}
