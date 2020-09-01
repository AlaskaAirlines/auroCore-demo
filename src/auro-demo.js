/* eslint-disable arrow-body-style */
/* eslint-disable prefer-reflect */
/* eslint-disable no-console */
/* eslint-disable no-debugger */
// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If use litElement base class
import { LitElement, html, css } from "lit-element";
import '@alaskaairux/auro-header';

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
    this.childNodes = [];
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
      onDark: {
        type: Boolean,
        reflect: true
      },
      childNodes: { type: Array }
    };
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  toggleShowCode(event) {
    // debugger;
    this.showCode = !this.showCode;
  }

  toggleDarkMode(event) {
    this.onDark = !this.onDark;
    this.childNodes.forEach((node) => {
      if (node.nodeType == Node.ELEMENT_NODE) {
        console.log(node);
        if (this.onDark) {
          node.setAttribute("onDark", "");
        } else {
          node.removeAttribute("onDark");
        }
      }
    });
  }

  handleSlotchange(event) {
    this.childNodes = event.target.assignedNodes();

    this.code = Array.prototype.map.call(this.childNodes, (node) => {
      return node.outerHTML ? node.outerHTML : ''
    }).join('');
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="auro-demo">
        <auro-header display="400">${this.header}</auro-header>
        <div class="auro-demo--panel">
          <slot @slotchange=${this.handleSlotchange}></slot>
        </div>
        <div class="auro-demo--code" ?hidden=${!this.showCode}>${this.code}</div>
        <div class="auro-demo--footer">
          <button @click=${this.toggleShowCode}>Code</button>
          <button @click=${this.toggleDarkMode}>Light/Dark Mode</button>
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
