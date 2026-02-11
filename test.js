function roleCheck(req, res, next) {
  const userRole = req.userRole;  // read from request

  if (userRole === "Sales Agent") {
    return 403; // Forbidden
  }

  return 200; // OK
}
describe("Role Check Middleware", () => {
  test("should return 403 for Sales Agent role", () => {
    const result = roleCheck({ userRole: "Sales Agent" }, {}, () => {});
    assert.strictEqual(result, 403);
  });

  test("should return 200 for Admin role", () => {
    const result = roleCheck({ userRole: "Admin" }, {}, () => {});
    assert.strictEqual(result, 200);
  });
});
