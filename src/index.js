import '@styles/main.scss';
console.log('hello world');

/**
 *Just test
 */
class R {
    static s = 'ssss';
    getStatic = async () => {
      return await Promise.resolve( R.s);
    }
}
new R().getStatic().then((data) => console.log(data));
new R().getStatic().then((data) => console.log(data));
