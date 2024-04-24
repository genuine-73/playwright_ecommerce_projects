import {test as teardown, expect} from '@playwright/test';
import NavBarPOM from './POMclasses/NavBarPOM';
import AccountPOM from './POMclasses/AccountPOM';

teardown('Teardown', async ({page}) => {

    console.log("Now in global teardown");

    //Navigating to the my account webpage
    await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');

    //Logout from Account
    const account = new AccountPOM(page);
    await account.clickLogoutButton();

    //close down the website
    await page.close();
    console.log("Successfully closed the website")
})