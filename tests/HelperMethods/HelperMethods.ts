import {Page, Locator} from '@playwright/test'
import CartPOM from '../POMclasses/CartPOM';

export class HelperMethods {
    
    //Converts the string to int
    static async convertToInt(num: string): Promise<number> {

        return Math.round(parseFloat(num.substring(1)) * 100);
    }

    //Gets the subtotal from the cart
    static async getSubTotal(page: Page): Promise<number> {

        const subTotal = await new CartPOM(page).cartSubtotal;
        return subTotal ? this.convertToInt(subTotal) : 0;
    }

    //Gets the total from the cart
    static async getTotal(page: Page): Promise<number> {

        const total = await new CartPOM(page).cartTotal;
        return total ? this.convertToInt(total) : 0;
    }

    //Gets the shipping cost from the cart
    static async getShipping(page: Page): Promise<number> {

        const shipping = await new CartPOM(page).cartShippingCost;
        return shipping ? this.convertToInt(shipping) : 0;
    }

    //Gets the Discounted cost from the cart
    static async getDiscount(page: Page): Promise<number> {

        const discount = await new CartPOM(page).cartDiscount;
        return discount ? this.convertToInt(discount) : 0;
    }

    //Calculates the total
    static async calculateExpectedTotal(page: Page): Promise<number> {

        const subTotal = await this.getSubTotal(page);
        const shipping = await this.getShipping(page);
        const discount = await this.getDiscount(page);
        return subTotal - discount + shipping;
    }

    //Calculates the discount
    static async calculateDiscount(discount: number, page): Promise<number> {

        const subtotal = await this.getSubTotal(page);
        return (discount / 100) * subtotal;
    }
}