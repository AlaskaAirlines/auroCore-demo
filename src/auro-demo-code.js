// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If use litElement base class
import { LitElement, html, css } from "lit-element";
import 'prismjs/prism.js';
import styleCss from "./code-style-css.js";

class AuroDemoCode extends LitElement {
  constructor() {
    super();
    this.language = "markup";
    this.theme = "/node_modules/prismjs/themes/prism.css";
  }

  static get properties() {
    return {
      language: { type: String },
      theme: { type: String },
      code: { type: String }
    }
  }

  async updated() {
    await this.loadLanguage();

    // strip the lead/end newlines so we don't look horrible
    let codeClean = this.code.replace(/^\s+|\s+$/gu, '');
    codeClean = codeClean.replace(/ class=""/gu, '');
    codeClean = codeClean.replace(/[=]""/gu, '');

    const highlight = Prism.highlight(codeClean, Prism.languages[this.language], this.language);

    // Set to our styled block
    this.shadowRoot.querySelector('#output').innerHTML = highlight;
  }

  async loadLanguage() {
    await import(`/node_modules/prismjs/components/prism-${this.language}.min.js`);
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }


  render() {
    return html`
    <link rel="stylesheet" href="${this.theme}">
    <pre class="language-${this.language}"><code id="output"></code></pre>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-demo-code")) {
  customElements.define("auro-demo-code", AuroDemoCode);
}