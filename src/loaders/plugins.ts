import { Mode } from '@/utils/enums';
import { usePlugin } from '@/composables/plugin';
import Settings, { ISettingsProps } from '@/plugins/settings/Settings.vue';
import Toolbar, { IToolbarProps } from '@/plugins/toolbar/Toolbar.vue';
import ButtonFullscreen from '@/plugins/toolbar/buttons/ButtonFullscreen.vue';
import ContextDrawer, { IContextDrawerProps } from '@/plugins/context-drawer/ContextDrawer.vue';
import ButtonContextDrawer from '@/plugins/context-drawer/buttons/ButtonContextDrawer.vue';
import StyleForm from '@/plugins/context-drawer/components/StyleForm.vue';
import TextForm from '@/plugins/context-drawer/components/TextForm.vue';
import LayerView from '@/plugins/context-drawer/components/LayerView.vue';
import ButtonSettings from '@/plugins/settings/buttons/ButtonSettings.vue';
import ShortcutList from '@/plugins/settings/components/ShortcutList.vue';
import SettingsGeneralForm from '@/views/SettingsGeneralForm.vue';
import Content, { IContentProps } from '@/plugins/content/Content.vue';
import ButtonContentSelect from '@/plugins/content/buttons/ButtonContentSelect.vue';
import ButtonContentLayout from '@/plugins/content/buttons/ButtonContentLayout.vue';
import ButtonContentUndo from '@/plugins/content/buttons/ButtonContentUndo.vue';
import ButtonContentRedo from '@/plugins/content/buttons/ButtonContentRedo.vue';
import ButtonContentSelectSet from '@/plugins/content/buttons/ButtonContentSelectSet.vue';
import ButtonContentLayoutSet from '@/plugins/content/buttons/ButtonContentLayoutSet.vue';
import ContentToolbar, { IContentToolbarProps } from '@/plugins/content-toolbar/ContentToolbar.vue';
import ButtonContentToolbar from '@/plugins/content-toolbar/buttons/ButtonContentToolbar.vue';
import WidgetDrawer, { IWidgetDrawerProps } from '@/plugins/widget-drawer/WidgetDrawer.vue';
import ButtonWidgetDrawer from '@/plugins/widget-drawer/buttons/ButtonWidgetDrawer.vue';
import ButtonContentViewMode from '@/plugins/content-toolbar/buttons/ButtonContentViewMode.vue';
import ButtonZoomInOutSelect from '@/plugins/content-toolbar/buttons/ButtonZoomInOutSelect.vue';
import PlugginWrapper, { IPlugginWrapperProps } from '@/components/PluginWrapper.vue';
import { IButton } from '@/utils/interfaces';
import { WidgetRow, WidgetColumn, WidgetText, WidgetImage, WidgetVideo } from '@/plugins/widget-drawer/widgets/index';
import { IDataWidget } from '@/plugins/content/store';
import { declareWidgets } from '@/plugins/content/composables';

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
      ButtonContentLayout,
      divider,
      ButtonContentUndo,
      ButtonContentRedo,
      divider,
      ButtonContentSelectSet,
      ButtonContentLayoutSet,
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
    }, {
      value: 'layer',
      label: 'Layers',
      component: LayerView,
    }]
  }
});

plugins.install<IPlugginWrapperProps<IContentProps>>({
  name: 'content',
  mode: [Mode.Edit, Mode.View],
  component: PlugginWrapper,
  category: 'root',
  props: {
    init: () => {
      declareWidgets([
        { type: 'row', component: WidgetRow },
        { type: 'column', component: WidgetColumn, onDrop: (data: IDataWidget, parent?: IDataWidget) => {
          if (parent && parent.type !== 'row') {
            data.type = 'row';
          }
        } },
        { type: 'text', component: WidgetText, props: {
          markup: { category: 'text', type: 'select', options: [
            { label: 'Heading 1', value: 'h1' },
            { label: 'Heading 2', value: 'h2' },
            { label: 'Heading 3', value: 'h3' },
            { label: 'Heading 4', value: 'h4' },
            { label: 'Heading 5', value: 'h5' },
            { label: 'Heading 6', value: 'h6' },
            { label: 'Paragraph', value: 'p' },
          ] }
        } },
        { type: 'image', component: WidgetImage },
        { type: 'video', component: WidgetVideo },
      ]);
      return {
        is: Content,
        props: {},
      }
    }
  }
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
      type: 'column',
      label: 'Column',
      icon: 'mdi-view-week',
      description: 'It utilizes flex properties to control the layout and flow of its inner columns.',
      category: 'Layout',
    }, {
      type: 'text',
      label: 'Text',
      icon: 'mdi-format-title',
      description: 'A versatile text widget capable of serving as a title or paragraph, with customizable styling using CSS.',
      category: 'Content',
    }, {
      type: 'image',
      label: 'Image',
      icon: 'mdi-image-outline',
      description: 'This widget allows users to seamlessly integrate images into their content, enriching the presentation and engaging viewers.',
      category: 'Content',
    }, {
      type: 'video',
      label: 'Video',
      icon: 'mdi-video-outline',
      description: 'This widget allows users to seamlessly embed video content such as tutorials, presentations, or promotional videos within their webpages or documents.',
      category: 'Content',
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
