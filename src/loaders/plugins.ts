import { Mode } from '@/utils/enums';
import { usePlugin } from '@/composables/plugin';
import Settings, { ISettingsProps } from '@/plugins/settings/Settings.vue';
import Toolbar, { IToolbarProps } from '@/plugins/toolbar/Toolbar.vue';
import ButtonFullscreen from '@/plugins/toolbar/ButtonFullscreen.vue';
import ContextDrawer, { IContextDrawerProps } from '@/plugins/context-drawer/ContextDrawer.vue';
import ButtonContextDrawer from '@/plugins/context-drawer/ButtonContextDrawer.vue';
import StyleForm from '@/plugins/context-drawer/StyleForm.vue';
import TextForm from '@/plugins/context-drawer/TextForm.vue';
import ButtonSettings from '@/plugins/settings/ButtonSettings.vue';
import ShortcutList from '@/plugins/settings/ShortcutList.vue';
import SettingsGeneralForm from '@/views/SettingsGeneralForm.vue';
import Content from '@/plugins/content/Content.vue';
import ButtonContentSelect from '@/plugins/content/ButtonContentSelect.vue';
import ButtonContentDrag from '@/plugins/content/ButtonContentDrag.vue';
import ContentToolbar, { IContentToolbarProps } from '@/plugins/content-toolbar/ContentToolbar.vue';
import ButtonContentToolbar from '@/plugins/content-toolbar/ButtonContentToolbar.vue';
import WidgetDrawer, { IWidgetDrawerProps } from '@/plugins/widget-drawer/WidgetDrawer.vue';
import ButtonWidgetDrawer from '@/plugins/widget-drawer/ButtonWidgetDrawer.vue';
import ButtonContentViewMode from '@/plugins/content-toolbar/ButtonContentViewMode.vue';
import ButtonZoomInOutSelect from '@/plugins/content-toolbar/ButtonZoomInOutSelect.vue';
import { IButton } from '@/utils/interfaces';
import { WidgetColumn, WidgetVideo, WidgetText, WidgetImage } from '@/plugins/widget-drawer/widgets/index';

const spacer: IButton<any> = { spacer: true };
const divider: IButton<any> = { divider: true };

const plugins = usePlugin();
plugins.install<IToolbarProps>({
  name: 'toolbar',
  mode: Mode.Edit,
  component: Toolbar,
  category: 'root',
  props: {
    buttons: [
      ButtonWidgetDrawer,
      divider,
      ButtonContentSelect,
      ButtonContentDrag,
      spacer,
      ButtonFullscreen,
      divider,
      ButtonContentToolbar,
      ButtonContextDrawer,
      divider,
      ButtonSettings,
    ]
  },
});

plugins.install<IContextDrawerProps>({
  name: 'context-drawer',
  mode: Mode.Edit,
  component: ContextDrawer,
  category: 'root',
  props: {
    tabs: [{
      value: 'style',
      label: 'Style',
      component: StyleForm,
    }, {
      value: 'text',
      label: 'Text',
      component: TextForm,
    }]
  }
});

plugins.install({
  name: 'content',
  mode: [Mode.Edit, Mode.View],
  component: Content,
  category: 'root',
});

plugins.install<IContentToolbarProps>({
  name: 'content-toolbar',
  mode: Mode.Edit,
  component: ContentToolbar,
  category: 'content.append',
  props: {
    buttons: [
      ButtonContentViewMode,
      spacer,
      ButtonZoomInOutSelect,
    ]
  }
});

plugins.install<IWidgetDrawerProps>({
  name: 'widget-drawer',
  mode: Mode.Edit,
  component: WidgetDrawer,
  category: 'root',
  props: {
    widgets: [{
      category: 'Layout',
      name: 'Column',
      icon: 'mdi-view-week',
      description: 'It utilizes flex properties to control the layout and flow of its inner columns.',
      component: WidgetColumn,
    }]
  }
});

plugins.install<ISettingsProps>({
  name: 'settings',
  mode: Mode.Edit,
  component: Settings,
  category: 'root',
  props: {
    tabs: [{
      value: 'general',
      label: 'General',
      component: SettingsGeneralForm,
    }, {
      value: 'shortcuts',
      label: 'Shortcuts',
      component: ShortcutList,
    }]
  },
});
