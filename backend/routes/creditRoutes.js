router.post("/credit", protect(["Manager", "SalesAgent"]), recordCredit);
