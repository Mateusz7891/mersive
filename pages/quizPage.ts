import { Page, expect } from '@playwright/test';

export class QuizPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToQuiz() {
        await this.page.goto('https://www.mersive.com/solstice-quiz/');
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
        await this.page.goto(`https://www.mersive.com/solstice-quiz-results/${queryParams}`);
    } 
    
}
