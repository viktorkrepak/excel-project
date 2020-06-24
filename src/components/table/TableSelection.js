export class TableSelection {
  static className = 'selected';
  constructor() {
    this.cellGroup = [];
    this.current = null;
  }

  selectCell($node) {
    this.clear();
    this.cellGroup.push($node);
    $node.focus().addClass(TableSelection.className);
    this.current = $node;
    console.log($node.getStyles(['fontWeight', 'fontStyle']));
  }

  clear() {
    for (const $cell of this.cellGroup) {
      $cell.removeClass(TableSelection.className);
    }
    this.cellGroup = [];
  }

  get selectedIds() {
    return this.cellGroup.map(element => element.id());
  }

  selectGroupCell($arrayOfNodes) {
    this.clear();
    for (const $node of $arrayOfNodes) {
      this.cellGroup.push($node);
      $node.addClass(TableSelection.className);
    }
  }
  applyStyle(style) {
    for (const element of this.cellGroup) {
      element.css(style);
    }
  }
}
