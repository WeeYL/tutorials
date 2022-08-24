// decorator

  export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const orginalDec = descriptor.value;
    const newDec: PropertyDescriptor = {
      configurable: true,
      get() {
        return orginalDec.bind(this);
      },
    };
    //   console.log('orginalDec: \n',orginalDec);
    //   console.log('new dec:\n',newDec)
    return newDec;
  }

