import { html, css } from "lit-element";
import { PageViewElement } from "./page-view-element.js";
import "./questions-wrapper";

class HomePage extends PageViewElement {
  static get styles() {
    return [css``];
  }

  render() {
    return html`
      <questions-wrapper></questions-wrapper>
    `;
  }
}

window.customElements.define("home-page", HomePage);
