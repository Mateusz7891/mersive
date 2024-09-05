import { Locator, Page, expect } from '@playwright/test';

export class MainPage {
    private page: Page;
    private acceptAllButton: Locator;
    private buyNowLink: Locator;
    private addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptAllButton = page.getByRole('button', { name: 'Accept All' });
        this.buyNowLink = page.getByRole('link', { name: 'Buy Now' }).first();
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).nth(1);
    }

    async navigate() {
        await this.page.goto('https://www.mersive.com/');
    }

    async acceptCookies() {
        await this.acceptAllButton.click();
    }

    async clickBuyNow() {
        await this.buyNowLink.click();
    }

    async addToCart() {
        await this.page.waitForLoadState('networkidle'); //had to add that, there is some glitch on the page
        await this.addToCartButton.waitFor({ state: 'visible' });
        await this.addToCartButton.click();
    }
    

    async verifyProductInCart() {
        await expect(this.page.locator('body')).toContainText('Solstice Element - + $698.00');
        await expect(this.page.locator('body')).toContainText('My Cart (1)');
    }

    async goToProductPageWithReload(context) {
        const pages = context.pages();
        const firstPage = pages[0];
        await firstPage.bringToFront();
        await firstPage.reload();
        await expect(firstPage.locator('body')).toContainText('Buy Now');
    }
    
}
