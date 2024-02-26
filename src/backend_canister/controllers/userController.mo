import UserService "../services/userService";

module {
  public func signUp(username: Text, password: Text): async Bool {
    return await UserService.createUser(username, password);
  };

  public func login(username: Text, password: Text): async Bool {
    return await UserService.validateUser(username, password);
  };
}
