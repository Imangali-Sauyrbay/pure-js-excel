function toButton(button) {
  const active = (button.active && ' active') || '';
  const meta = `
  data-type="button"
  data-value='${JSON.stringify(button.value)}'`;
  return /* html */`
  <div class="button${active}" ${meta}>
  <span class="material-icons" ${meta}>${button.icon}</span>
  </div>`;
}

export function createToolbar(state) {
  const isStateEqual = (key, val) => state[key] === val;
  const isStateEquals = (key, val) => {
    if (typeof state[key] === 'string') state[key] = state[key].split(' ');
    return state[key].includes(val);
  };

  const buttons = [
    {
      icon: 'format_align_left',
      active: isStateEqual('textAlign', 'left'),
      value: {textAlign: 'left'},
    },
    {
      icon: 'format_align_center',
      active: isStateEqual('textAlign', 'center'),
      value: {textAlign: 'center'},
    },
    {
      icon: 'format_align_right',
      active: isStateEqual('textAlign', 'right'),
      value: {textAlign: 'right'},
    },
    {
      icon: 'format_align_justify',
      active: isStateEqual('textAlign', 'justify'),
      value: {textAlign: 'justify'},
    },
    {
      icon: 'format_bold',
      active: isStateEqual('fontWeight', 'bold'),
      value: {fontWeight: isStateEqual('fontWeight', 'bold') ? 'normal' : 'bold'},
    },
    {
      icon: 'format_italic',
      active: isStateEqual('fontStyle', 'italic'),
      value: {fontStyle: isStateEqual('fontStyle', 'italic') ? 'normal' : 'italic'},
    },
    {
      icon: 'format_underlined',
      active: isStateEquals('textDecoration', 'underline'),
      value: {textDecoration: 'underline'},
    },
    {
      icon: 'strikethrough_s',
      active: isStateEquals('textDecoration', 'line-through'),
      value: {textDecoration: 'line-through'},
    },
  ];
  return buttons.map(toButton).join(' ');
}
