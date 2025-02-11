import { createTestingPinia } from '@pinia/testing'
import { VueWrapper, mount } from '@vue/test-utils'
import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
  vi
} from 'vitest'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import QuizQuestion from '@/components/QuizQuestion.vue'

describe('QuizQuestion', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(
      QuizQuestion,
      {
        global: {
          plugins: [router, vuetify, createTestingPinia()]
        },
        props: {
          quizQuestion: {
            question: 'Question_1',
            options: ['option_1', 'option_2', 'option_3', 'option_4'],
            answer: 'option_4'
          },
          questionPosition: 1,
          scrollFromTop: 0
        }
      }
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Should render component', () => {
    const componentWrapper = wrapper.find('[data-testid="apq-quiz-question"]')
    expect(componentWrapper.exists()).toBe(true)
  })
  
  it('should calculate the correct visibleQuestionIndex based on scrollFromTop', async () => {
    await wrapper.setProps({ scrollFromTop: 600 })
    const visibleQuestionIndex = wrapper.vm.visibleQuestionIndex
    expect(visibleQuestionIndex).toBe(0)
  })

  it('should calculate the correct hideQuestionPercent value', async () => {
    const hidePercent = wrapper.vm.hideQuestionPercent()
    expect(hidePercent).toBeGreaterThanOrEqual(0)
  })

  it('should calculate the correct revealQuestionPercent value', async () => {
    const revealPercent = wrapper.vm.revealQuestionPercent()
    expect(revealPercent).toBeGreaterThanOrEqual(0)
  })

  it('should emit "option-selected" event when an option is clicked', async () => {
    const option = 'option_1'
    const handleClickSpy = vi.spyOn(wrapper.vm, 'handleClick')

    const optionCard = wrapper.findAll('.apq-option').at(0)
    await optionCard?.trigger('click')

    expect(handleClickSpy).toHaveBeenCalledWith(option)
    expect(wrapper.emitted()['option-selected'][0]).toEqual([{ value: option, position: 1 }])
  })

  it('should apply dynamic background image classes based on questionPosition', () => {
    const positionClass = wrapper.classes().find((className) =>
      className.startsWith('apq-background-image')
    )
    expect(positionClass).toBe('apq-background-image_1')
  })

  it('should have the correct style for the clip-path based on scrollFromTop', async () => {
    await wrapper.setProps({ scrollFromTop: 200 })
    const style = wrapper.attributes('style')
    expect(style).toContain('clip-path: polygon(')
  })
})
