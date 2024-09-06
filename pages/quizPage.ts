import { Page, expect } from '@playwright/test';

export class QuizPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToQuiz() {
        await this.page.goto('/solstice-quiz/');
    }

    async startQuiz() {
        await this.page.getByRole('button', { name: 'Get Started' }).click();
    }

    async answerQuestionMultiChoice(texts: string[]) {
        for (const text of texts) {
            await this.page.getByText(new RegExp(`${text}`, 'i')).click();           
        }
    }

    async clickNextButton() {
        await this.page.getByRole('button', { name: 'Next Question' }).click();
    }
    

    async answerQuestionSingleChoice(mainText: string) {
        await this.page.getByText(mainText, { exact: true }).click();
    }
    

    async submitResults() {
        await this.page.getByRole('button', { name: 'See My Results' }).click();
    }

    async verifyResults(expectedText: string) {
        await expect(this.page.locator('#content')).toContainText(expectedText);
    }

    async navigateToQuizResults(queryParams: string) {
        await this.page.goto(`solstice-quiz-results/${queryParams}`);
    } 

    async verifyImageFileNameIsExactly(imageFileName: string) {
        // Find the img element whose 'src' attribute contains the image file name
        const imageLocator = this.page.locator(`//img[contains(@src, '${imageFileName}')]`);
        
        // Wait until the element is visible on the page
        await imageLocator.waitFor({ state: 'visible' });
        
        // Ensure exactly one such image is found
        await expect(imageLocator).toHaveCount(1);
        
        // Retrieve the 'src' attribute of the image element
        const imageSrc = await imageLocator.getAttribute('src');
        
        // Extract the file name from the full 'src' URL
        const extractedFileName = imageSrc?.split('/').pop();
        
        // Check if the extracted file name is exactly the same as the expected image file name
        expect(extractedFileName).toBe(imageFileName);
    }
    
    
    
    
}
