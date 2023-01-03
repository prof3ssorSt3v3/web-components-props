/*
only properties that apply to text like font, color, line-height 
and text-align (among others) and visibility are inherited.
*/
const template = document.createElement('template');
template.innerHTML = `
    <style>
      :host{
        /* the shadow root */
        background-color: #333; /* default */
        color: white;
        display: block; /* critical */
      }
      ::slotted(h2){
        /* represents an h2 element that has been placed into a slot */
        font-weight: 300;
      }
      .root{
        position: relative;
        padding: 2rem;
      }
      .character{
        position: absolute;
        z-index: 10;
        top: -10rem;
        left: 0;
        font-size: 10rem;
        line-height:1;
        color: hsla(60, 50%, 80%, 0.32);
      }
      
    </style>
    <div class="root">
      <h1>Big Bang Theory</h1>
      <slot name="title">Default text if not title slot used in HTML</slot>
    </div>
`;

class BigBang extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'closed' });
    // shadowRoot shields the web component from external styling, mostly
    let clone = template.content.cloneNode(true);
    this.root.append(clone);
  }
}

customElements.define('big-bang', BigBang);
// <big-bang>
