import "./option-button.js";
import { LitElement, html, css } from "lit-element";

class XQuizzer extends LitElement {
  constructor() {
    super();
    this.countAnswers = 0;
    this.sampleData = [
      {
        id: "1",
        answers: {
          a: "Brown-headed Cowbird",
          b: "Savannah Sparrow",
          c: "American Robin",
          d: "Common Raven"
        },
        correctAnswer: "a"
      },
      {
        id: "2",
        answers: {
          a: "Brown-headed Cowbird",
          b: "Savannah Sparrow",
          c: "American Robin",
          d: "Common Raven"
        },
        correctAnswer: "c"
      },
      {
        id: "3",
        answers: {
          a: "Brown-headed Cowbird",
          b: "Savannah Sparrow",
          c: "American Robin",
          d: "Common Raven"
        },
        correctAnswer: "c"
      },
      {
        id: "4",
        answers: {
          a: "Brown-headed Cowbird",
          b: "Savannah Sparrow",
          c: "American Robin",
          d: "Common Raven"
        },
        correctAnswer: "c"
      }
    ];
  }

  static get properties() {
    return {
      countAnswers: { type: Number }
    };
  }

  static get styles() {
    return [
      css`
        .indicator {
          display: grid;
          grid-template-columns: 1fr 160px;
          grid-template-rows: 1fr;
          grid-template-areas: ". count";
        }
        .count {
          grid-area: count;
          text-align: right;
        }
        .options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 200px 200px;
          grid-gap: 16px;
          grid-template-areas:
            "a b"
            "c d";
        }
        .options > *:nth-of-type(1) {
          background-color: red;
          grid-area: a;
        }
        .options > *:nth-of-type(2) {
          grid-area: b;
        }
        .options > *:nth-of-type(3) {
          grid-area: c;
        }
        .options > *:nth-of-type(4) {
          grid-area: d;
        }
      `
    ];
  }

  _onClick() {
    this.countAnswers++;
  }

  render() {
    const answers = Object.values(this.sampleData[0].answers);

    return html`
      <div class="indicator">
        <p class="count">Questions Answered: ${this.countAnswers.toString()}</p>
      </div>

      <div class="options">
        ${
          answers.map(
            answer =>
              html`
                <option-button
                  text="${answer}"
                  @click="${this._onClick}"
                ></option-button>
              `
          )
        }
      </div>
    `;
  }
}

window.customElements.define("x-quizzer", XQuizzer);
