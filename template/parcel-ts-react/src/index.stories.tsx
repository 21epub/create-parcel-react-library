import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { ExampleComponent } from '.'

export default {
  title: 'ExampleComponent',
  component: ExampleComponent,
  argTypes: {
    text: { text: 'Create React TS Parcel Library Example in storybook 😄' }
  }
} as Meta

const Template: Story<{ text: string }> = (args) => (
  <ExampleComponent {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  text: 'This is a example'
}
