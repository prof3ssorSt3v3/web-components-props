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

  //define the allowed attributes
  static get observedAttributes() {
    return ['character', 'color'];
  }
  //
  //sync attributes with properties as you want
  get character() {
    return this.getAttribute('character');
  }
  set character(value) {
    this.setAttribute('character', value);
  }

  get color() {
    return this.getAttribute('color');
  }
  set color(value) {
    this.setAttribute('color', value);
  }
  //
  //handle values and changes to the attributes
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName.toLowerCase() === 'character') {
      const div = this.root.querySelector('.root');
      let p = div.querySelector('p')
        ? div.querySelector('p')
        : document.createElement('p');
      p.className = 'character';
      p.textContent = newVal;
      div.append(p);
    }
    console.log(attrName, newVal);
    if (attrName.toLowerCase() === 'color') {
      this.style.backgroundColor = newVal;
    }
  }
}

customElements.define('big-bang', BigBang);
// <big-bang>
