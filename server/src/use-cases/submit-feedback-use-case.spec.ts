// test('sum 2+2', () => {
//     expect(2+2).toBe(4);
// })

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

// spies = espiões

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)
describe('Submit feedback', () => {
    it('should be able to submit feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'This is a bug',
            screenshot: 'data:image/png;base64,idhasiodhnioasjin'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
        
    })

    it('should not be able to submit feedback without type', async () => {
        
        await expect(submitFeedback.execute({
            type: '',
            comment: 'This is a bug',
            screenshot: 'data:image/png;base64,idhasiodhnioasjin'
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback without comment', async () => {
        
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,idhasiodhnioasjin'
        })).rejects.toThrow()
    })

    it('should nnot be able to submit feedback with screenshot invaled', async () => {
        
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'This is a bug',
            screenshot: 'ima.png'
        })).rejects.toThrow()
    })
})