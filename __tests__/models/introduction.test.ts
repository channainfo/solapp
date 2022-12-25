import { describe, expect, it } from "@jest/globals";
import Introduction from "../../models/introduction";

describe('Introduction', () => {
  it('contructor', () => {
    let intro = new Introduction('Joe', 'Says hello!')
    expect(3).toEqual(3)

    expect(intro.name).toEqual('Joe')
    expect(intro.message).toEqual('Says hello!')
  })
})