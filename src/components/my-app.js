import { LitElement, html, css } from "lit-element";
import { setPassiveTouchGestures } from "@polymer/polymer/lib/utils/settings.js";
import { connect } from "pwa-helpers/connect-mixin.js";
import { installMediaQueryWatcher } from "pwa-helpers/media-query.js";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installRouter } from "pwa-helpers/router.js";
import { updateMetadata } from "pwa-helpers/metadata.js";

// This element is connected to the Redux store.
import { store } from "../store.js";

// These are the actions needed by this element.
import { navigate, updateOffline } from "../actions/app.js";

// These are the elements needed by this element.
import "@polymer/app-layout/app-scroll-effects/effects/waterfall.js";

class MyApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _offline: { type: Boolean }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          grid-template-columns: 1fr;
          grid-template-rows: 60px 1fr;
          grid-template-areas: "header" "main";
          height: 100vh;
        }

        header {
          align-items: center;
          background-color: #333399;
          color: #fff;
          display: flex;
          grid-area: header;
          justify-content: center;
        }

        h1 {
          font-weight: normal;
          margin: 0;
        }

        nav {
          grid-area: nav;
          background-color: lightgrey;
        }

        main {
          grid-area: main;
          padding: 8px;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }
      `
    ];
  }

  render() {
    return html`
      <header>
        <h1>Birdsong Quizzer</h1>
      </header>
      <main role="main">
        <home-page class="page" ?active="${this._page === "view1"}"></home-page>
      </main>
    `;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter(location =>
      store.dispatch(navigate(decodeURIComponent(location.pathname)))
    );
    installOfflineWatcher(offline => store.dispatch(updateOffline(offline)));
  }

  updated(changedProps) {
    if (changedProps.has("_page")) {
      const pageTitle = this.appTitle + " - " + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
  }
}

window.customElements.define("my-app", MyApp);
