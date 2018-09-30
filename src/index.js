import translate from 'moji-translate';
import m from 'mithril';

import json from './emoji.json';

const root = document.body;

const toLowerCase = e => e.toLowerCase();

const markmoji = {
  search: '',
  onChange: ({ currentTarget }) => markmoji.search = currentTarget.value,
  onFiltrate: data => {
    const keys = Object.keys(data);
    if (markmoji.search) {
      return keys.filter(q => toLowerCase(q) === toLowerCase(markmoji.search))
    }
    return keys;
  },
  view: function () {
    return [
      m('input', { onchange: markmoji.onChange, placeholder: 'filtrate emoji' }),
      m('div', { class: 'b-flex' }, [
        markmoji.onFiltrate(json).length
          ? markmoji.onFiltrate(json).map(e => (
            m('p', { class: 'gitmoji-element' }, [
              m('span', translate.translate(e)),
              m('code', json[e])
            ])
          ))
          : m('p', { class: 'b-alert' }, 'emoji not found')
      ])
    ]
  }
}

m.mount(root, markmoji)
