import { Mode } from '@/utils/enums';
import { usePlugin } from '@/composables/plugin';
import Settings, { ISettingsProps } from '@/plugins/settings/Settings.vue';
import Toolbar, { IToolbarProps } from '@/plugins/toolbar/Toolbar.vue';
import ButtonFullscreen from '@/plugins/toolbar/ButtonFullscreen.vue';
import OptionDrawer, { IOptionDrawerProps } from '@/plugins/option-drawer/OptionDrawer.vue';
import ButtonOptionDrawer from '@/plugins/option-drawer/ButtonOptionDrawer.vue';
import StyleForm from '@/plugins/option-drawer/StyleForm.vue';
import TextForm from '@/plugins/option-drawer/TextForm.vue';
import ButtonSettings from '@/plugins/settings/ButtonSettings.vue';
import ShortcutList from '@/plugins/settings/ShortcutList.vue';
import GeneralForm, { ISettingsGeneralFormProps } from '@/plugins/settings/GeneralForm.vue';
import Content from '@/plugins/content/Content.vue';
import ContentToolbar, { IContentToolbarProps } from '@/plugins/content-toolbar/ContentToolbar.vue';
import ButtonContentToolbar from '@/plugins/content-toolbar/ButtonContentToolbar.vue';
import ComponentDrawer, { IComponentDrawerProps } from '@/plugins/component-drawer/ComponentDrawer.vue';
import ButtonComponentDrawer from '@/plugins/component-drawer/ButtonComponentDrawer.vue';
import WidgetText from '@/plugins/component-drawer/widgets/WidgetText.vue';
import WidgetImage from '@/plugins/component-drawer/widgets/WidgetImage.vue';
import WidgetVideo from '@/plugins/component-drawer/widgets/WidgetVideo.vue';
import ButtonContentViewMode from '@/plugins/content-toolbar/ButtonContentViewMode.vue';
import ButtonZoomInOutSelect from '@/plugins/content-toolbar/ButtonZoomInOutSelect.vue';
import { IButton } from '@/utils/interfaces';

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
      ButtonComponentDrawer,
      spacer,
      ButtonFullscreen,
      divider,
      ButtonContentToolbar,
      ButtonOptionDrawer,
      divider,
      ButtonSettings,
    ]
  },
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
      component: GeneralForm,
      props: <ISettingsGeneralFormProps>{
        fields: [{
          category: 'View',
          name: 'Grid view',
          component: ButtonFullscreen
        }],
      }
    }, {
      value: 'shortcuts',
      label: 'Shortcuts',
      component: ShortcutList,
    }]
  },
});

plugins.install<IOptionDrawerProps>({
  name: 'option-drawer',
  mode: Mode.Edit,
  component: OptionDrawer,
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

plugins.install<IComponentDrawerProps>({
  name: 'component-drawer',
  mode: Mode.Edit,
  component: ComponentDrawer,
  category: 'root',
  props: {
    widgets: [{
      category: 'General',
      name: 'Text',
      component: WidgetText,
    }, {
      category: 'Media',
      name: 'Image',
      component: WidgetImage,
    }, {
      category: 'Media',
      name: 'Video',
      component: WidgetVideo,
    }]
  }
});
