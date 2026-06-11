import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { live } from "lit/directives/live.js"
import type { ButtonVariant } from "./variant"
import type { ButtonSize } from "./size"

@customElement("xp-button")
export class Button extends LitElement {
  createRenderRoot() {
    return this
  }

  @property() variant: ButtonVariant = "filled"
  @property() size: ButtonSize = "md"
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) toggle = false
  @property({ type: Boolean }) selected = false
  @property() type: "button" | "submit" | "reset" = "button"
  @property() href?: string
  @property() target?: string
  @property() rel?: string
  @property() download?: string
  @property() name?: string
  @property() value?: string

  #handleClick = () => {
    if (this.disabled) return

    if (this.toggle) {
      const prevent = !this.dispatchEvent(
        new Event("beforeinput", { bubbles: true, cancelable: true }),
      )
      if (prevent) return

      this.selected = !this.selected

      this.dispatchEvent(new Event("input", { bubbles: true }))
      this.dispatchEvent(new Event("change", { bubbles: true }))
    }
  }

  #variant(): string {
    const v: Record<ButtonVariant, string> = {
      filled:
        "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600 active:bg-blue-800",
      tonal:
        "bg-blue-100 text-blue-700 hover:bg-blue-200 focus-visible:ring-blue-400 active:bg-blue-300",
      elevated:
        "bg-white text-gray-800 shadow-xs hover:shadow-sm focus-visible:ring-gray-400 active:shadow-xs",
      outlined:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400 active:bg-gray-100",
      text: "text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-400 active:bg-blue-100",
    }

    return v[this.variant]
  }

  #variantSelected(): string {
    const v: Record<ButtonVariant, string> = {
      filled: "bg-blue-800 text-white hover:bg-blue-900",
      tonal: "bg-blue-200 text-blue-800 hover:bg-blue-300",
      elevated: "bg-gray-100 text-gray-900 shadow-xs",
      outlined: "border-blue-600 bg-blue-50 text-blue-700",
      text: "bg-blue-100 text-blue-700",
    }

    return v[this.variant]
  }

  #size(): string {
    const s: Record<ButtonSize, string> = {
      sm: "px-3 py-1.5 text-sm gap-1 rounded-md min-h-8",
      md: "px-4 py-2 text-sm gap-1.5 rounded-lg min-h-10",
      lg: "px-6 py-3 text-base gap-2 rounded-xl min-h-12",
    }

    return s[this.size]
  }

  render() {
    const classes = classMap({
      "inline-flex items-center justify-center relative select-none": true,
      "font-medium transition-colors duration-150": true,
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2": true,
      "disabled:pointer-events-none disabled:opacity-50": true,
      "cursor-pointer": !this.disabled,
      [this.#variant()]: !this.toggle || !this.selected,
      [this.#variantSelected()]: this.toggle && this.selected,
      [this.#size()]: true,
    })

    const link = this.href !== undefined

    const content = html`
      <slot
        name="selected-icon"
        class="${classMap({ hidden: !this.toggle || !this.selected })}"
      ></slot>
      <slot name="icon" class="${classMap({ hidden: this.toggle && this.selected })}"></slot>
      <span class="truncate overflow-hidden text-ellipsis whitespace-nowrap">
        <slot name="selected" ?hidden=${!this.toggle || !this.selected}></slot>
        <slot ?hidden=${this.toggle && this.selected}></slot>
      </span>
      <slot name="trailing-icon"></slot>
    `

    if (link) {
      return html`
        <a
          class=${classes}
          href=${live(this.href!)}
          target=${ifDefined(this.target)}
          rel=${ifDefined(this.rel)}
          download=${ifDefined(this.download)}
          @click=${this.#handleClick}
        >
          ${content}
        </a>
      `
    }

    return html`
      <button
        class=${classes}
        ?disabled=${this.disabled}
        type=${this.type}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        ?aria-pressed=${this.toggle ? this.selected : undefined}
        @click=${this.#handleClick}
      >
        ${content}
      </button>
    `
  }
}
