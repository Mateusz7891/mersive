import { test, expect } from '@playwright/test';
import { QuizPage } from '../pages/quizPage';
import { MainPage } from '../pages/mainPage';
import { quizData } from '../data/quizData'; // Import the quiz data

// Helper function to execute a quiz flow
const runQuizFlow = async (quizPage: QuizPage, quizInfo: any) => {
    // Navigate to the quiz and start it
    await quizPage.navigateToQuiz();
    await quizPage.startQuiz();

    // Answer multiple-choice and single-choice questions
    await quizPage.answerQuestionMultiChoice(quizInfo.choices.multiChoice1);
    await quizPage.clickNextButton();
    await quizPage.answerQuestionSingleChoice(quizInfo.choices.singleChoice);
    await quizPage.clickNextButton();
    await quizPage.answerQuestionMultiChoice(quizInfo.choices.multiChoice2);
    await quizPage.clickNextButton();
    await quizPage.answerQuestionMultiChoice(quizInfo.choices.multiChoice3);
    await quizPage.submitResults();
    
    // Verify the result and the image file name
    await quizPage.verifyResults(quizInfo.resultText);
    await quizPage.verifyImageFileNameIsExactly(quizInfo.imageFileName);
};

test('quiz flow test', async ({ page }) => {
    const quizPage = new QuizPage(page);
    const mainPage = new MainPage(page);

    // Accept cookies only once at the beginning of the test
    await mainPage.navigate();
    await mainPage.acceptCookies();

    // 1: Run the "Conference Room" quiz flow
    console.log('Running Conference Room Quiz');
    await runQuizFlow(quizPage, quizData.quiz1);

    // 2: Run the "Active Learning" quiz flow
    console.log('Running Active Learning Quiz');
    await runQuizFlow(quizPage, quizData.quiz2);

    // Ensure the results of the two quizzes are different
    expect(quizData.quiz1.resultText).not.toBe(quizData.quiz2.resultText);
});
