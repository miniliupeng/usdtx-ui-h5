export class MyLocalStorage {
  // 对象属性【对象的基本类型属性和对象的引用属性】
  // 静态属性【静态的基本类型属性和静态的引用属性】
  static localstorage: MyLocalStorage = new MyLocalStorage();
  private constructor() {
    // console.log('这是TS的单件设计模式的静态方法的构造器')
  }
  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public getItem<T>(key: string): T {
    let value = localStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  }
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
  public clear() {
    localStorage.clear();
  }
}
