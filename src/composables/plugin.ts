import { Component } from 'vue';
import { Mode } from '@/utils/enums';

export interface IPlugin<P> {
  name: string,
  mode: Mode | Mode[],
  component: string | Component,
  category: string | string[],
  props?: P,
  listeners?: {[key: string]: () => any},
}

const pluginList: IPlugin<any>[] = []

export function usePlugin() {

  function install<P>(plugin: IPlugin<P>): IPlugin<P> {
    const newPlugin: IPlugin<P> = {
      ...plugin,
    };
    pluginList.push(newPlugin);
    return newPlugin;
  }

  function getAll<P>(category?: string): IPlugin<P>[] {
    return pluginList.filter(plugin => {
      const categories = plugin.category
        ? Array.isArray(plugin.category) ? plugin.category : [plugin.category]
        : null;
      const modes = Array.isArray(plugin.mode) ? plugin.mode : [plugin.mode];
      return (!category || categories && categories.includes(category))
          && modes.includes(import.meta.env.MODE as Mode);
    });
  }

  return {
    install,
    getAll,
  }
}
