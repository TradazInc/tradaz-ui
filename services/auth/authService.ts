import { toaster } from "@/components/ui/toaster";
import { OrgRole, Role } from "@/entities/CustomSession";
import { authClient, AuthClient } from "@/lib/authClient";
import { emailSignInSchema, emailSignUpSchema } from "./authSchema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

class AuthService {
  constructor(private readonly auth: AuthClient) {}

  async emailSignUp(formData: FormData, router: AppRouterInstance) {
    const form = Object.fromEntries(formData.entries());
    const { data, error } = emailSignUpSchema.safeParse(form);

    // validate form
    if (error)
      return toaster.create({
        title: error.name,
        description: error.message,
        type: "error",
      });

    return this.auth.signUp.email(data, {
      onSuccess: async (ctx) => this.loginSuccess(router),
      onError: ({ error }) => {
        toaster.create({
          title: error.name,
          description: error.message,
          type: "error",
        });
      },
    });
  }

  async emailSignIn(formData: FormData, router: AppRouterInstance) {
    const form = Object.fromEntries(formData.entries());
    const { data, error } = emailSignInSchema.safeParse(form);

    // validate form
    if (error)
      return toaster.create({
        title: error.name,
        description: error.message,
        type: "error",
      });

    return this.auth.signIn.email(data, {
      onSuccess: async (ctx) => this.loginSuccess(router),
      onError: ({ error }) => {
        toaster.create({
          title: error.name,
          description: error.message,
          type: "error",
        });
      },
    });
  }

  async googleSignIn(router: AppRouterInstance) {
    return this.auth.signIn.social(
      { provider: "google" },
      {
        onSuccess: async (ctx) => this.loginSuccess(router),
        onError: ({ error }) => {
          toaster.create({
            title: error.name,
            description: error.message,
            type: "error",
          });
        },
      },
    );
  }

  private async loginSuccess(router: AppRouterInstance) {
    const { data: session, error } = await this.auth.getSession();

    if (error) {
      toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
      return;
    }

    // redirect to the dashboard
    if (session.user.role === Role.admin) {
      return router.push("/overwatch");
    }
    if (session.member?.role === OrgRole.customer) {
      return router.push("/store");
    }
    if (session.member?.role === OrgRole.vendor) {
      return router.push("/vendor");
    }
    router.push("/business");
  }
}

export const authService = new AuthService(authClient);
