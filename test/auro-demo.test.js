import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/auro-demo.js';

describe('auro-demo', () => {
  it('sets the CSS class on auro-demo > div element', async () => {
    const el = await fixture(html`
      <auro-demo cssclass="testClass"></auro-demo>
    `);

    const div = el.shadowRoot.querySelector('div');
    expect(div.className).to.equal('testClass');
  });

  it('auro-demo is accessible', async () => {
    const el = await fixture(html`
      <auro-demo cssclass="testClass"></auro-demo>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-demo custom element is defined', async () => {
    const el = await !!customElements.get("auro-demo");

    await expect(el).to.be.true;
  });
});
