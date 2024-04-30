import {Page, Locator} from '@playwright/test'
import CartPOM from '../POMclasses/CartPOM';

export class HelperMethods {
    
    //Converts the string to int
    static async convertToInt(num: string): Promise<number> {
        // Remove non-numeric characters
        const numericString = Number(num.replace(/[^0-9.-]+/g, ''));
        return numericString;
    }
}
