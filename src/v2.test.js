import V2 from "./v2"

test('the constructor should work', () => {
    expect(
        new V2(102,-21)
    ).toEqual({x:102,y:-21})
})

test('V2.create() should work', () => {
    expect(
        V2.create(1,1)
    ).toEqual({x:1,y:1})
})

test('V2.clone() should work', () => {
    let v1 = V2.create(1,1);
    let v2 = v1.clone();
    expect(
        v2
    ).toEqual(v1)

    expect(
        v2
    ).not.toBe(v1)
})

test("createByMagnitudeAndAngleShouldWork",() => {

    const v = V2.createByMagnitudeAndAngle(2,Math.PI / 2);
    console.log(v);

    expect(v.y).toBeCloseTo(2);
    expect(v.x).toBeCloseTo(0);

})
