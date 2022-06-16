const { useState, useEffect } = require("react");

function proxify(obj, handler) {
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
    referenceObj[key] = proxify(referenceObj[key], handler);
  }

  const res = new Proxy({
    ...plainProxied,
    ...referenceObj
  }, handler);


  return res;
}

const createHandler = (context) => {
  const res = {
    get(target, property) {
      context.lastTarget = target;
      context.lastProperty = property;

      
      return Reflect.get(...arguments);
    },
  
    set(target, property, val) {
      const { varReference } = context;

      if (varReference.has(target) && varReference.get(target).has(property)) {
        const callbackArr = varReference.get(target).get(property);
        while (callbackArr.length) {
          callbackArr.shift()();
        }
      } 
  
      if (typeof target[property] === 'object') {
        const proxied = proxify(val, res);
        return Reflect.set(target, property, proxied);
      }
      return Reflect.set(...arguments);
    }
  }

  return res;
}

function connect(context, selector, callback) {
  const val = selector(context.proxiedObj);
  const {
    varReference,
    lastTarget,
    lastProperty
  } = context;

  if (!varReference.has(lastTarget)) {
    varReference.set(context.lastTarget, new Map());
  }

  if (!varReference.get(lastTarget).has(lastProperty)) {
    varReference.get(lastTarget).set(lastProperty, []);
  }
  
  varReference.get(lastTarget).get(lastProperty).push(() => {
    callback();
  });

  return {
    value: val,
    disConnect: () => {
      const toDeleteIndex = varReference.get(lastTarget).get(lastProperty).indexOf(callback);
      varReference.get(lastTarget).get(lastProperty).splice(toDeleteIndex, 1);
    }
  };
}

function createContext(dataSource) {
  const context = {
    lastTarget: null,
    lastProperty: null,
    varReference: new Map(),
    proxiedObj: null
  };

  const handler = createHandler(context);
  const proxiedObj = proxify(dataSource, handler);

  context.proxiedObj = proxiedObj;

  return context;
}

export function createStore(dataSource) {
  const context = createContext(dataSource);
  function useConnector(selector) {
    const [, forceUpdate] = useState({});
    const { value, disConnect } = connect(context, selector, () => {
      forceUpdate({});
    });
    useEffect(() => disConnect, []);
    return value;
  }

  return {
    useConnector,
    proxied: context.proxiedObj
  }
  
}