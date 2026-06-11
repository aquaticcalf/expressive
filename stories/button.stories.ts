import type { StoryLiteMeta, StoryLiteStoryDefinition } from "@storylite/storylite"
import { Button } from "../web/button/button"

type ButtonArgs = {
  label: string
  variant: string
  size: string
  disabled: boolean
  toggle: boolean
  selected: boolean
}

export default {
  title: "Button",
  component: "xp-button",
  args: {
    label: "Button",
    variant: "filled",
    size: "md",
    disabled: false,
    toggle: false,
    selected: false,
  },
  argTypes: {
    label: { control: "text" },
    variant: {
      control: { type: "select" },
      options: ["filled", "tonal", "elevated", "outlined", "text"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    toggle: { control: "boolean" },
    selected: { control: "boolean" },
  },
  parameters: {
    renderer: "web-components",
    defineCustomElements: (win: Window) => {
      if (!win.customElements.get("xp-button")) {
        win.customElements.define("xp-button", Button as unknown as CustomElementConstructor)
      }
    },
  },
} satisfies StoryLiteMeta<ButtonArgs>

function render(args: ButtonArgs): string {
  const attrs = [
    `variant="${args.variant}"`,
    `size="${args.size}"`,
    args.disabled ? "disabled" : "",
    args.toggle ? "toggle" : "",
    args.selected ? "selected" : "",
  ]
    .filter(Boolean)
    .join(" ")
  return `<xp-button ${attrs}>${args.label}</xp-button>`
}

export const Filled: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "Filled",
  args: { variant: "filled", label: "Filled" },
  render,
}

export const Tonal: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "Tonal",
  args: { variant: "tonal", label: "Tonal" },
  render,
}

export const Elevated: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "Elevated",
  args: { variant: "elevated", label: "Elevated" },
  render,
}

export const Outlined: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "Outlined",
  args: { variant: "outlined", label: "Outlined" },
  render,
}

export const Text: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "Text",
  args: { variant: "text", label: "Text" },
  render,
}

export const Small: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "Small",
  args: { size: "sm", label: "Small" },
  render,
}

export const Large: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "Large",
  args: { size: "lg", label: "Large" },
  render,
}

export const Disabled: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "Disabled",
  args: { disabled: true, label: "Disabled" },
  render,
}

export const Toggle: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "Toggle",
  args: { toggle: true, selected: false, label: "Toggle" },
  render,
}

export const ToggleSelected: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "Toggle Selected",
  args: { toggle: true, selected: true, label: "Selected" },
  render,
}

export const WithIcon: StoryLiteStoryDefinition<ButtonArgs> = {
  name: "With Icon",
  args: { label: "Settings" },
  render: (args) => {
    const attrs = [
      `variant="${args.variant}"`,
      `size="${args.size}"`,
      args.disabled ? "disabled" : "",
      args.toggle ? "toggle" : "",
      args.selected ? "selected" : "",
    ]
      .filter(Boolean)
      .join(" ")
    return `<xp-button ${attrs}>
  ${args.label}
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
</xp-button>`
  },
}
