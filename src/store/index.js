const { useState } = require("react");

const obj = {
  name: 'ruixin',
  age: 24,
  detail: {
    info1: 'info1',
    info2: 'info2',
    deeperDetail: {
      deeperInfo1: '1',
      deeperInfo2: '2'
    },
    list: [1, 2, 3, 4]
  }
}

let lastTarget, lastProperty = null;
const mapTargetProp2Trigger = new Map();

const handler = {
  get(target, property) {
    lastTarget = target;
    lastProperty = property;

    return Reflect.get(...arguments);
  },

  set(target, property, val) {
    if (mapTargetProp2Trigger.has(target) && mapTargetProp2Trigger.get(target).has(property)) {
      setTimeout(() => {
        const callFuncs = mapTargetProp2Trigger.get(target).get(property);
        
        while (callFuncs.length > 0) {
          callFuncs.shift()();
        }
      });
    }


    if (typeof target[property] === 'object') {
      const proxied = proxify(val, handler);
      return Reflect.set(target, property, proxied);
    }
    return Reflect.set(...arguments);
  }
}

function proxify(obj) {
  const plainObj = {};
  const referenceObj = {};

  for (const key of Object.keys(obj)) {
    if (typeof obj[key] !== 'object') {
      plainObj[key] = obj[key];
    } else {
      referenceObj[key] = obj[key];
    }
  }

  const plainProxied = new Proxy(plainObj, handler);

  for (const key of Object.keys(referenceObj)) {
    referenceObj[key] = proxify(referenceObj[key]);
  }

  const res = new Proxy({
    ...plainProxied,
    ...referenceObj
  }, handler);

  return res;
}

export const proxiedObj = proxify(obj);

function connect(selectorFunc, triggerFunc) {
  const val = selectorFunc(proxiedObj);

  if (!mapTargetProp2Trigger.has(lastTarget)) {
    mapTargetProp2Trigger.set(lastTarget, new Map());
  }

  if (!mapTargetProp2Trigger.get(lastTarget).has(lastProperty)) {
    mapTargetProp2Trigger.get(lastTarget).set(lastProperty, []);
  }

  mapTargetProp2Trigger.get(lastTarget).get(lastProperty).push(triggerFunc);

  return val;
}


export function useConnector(selectorFunc) {
  const [, forceUpdate] = useState({});

  const val = connect(selectorFunc, () => {
    forceUpdate({});
  });

  return val;
}