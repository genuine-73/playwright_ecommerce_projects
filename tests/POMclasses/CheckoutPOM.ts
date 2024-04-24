import {Page, expect, Locator} from '@playwright/test'
import OrderSummaryPOM from './OrderSummaryPOM';

export default class CheckoutPOM {
    //variable declaration
    page: Page;

    //Instantiation
    constructor(page: Page){
        
        this.page = page;
    }

    //locator
    get firstName() {

        return this.page.locator('#billing_first_name')
    }

    get lastName() {

        return this.page.locator('#billing_last_name')
    }

    get country(){

        return this.page.locator('#select2-billing_country-container')
    }

    get streetAddress() {

        return this.page.locator('#billing_address_1')
    }

    get city() {

        return this.page.locator('#billing_city')
    }

    get postCode() {

        return this.page.locator('#billing_postcode')
    }

    get phoneNo() {

        return this.page.locator('#billing_phone');
    }

    get emailAddress() {

        return this.page.locator('#billing_email')
    }

    get checkPaymentRadioButton() {

        return this.page.getByLabel('Check payments')
    }

    get placeOrderButton() {

        return this.page.getByRole('button', { name: 'Place order' });
    }
    
    //service methods
    async enterBillingDetails(firstName: string, lastName: string, streetAddress: string, city: string, postCode: string, phoneNo: string, email: string){
        
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.streetAddress.fill(streetAddress);
        await this.city.fill(city);
        await this.postCode.fill(postCode);
        await this.phoneNo.fill(phoneNo);
        await this.emailAddress.fill(email);
        
    }

    async placeOrder(): Promise<OrderSummaryPOM> {

        //Checks payment method
        await this.checkPaymentRadioButton.check();
        await expect(this.checkPaymentRadioButton).toBeChecked();

        //places order
        await this.placeOrderButton.click();
        return new OrderSummaryPOM(this.page);
    }
}