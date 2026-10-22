import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeCart, deliveryCost } from "../src/lib/cart.ts";
test("rejects malformed local storage, unknown products and duplicate entries", () => {
  assert.deepEqual(sanitizeCart(null, { laptop: 4 }), []);
  assert.deepEqual(
    sanitizeCart(
      [
        { id: "unknown", quantity: 1 },
        { id: "laptop", quantity: -1 },
        { id: "laptop", quantity: 1.5 },
        { id: "laptop", quantity: 2 },
        { id: "laptop", quantity: 3 },
      ],
      { laptop: 4 },
    ),
    [{ id: "laptop", quantity: 2 }],
  );
});
test("caps restored quantities at available stock", () => {
  assert.deepEqual(
    sanitizeCart([{ id: "laptop", quantity: 100 }], { laptop: 4 }),
    [{ id: "laptop", quantity: 4 }],
  );
});
test("delivery respects threshold and digital-only orders", () => {
  assert.equal(deliveryCost(499999, true), 5000);
  assert.equal(deliveryCost(500000, true), 0);
  assert.equal(deliveryCost(38000, false), 0);
});
