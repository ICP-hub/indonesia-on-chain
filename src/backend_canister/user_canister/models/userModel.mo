module {
  public type User = {
    id: Nat;
    username: Text;
    passwordHash: Text; // In practice, store a hash, not the actual password
  };
}
