import translate from 'moji-translate';
import m from 'mithril';

import json from './emoji.json';

const root = document.body;

const toLowerCase = e => e.toLowerCase();

const copyTextToClipboard = text => new Promise((resolve) => {
  const copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.blur();
  document.body.removeChild(copyFrom);
  resolve();
});

const markmoji = {
  search: '',
  showInfo: false,

  onToggleInformer: () => markmoji.showInfo = !markmoji.showInfo,

  onCopy: text => {
    markmoji.onToggleInformer();
    copyTextToClipboard(text).then(() => {
      setTimeout(() => {
        markmoji.onToggleInformer();
        m.redraw(markmoji);
      }, 3000)
    });
  },

  onChange: ({ currentTarget }) => markmoji.search = currentTarget.value,

  onFiltrate: data => {
    const keys = Object.keys(data);
    if (markmoji.search) {
      return keys.filter(q => toLowerCase(q).search(toLowerCase(markmoji.search)) !== -1)
    }
    return keys;
  },

  view: function () {
    return [
      m('input', { onchange: markmoji.onChange, placeholder: 'filtrate emoji' }),
      m('div', { class: `b-alert js-alert is-success ${markmoji.showInfo ? 'is-show' : ''}` }, 'copied'),
      m('div', { class: 'b-flex' }, [
        markmoji.onFiltrate(json).length
          ? markmoji.onFiltrate(json).map(e => (
            m('p', { class: 'gitmoji-element', onclick: () => markmoji.onCopy(json[e]) }, [
              m('span', translate.translate(e)),
              m('code', json[e])
            ])
          ))
          : m('p', { class: 'b-error' }, 'emoji not found')
      ])
    ]
  }
}

m.mount(root, markmoji)
