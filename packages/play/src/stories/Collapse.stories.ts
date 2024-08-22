import type { Meta, StoryObj } from '@storybook/vue3'
import { LxxCollapse, LxxCollapseItem } from 'lxx-ui'
import 'lxx-ui/dist/theme/Collapse.css'

type Story = StoryObj<typeof LxxCollapse>

const meta: Meta<typeof LxxCollapse> = {
  title: 'Example/Collapse',
  component: LxxCollapse,
  subcomponents: { LxxCollapseItem },
  tags: ['autodocs'],
}

export const Default: Story = {
  render: (args) => ({
    components: {
      LxxCollapse,
      LxxCollapseItem,
    },
    setup() {
      return {
        args,
      }
    },
    template: `
    <lxx-collapse v-bind="args">
      <lxx-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </lxx-collapse-item>
      <lxx-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </lxx-collapse-item>
      <lxx-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </lxx-collapse-item>
    </lxx-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ['a'],
  },
}

export default meta
