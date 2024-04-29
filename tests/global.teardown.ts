import { test as teardown } from '@playwright/test';
import AccountPOM from './POMclasses/AccountPOM';

teardown('Teardown', async ({page}) => {

    console.log("Now in global teardown");

    //Navigating to the my account webpage
    await page.goto('./my-account/');

    //Logout from Account
    const account = new AccountPOM(page);
    await account.logout();

    //close down the website
    await page.close();
    console.log("Successfully closed the website")
})