import { ApiClient } from "../lib/apiClient";
import { RegisterData, RegisterResponse } from "../lib/definitions";

// Register Service
const registerService = new ApiClient<RegisterResponse>("/register");

const useRegister = async (data: RegisterData) => {
  try {
    const response = await registerService.post(JSON.stringify(data), {
      is_forever_free: "true",
    });
    console.log(response); // save the response in state/local storage
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default useRegister;
