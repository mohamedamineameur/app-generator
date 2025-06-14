
  import User from "../../models/user.model";
  
  
  interface UserOverrides {
  
  }
  
  export const createUserFixture = async (overrides: UserOverrides = {}) => {
  
    const user = await User.create({
    });
  
    return user;
  };
  