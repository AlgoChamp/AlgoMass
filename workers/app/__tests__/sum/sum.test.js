
describe('sum module tests',()=>{
    it('1,2 3', () => {
        expect(sum(1, 2)).toEqual(3);
      });
    it('-1,1 0', () => {
    expect(sum(-1, 1)).toEqual(0);
    });
    it('20,20 40', () => {
    expect(sum(20, 20)).toEqual(40);
    })
    it('0,\"NotANumber\" 0NotANumber', () => {
    expect(sum(0, 'NotANumber')).toEqual('0NotANumber');
    });
});

