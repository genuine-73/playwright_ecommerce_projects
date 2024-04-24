import {Page, expect, Locator} from '@playwright/test'

export default class PopUpsPOM {
    //variable declaration
    page: Page;

    //Instantiation
    constructor(page: Page){
        this.page = page;
    }

    //locator 
    get dismissButton() {
        return this.page.getByRole('link', { name: 'Dismiss' })
    }

    //service methods
    async clickDismissButton(){
        await this.dismissButton.click();
    }
}