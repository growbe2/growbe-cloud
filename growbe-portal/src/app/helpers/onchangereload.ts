


export interface OnChangeReload {
  reload(): void;
}

export function ChangeReload() {
  function t(target: OnChangeReload, propertyKey: string) {
    //want to test y value > x value
    Object.defineProperty(target, propertyKey, {
      set: function(this: OnChangeReload & any, newVal) {
          if (this._x !== newVal) {
            this._x = newVal;
            this.reload();
          }
      },
      get: function() {
        return this._x;
      }
    });
  };
  return t;
}







