import {Page, Locator} from '@playwright/test'
import CartPOM from '../POMclasses/CartPOM';

export class HelperMethods {
    
    //Converts the string to int
    static async convertToInt(num: string): Promise<number> {

        return Math.round(parseFloat(num.substring(1)) * 100);
    }
}
