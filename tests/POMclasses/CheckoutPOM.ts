import {Page, expect, Locator} from '@playwright/test'
import OrderSummaryPOM from './OrderSummaryPOM';

export default class CheckoutPOM {

    page: Page;
    firstName: Locator;
    lastName: Locator;
    country: Locator;
    streetAddress: Locator;
    city: Locator;
    postCode: Locator;
    phoneNo: Locator;
    emailAddress: Locator;
    checkPaymentRadioButton: Locator;
    placeOrderButton: Locator;

    constructor(page: Page){
        
        this.page = page;

        //Locators
        this.firstName = this.page.locator('#billing_first_name');
        this.lastName = this.page.locator('#billing_last_name');
        this.country = this.page.locator('#select2-billing_country-container');
        this.streetAddress = this.page.locator('#billing_address_1');
        this.city = this.page.locator('#billing_city');
        this.postCode = this.page.locator('#billing_postcode');
        this.phoneNo = this.page.locator('#billing_phone');
        this.emailAddress = this.page.locator('#billing_email');
        this.checkPaymentRadioButton = this.page.getByLabel('Check payments');
        this.placeOrderButton =this.page.getByRole('button', { name: 'Place order' });
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