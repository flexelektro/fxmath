import {V2,v2} from 'src/v2';

describe('create V2 vector', () => {
   let v2 = new V2(1,2);
    it('should create a V2 vector', () => {
        expect(v2.x).toBe(1);
        expect(v2.y).toBe(2);
    });
});