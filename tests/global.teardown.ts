import {test as teardown, expect} from '@playwright/test';
import NavBarPOM from './POMclasses/NavBarPOM';
import AccountPOM from './POMclasses/AccountPOM';
console.log("Now in global teardown");
teardown('Teardown', async ({page}) => {
    await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');
    //Navigate to page
    const navbar = new NavBarPOM(page);
    await navbar.goToAccount();

    //Logout from Account
    const account = new AccountPOM(page);
    await account.clickLogoutButton();

    //close down the website
    await page.close();
    console.log("Successfully closed the website")
})