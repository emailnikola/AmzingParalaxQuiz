import { createTestingPinia } from '@pinia/testing'
import { VueWrapper, mount } from '@vue/test-utils'
import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach
} from 'vitest'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import QuizQuestion from '@/components/QuizQuestion.vue'

describe('QuizQuestion', () => {
  let wrapper: VueWrapper

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

  it('Should contain menu button', () => {
    const menuBtn = wrapper.find('[data-testid="apq-quiz-question"]')
    expect(menuBtn.exists()).toBe(true)
  })
})
