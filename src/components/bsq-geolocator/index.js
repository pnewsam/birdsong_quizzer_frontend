import { LitElement, html } from "lit-element";
import geolocatorStyles from "./styles";
import { store } from "../../store";
import { updateGeolocation } from "../../actions/geolocation";

class Geolocator extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return [geolocatorStyles];
  }

  _getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._logPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  _logPosition(position) {
    const payload = {
      position: {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
    };
    store.dispatch(updateGeolocation(payload));
  }

  render() {
    this._getLocation();
    return html`
      <div></div>
    `;
  }
}

window.customElements.define("bsq-geolocator", Geolocator);
