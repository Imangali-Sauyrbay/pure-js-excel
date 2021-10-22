import { ExelComponent } from '@core/ExelComponent';

export class Toolbar extends ExelComponent {
  static className = 'excel__toolbar';
  constructor($root, options) {
    super($root, {
      name: 'ToolBar',
      ...options,
    });
  }
  toHTML() {
    return `
    <div class="button"><span class="material-icons">format_align_left</span></div>
    <div class="button"><span class="material-icons">format_align_center</span></div>
    <div class="button"><span class="material-icons">format_align_right</span></div>
    <div class="button"><span class="material-icons">format_align_justify</span></div>
    <div class="button"><span class="material-icons">format_bold</span></div>
    <div class="button"><span class="material-icons">format_italic</span></div>
    <div class="button"><span class="material-icons">format_underlined</span></div>
    <div class="button"><span class="material-icons">strikethrough_s</span></div>`;
  }
}
