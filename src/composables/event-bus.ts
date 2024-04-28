export interface IEventBusAction {
  unsubscribe: () => void,
  callback: (data?: any) => void,
}

const events: { [key: string]: IEventBusAction[] } = {};

export function useEventBus() {

  function emit(name: string, data?: any) {
    events[name] && events[name].forEach(event => {
      event.callback(data);
    });
  }

  function subscribe(name: string, callback: (data: any) => void): IEventBusAction {
    if (!events[name]) {
      events[name] = [];
    }
    const event: IEventBusAction = {
      unsubscribe: () => {
        const index = events[name].findIndex(item => item === event);
        if (index !== -1) {
          events[name].splice(index, 1);
        }
      },
      callback,
    }
    events[name].push(event);
    return event;
  }

  return {
    emit,
    subscribe,
  }
}
