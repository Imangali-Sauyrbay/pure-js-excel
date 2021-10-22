import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();

  const type = event.target.dataset.resize;
  const resizerProp = type === 'col' ? 'bottom' : 'right';
  const id = $parent.data.col;

  let value;

  $resizer.css({
    opacity: 1,
    [resizerProp]: '-5000px',
  });

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: -delta + 'px'});
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({bottom: -delta + 'px'});
    }
  };

  document.onmouseup = (e) => {
    value = value >= 0 ? value : 1;
    if (type === 'col') {
      $parent.css({width: value + 'px'});
      $root.queryAll(`[data-col="${id}"]`)
          .forEach((el) => el.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'});
    }
    $resizer.removeAttr('style');
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
