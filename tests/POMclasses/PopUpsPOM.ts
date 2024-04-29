import { Page, Locator } from '@playwright/test'

export default class PopUpsPOM {

    page: Page;
    dismissButton: Locator;

    constructor(page: Page){
        
        this.page = page;
        this.dismissButton = this.page.getByRole('link', { name: 'Dismiss' });
    }

    //service methods
    async clickDismissButton(){

        await this.dismissButton.click();
    }
}
