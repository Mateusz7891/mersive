import { test } from '@playwright/test';
import { QuizPage } from '../pages/quizPage';
import { MainPage } from '../pages/mainPage';
import { expect } from '@playwright/test';


test('quiz flow test', async ({ page }) => {
    const quizPage = new QuizPage(page);
    const mainPage = new MainPage(page);
    const resultOne = 'Given your workforce is predominantly or entirely in-office, you should consider Solstice to enhance your meeting spaces for more efficient, engaging, and productive meetings.'
    const resultTwo = 'Given your need to enhance training and learning spaces, you should consider Solstice Active Learning to create the most engaging team-based learning environments.'


    // 1: Conference Room quiz
    await quizPage.navigateToQuiz();
    await mainPage.acceptCookies();
    await quizPage.startQuiz();
    await quizPage.answerQuestionMultiChoice(['Conference Room Up to 20']);
    await quizPage.clickNextButton();
    await quizPage.answerQuestionSingleChoice('Onsite');
    await quizPage.clickNextButton();
    await quizPage.answerQuestionMultiChoice(['Room Audio/Video']);
    await quizPage.clickNextButton();
    await quizPage.answerQuestionMultiChoice(['Dealer / Integrator', 'AV / IT']);
    await quizPage.submitResults();
    await quizPage.verifyResults(resultOne);
    await quizPage.verifyImageSrcContains('Solstice.svg');


    // 2: Active Learning quiz
    await quizPage.navigateToQuiz();
    await quizPage.startQuiz();
    await quizPage.answerQuestionMultiChoice(['Active Learning Up to 50']);
    await quizPage.clickNextButton();
    await quizPage.answerQuestionSingleChoice('Hybrid');
    await quizPage.clickNextButton();
    await quizPage.answerQuestionMultiChoice(['Workplace Analytics']);
    await quizPage.clickNextButton();
    await quizPage.answerQuestionMultiChoice(['End User / Customer']);
    await quizPage.submitResults();
    await quizPage.verifyResults(resultTwo);
    await quizPage.verifyImageSrcContains('Solstice-Active-Learning.svg');

    expect(resultOne).not.toBe(resultTwo);        // Ensure the results of the two quizzes are different
});
