import { ApiClient } from "../lib/api-client";
import { SignInData, SignInResponse } from "../lib/definitions";

// Signin Service
const signInService = new ApiClient<SignInResponse>("/login");

const useSignIn = async (data: SignInData) => {
  try {
    const response = await signInService.post(JSON.stringify(data));
    console.log(response); // save the response in state/local storage
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default useSignIn;
