import {Page, expect, Locator} from '@playwright/test'

export default class CartPOM {
    //variable declaration
    page: Page;

    //Instantiation
    constructor(page: Page){
        this.page = page;
        expect(page).toHaveURL("https://www.edgewordstraining.co.uk/demo-site/cart/");
    }

    //locators
    get couponCodeField() {
        return this.page.getByPlaceholder('Coupon code');
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

    // service method
    async enterCouponCode(coupon: string) {
        await this.couponCodeField.fill(coupon);
    }

    async clickApplyCoupon(){
        await this.applyCouponButton.click();
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    async cartCleanUpProcess() {
        await this.removeCoupon.click();
        //await this.removeItem.click();
        for (const row of await this.removeItem.all()){
            row.click();
        }
        //await this.returnToShopButton.isVisible();
        await this.returnToShopButton.click();
    }

    async convertToFloat(num: string): Promise<number> {
        return Math.round(parseFloat(num.substring(1)) * 100);
    }

    async getSubTotal(): Promise<number>{
        const subTotal = await this.cartSubtotal;
        return subTotal ? this.convertToFloat(subTotal) : 0;
        
    }

    async getDiscount(): Promise<number>{
        const discount = await this.cartDiscount;
        return discount ? this.convertToFloat(discount) : 0;
    
    }

    async getTotal(): Promise<number>{
        const total = await this.cartTotal;
        return total ? this.convertToFloat(total) : 0;
    }

    async getShipping(): Promise<number>{
        const shipping = await this.cartShippingCost;
        return shipping ? this.convertToFloat(shipping) : 0;
    }

    async calculateExpectedTotal(): Promise<number>{
        const subTotal =  await this.getSubTotal();
        const shipping = await this.getShipping();
        const discount = await this.getDiscount();
        return subTotal - discount + shipping;
    }
    async calculateDiscount(discount: number): Promise<number>{
        const subtotal = await this.getSubTotal();
        return (discount/100) * subtotal;
    }

    


}