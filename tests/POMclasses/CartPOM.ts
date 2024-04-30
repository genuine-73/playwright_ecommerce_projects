import { Page, expect, Locator } from '@playwright/test'
import CheckoutPOM from './CheckoutPOM';
import NavBarPOM from './NavBarPOM';
import { HelperMethods } from '../HelperMethods/HelperMethods';

export default class CartPOM {

    page: Page;
    couponCodeField: Locator;
    cartIsEmptyBanner: Locator;
    applyCouponButton: Locator;
    cartSubtotal: Locator;
    cartDiscount: Locator;
    cartShippingCost: Locator;
    cartTotal: Locator;
    removeCoupon: Locator;
    proceedToCheckoutButton: Locator;
    removeItem: Locator;
    returnToShopButton: Locator;
    productName: Locator;

    constructor(page: Page){

        this.page = page;

        this.couponCodeField = this.page.getByPlaceholder('Coupon code');
        this.cartIsEmptyBanner = this.page.getByText('Your cart is currently empty.');
        this.applyCouponButton = this.page.getByRole('button', { name: 'Apply coupon'});
        this.cartSubtotal = this.page.locator(".cart-subtotal .woocommerce-Price-amount")
        this.cartDiscount = this.page.locator(".cart-discount .woocommerce-Price-amount")
        this.cartShippingCost = this.page.locator("#shipping_method .woocommerce-Price-amount")
        this.cartTotal =  this.page.locator(".order-total .woocommerce-Price-amount")
        this.removeCoupon = this.page.getByText("[Remove]");
        this.proceedToCheckoutButton = this.page.getByText('Proceed to checkout');
        this.removeItem = this.page.getByLabel('Remove this item');
        this.returnToShopButton = this.page.getByText("Return to shop");
        this.productName = this.page.locator(".woocommerce-cart-form__cart-item > .product-name");
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

    //Gets the subtotal from the cart
    async getSubTotal(): Promise<number> {
        
        const subTotal = await this.cartSubtotal.innerText();
        return this.cartSubtotal ? HelperMethods.convertToInt(subTotal) : 0;
    }

    //Gets the total from the cart
    async getTotal(): Promise<number> {

        const total = await this.cartTotal.innerText();
        return total ? HelperMethods.convertToInt(total) : 0;
    }

    //Gets the shipping cost from the cart
    async getShipping(): Promise<number> {

        const shipping = await this.cartShippingCost.innerText();
        return shipping ? HelperMethods.convertToInt(shipping) : 0;
    }

    //Gets the Discounted cost from the cart
    async getDiscount(): Promise<number> {

        const discount = await this.cartDiscount.innerText();
        return discount ? HelperMethods.convertToInt(discount) : 0;
    }

    //Calculates the total
    async calculateExpectedTotal(discount: number): Promise<number> {

        const subTotal = await this.getSubTotal();
        const shipping = await this.getShipping();
        const expectedDiscount = await this.calculateDiscount(discount);
        return subTotal - expectedDiscount + shipping;
    }

    //Calculates the discount
    async calculateDiscount(discount: number): Promise<number> {

        const subtotal = await this.getSubTotal();
        return (discount / 100) * subtotal;
    }

    //Clean up
    async cartCleanUp( navbar: NavBarPOM ): Promise<void> {

        //Iterates over and removes coupon until coupon is 0
        await expect(async () => {

            if ( await this.removeCoupon.isVisible() ) {
                await this.removeCoupon.click();
            }

            await expect(this.removeCoupon).toHaveCount(0);
        }, 'Should be no coupons applied to cart').toPass({ timeout: 5_000 });

        // iterates over and removes items until the count is 0
        await expect(async () => {

            if ( await this.removeItem.first().isVisible() ) {
                await this.removeItem.click();
            }

            await expect (this.removeItem).toHaveCount(0);
        }, 'Should have no items in the cart').toPass({ timeout: 5_000 }); 

        await expect(this.cartIsEmptyBanner).toBeVisible(); 

    } 
}

