let data = document.currentScript.dataset;
const path = {
  organism: data.orgm || data.organisms || 'organisms',
  molecule: data.mol || data.molecules || 'molecules',
  atom: data.at || data.atoms || 'atoms',
};

class Unit extends HTMLElement {

  constructor(type) {
    super();
    this.path = path[type];
    this.type = this.getAttribute('type');
    this.content = this.getScopedContent();
    this.createShadowDom();
  }

  createShadowDom() {
    let shadowRoot = this.attachShadow({mode: 'open'});
    const doc = document
      .querySelector(`link[href="${this.path}/${this.type}.html"]`)
      .import;
    const t = doc.querySelector('template');
    // TODO: do this with keva
    Object.keys(this.content).forEach((key) => {
      if(typeof key !== 'string') return;
      t.content.querySelectorAll(`*[data-name=${key}]`).forEach((element) => {
        element.textContent = this.content[key];
      });
    });
    const instance = t.content.cloneNode(true);
    shadowRoot.appendChild(instance);
  }

  getScopedContent() {
    let current = this;
    let tags = [];
    while(current) {
      tags.push(current);
      current = current.getRootNode().host;
    }
    tags = tags.reverse();
    let scopedContent = content;
    tags.forEach((tag) => {
      scopedContent = scopedContent[tag.getAttribute('type')];
    });
    return scopedContent;
  }
}

class Organism extends Unit {
  constructor() {
    super('organism');
  }
}

class Molecule extends Unit {
  constructor() {
    super('molecule');
  }
}

class Atom extends Unit {
  constructor() {
    super('atom');
  }
}

window.customElements.define('frix-organism', Organism);
window.customElements.define('frix-molecule', Molecule);
window.customElements.define('frix-atom', Atom);
