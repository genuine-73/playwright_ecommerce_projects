import { test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';
import PopUpsPOM from './POMclasses/PopUpsPOM';
import NavBarPOM from './POMclasses/NavBarPOM';

setup('Setup process', async ({page})=>{

    //navigate to ecommerce site
    await page.goto('./');

    //Gets rid of the popup below page
    const popup = new PopUpsPOM(page);
    await popup.clickDismissButton();

    //Navigates to account
    const navbar = new NavBarPOM(page);
    const account = await navbar.goToAccountSuccess();

    //logging in to account
    await account.loginExpectSuccess(
        process.env.USER_NAME as string, 
        process.env.PASSWORD as string 
    );
    console.log("Successfully logged into my account");
    
    await page.waitForURL("./my-account/");

    //Stores login state so we can start from logged in state every time test is run
    await page.context().storageState({path: STORAGE_STATE});
    
})