import { IDataWidget, ISessionStoreDeclaration, useContentSessionStore } from '@/plugins/content/store';
import Hash from '@/utils/hash';

export default class WidgetModel<P = {}> implements IDataWidget<P> {

  public id = Hash.guid()
  public type = 'text'
  public children: WidgetModel<P>[] = []
  public props: P = {} as P

  private readonly parent: WidgetModel<P> | undefined
  private selected: boolean = false

  constructor(data: IDataWidget<P>, parent?: WidgetModel<P>) {
    this.assign(data);
    this.parent = parent;
  }

  get data(): any {
    return {
      id: this.id,
      type: this.type,
      children: this.children.map(child => child.data),
      props: this.props,
    };
  }

  get index(): number {
    if (this.parent === undefined) {
      return 0;
    }
    return this.parent.children.findIndex(widget => widget.id === this.id) || 0;
  }

  get root(): WidgetModel<P> | undefined {
    let protection = 0;
    let parent = this.parent;
    while (parent && parent.type !== 'root') {
      parent = parent.parent;
      protection++;
      if (protection > 50) {
        console.error('Unable to find root');
        return parent;
      }
    }
    return parent;
  }

  get next(): WidgetModel<P> | undefined {
    return this.parent?.children[this.index + 1];
  }

  get previous(): WidgetModel<P> | undefined {
    return this.parent?.children[this.index - 1];
  }

  assign(data?: IDataWidget<P>): void {
    Object.assign(this, data || {});
    this.children = this.children.map(children => new WidgetModel<P>(children, this));
  }

  clone(resetId = true): WidgetModel<P> {
    const clone = new WidgetModel<P>(JSON.parse(JSON.stringify(this.data)), this.parent);
    if (resetId) {
      clone.id = Hash.guid();
    }
    return clone;
  }

  select() {
    this.selected = true;
  }

  unselect() {
    this.selected = false;
  }

  toggleSelect() {
    this.selected = !this.selected;
  }

  isSelected(): boolean {
    return this.selected;
  }

  isRoot(): boolean {
    return this.type === 'root';
  }

  duplicate(): void {
    if (this.parent) {
      const clone = this.clone();
      this.parent.children.splice(this.index, 0, clone);
    }
  }

  remove(selectNext = false) {
    if (this.parent) {
      const nextWidget = this.next || this.previous || this.parent;
      this.parent.children.splice(this.index, 1);
      if (selectNext && nextWidget) {
        nextWidget.select();
      }
    }
  }

  // apply() {
  //   if (this.root) {
  //     const contentDataStore = useContentDataStore();
  //     contentDataStore.$patch(state => {
  //       if (this.root) {
  //         state.root = JSON.parse(JSON.stringify(this.root.data));
  //       }
  //     })
  //   }
  // }

  flat(): WidgetModel<P>[] {
    const models: WidgetModel<P>[] = [];
    function loop(children: WidgetModel<P>[]) {
      children.forEach(item => {
        models.push(item);
        if (item.children.length > 0) {
          loop(item.children);
        }
      })
    }
    loop(this.children);
    return models;
  }

  find(callback: (widget: WidgetModel<P>) => boolean): WidgetModel<P> | undefined {
    return this.flat().find(callback);
  }

  filter(callback: (widget: WidgetModel<P>) => void): WidgetModel<P>[] {
    return this.flat().filter(callback);
  }

  forEach(callback: (widget: WidgetModel<P>) => void): void {
    return this.flat().forEach(callback);
  }

  getDeclaration(): ISessionStoreDeclaration {
    const contentSessionStore = useContentSessionStore();
    const declaration = contentSessionStore.declarations.find(declaration => declaration.type === this.type);
    return declaration || { type: 'unknown', component: 'div' };
  }
}
