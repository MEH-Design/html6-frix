let data = document.currentScript.dataset;
const path = {
  organism : data.orgm || data.organisms || 'organisms',
  molecule : data.mol  || data.molecules || 'molecules',
  atom     : data.at   || data.atoms     || 'atoms'
};

class Unit extends HTMLElement {

  constructor(type) {
    super();
    this.path = path[type];
    this.name = this.getAttribute('name');
    this.createShadowDom();
  }

  createShadowDom() {
    let shadowRoot = this.attachShadow({mode: 'open'});
    const doc = document
      .querySelector(`link[href="${this.path}/${this.name}.html"]`)
      .import;
    const t = doc.querySelector('template');
    const instance = t.content.cloneNode(true);
    shadowRoot.appendChild(instance);
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
window.customElements.define('frix-atom'    , Atom);
