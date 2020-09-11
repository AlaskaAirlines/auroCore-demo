/* eslint-disable no-magic-numbers */
/* eslint-disable sort-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable one-var */
/* eslint-disable max-statements */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-reflect */
/* eslint-disable no-console */
/* eslint-disable no-debugger */
// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If use litElement base class
import { LitElement, html, css } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import './auro-demo-code';

// If using auroElement base class
// See instructions for importing auroElement base class https://git.io/JULq4
// import { html, css } from "lit-element";
// import AuroElement from '@alaskaairux/orion-web-core-style-sheets/dist/auroElement/auroElement';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * auro-demo provides users a way to ...
 *
 * @attr {String} header - Sets the header text for the demo widget.
 */

// build the component class
class AuroDemo extends LitElement {
  constructor() {
    super();
    this.showCode = false;
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      ...super.properties,
      header:   { type: String },
      showCode: {
        type: Boolean,
        reflect: true
      },
      darkMode: {
        type: Boolean,
        reflect: true
      },
      allowTextChange: {
        type: Boolean,
        reflect: true
      },
      allowIconChange: {
        type: Boolean,
        reflect: true
      },
      onDark: {
        type: Boolean
      },
      markdown: {
        attribute: false
      },
      variations: {
        type: Array
      },
      behaviors: {
        type: Array
      },
      svg: {
        type: String
      },
      demoElement: {
        type: Object
      },
      icon: {
        type: String
      },
      text: {
        type: String
      }
    };
  }

  async firstUpdated() {
    this.demoElement = this.shadowRoot.querySelector('#demoElements').assignedElements()[0];

    if (this.allowTextChange) {
      const textInput = this.shadowRoot.querySelector('#textContent');
      textInput.value = this.demoElement.innerHTML;
    }

    if (this.allowIconChange) {
      await this.updateIcon();
    }

    this.updateCode();
  }

  async updateIcon() {
    if (this.icon) {
      let svgIcon = await import(`../node_modules/@alaskaairux/icons/dist/icons/${this.icon}_es6.js`);
      this.svg = svgIcon.default.svg;
    }
  }

  updateCode() {
    this.markdown = this.demoElement.outerHTML;
  }

  toggleShowCode(event) {
    this.showCode = !this.showCode;
  }

  toggleDarkMode(event) {
    this.onDark = !this.onDark;
    if (this.onDark) {
      this.demoElement.setAttribute("onDark", "");
    } else {
      this.demoElement.removeAttribute("onDark");
    }
    this.updateCode();
  }

  variationChangeHandler(event) {
    this.variations.forEach((variation) => {
      this.demoElement.removeAttribute(variation);
      if (event.target.value !== "default") {
        this.demoElement.setAttribute(event.target.value, "");
      }
    });
    this.updateCode();
  }

  behaviorChangeHandler(event) {
    this.behaviors.forEach((behavior) => {
      this.demoElement.removeAttribute(behavior);
      if (event.target.value.includes("Icon")) {
        this.demoElement.setAttribute(event.target.value, this.svg);
      }
      else if (event.target.value !== "default") {
        this.demoElement.setAttribute(event.target.value, "");
      }
    });
    this.updateCode();
  }
  
  async iconInputChangeHandler(event) {
    this.icon = event.target.value;
    await this.updateIcon();
    const behavior = this.shadowRoot.querySelector('#behaviors').value;
    if (behavior.includes('Icon')) {
      this.demoElement.setAttribute(behavior, this.svg);
    }
    this.updateCode();
  }

  textContentChangeHandler(event) {
    this.demoElement.innerHTML = event.target.value;
    this.updateCode();
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const panelClasses = {
      'auro-demo--panel': true,
      'auro-demo--panelOndark': this.onDark
    }

    return html`
      <div class="auro-demo">
        <div class="auro-demo--selections">
          ${this.variations ? html`
          <div class="variations">
            <label for="variations">Variation</label>
            <select name="variations" id="variations" @change="${this.variationChangeHandler}">
              ${this.variations.map((variation) => html`
                <option value="${variation}">${variation}</option>
              `)}
            </select>
          </div>` : html``}
          ${this.allowIconChange ? html`
          <div class="icon">
            <label for="icon">Icon</label>
            <input type="text" id="icon" @change="${this.iconInputChangeHandler}" .value="${this.icon}"/>
          </div>
          ` : html``}
          ${this.allowTextChange ? html`
          <div class="textContent">
            <label for="textContent">Text</label>
            <input type="text" id="textContent" @change="${this.textContentChangeHandler}" .value="${this.text}"/>
          </div>
          ` : html``}
          ${this.behaviors ? html`
          <div class="behaviors">
            <label for="behaviors">Behavior</label>
            <select name="behaviors" id="behaviors" @change="${this.behaviorChangeHandler}">
              <option value="default">Default</option>
              ${this.behaviors.map((behavior) => html`
                <option value="${behavior}">${behavior}</option>
              `)}
            </select>
          </div>` : html``}
        </div>
        <div class="${classMap(panelClasses)}">
          <slot id="demoElements"></slot>
        </div>
        <div class="auro-demo--toggles">
          <button class="codeToggle" @click=${this.toggleShowCode}>Code</button>
          ${this.darkMode ? html`<button class="colorToggle" @click=${this.toggleDarkMode}>Light/Dark Mode</button>` : html``}
        </div>
        <div class="code-container" ?hidden=${!this.showCode}>
          <auro-demo-code code="${this.markdown}"></auro-demo-code>
        </div>
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-demo")) {
  customElements.define("auro-demo", AuroDemo);
}
