import {test as setup, expect} from '@playwright/test';
import {STORAGE_STATE } from '../playwright.config';
import PopUpsPOM from './POMclasses/PopUpsPOM';
import NavBarPOM from './POMclasses/NavBarPOM';
import AccountPOM from './POMclasses/AccountPOM';

setup('Setup process', async ({page})=>{
    //navigate to ecommerce site
    await page.goto('./')
    console.log("Successfully navigated to the ecommerce website")

    //Gets rid of the popup below page
    const popup = new PopUpsPOM(page);
    await popup.clickDismissButton();
    console.log("Successfully dismissed a banner below");

    //Navigates to account
    const navbar = new NavBarPOM(page);
    await navbar.goToAccount();
    console.log("Successfully navigated to my account");

    //logging in to account
    const account = new AccountPOM(page);
    await account.login('hellogen@edgewords.co.uk', 'HelloEdgewords!23');
    expect(account.logoutButton, "should be logged in").toBeVisible();
    await page.waitForURL("https://www.edgewordstraining.co.uk/demo-site/my-account/");
    await page.context().storageState({path: STORAGE_STATE});
    console.log("Successfully logged into my account");
    
})