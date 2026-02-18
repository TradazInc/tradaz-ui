import { ApiClient } from "../lib/api-client"; 

import { RegisterData, RegisterResponse } from "../lib/definitions";


const registerService = new ApiClient<RegisterResponse>("/register");

const useRegister = async (data: RegisterData) => {
  try {
    const response = await registerService.post(JSON.stringify(data), {
      is_forever_free: "true",
    });
    console.log(response); 
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default useRegister;