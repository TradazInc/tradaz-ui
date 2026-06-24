import { toaster } from "@/components/ui/toaster";
import { OrgRole, Role } from "@/entities/CustomSession";
import { authClient, AuthClient } from "@/lib/authClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { forbidden, unauthorized } from "next/navigation";
import { emailSignInSchema, emailSignUpSchema } from "./authSchema";

class AuthService {
  constructor(private readonly auth: AuthClient) {}

  async emailSignUp(formData: FormData, router: AppRouterInstance) {
    const form = Object.fromEntries(formData.entries());
    const { data, error } = emailSignUpSchema.safeParse(form);

    // validate form
    if (error)
      return toaster.create({
        title: error.issues[0].path,
        description: error.issues[0].message,
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
        title: error.issues[0].path,
        description: error.issues[0].message,
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

  async isAuthenticated(role: Role, orgRole?: OrgRole) {
    const { data: session } = await this.auth.getSession();

    if (!session) unauthorized();
    if (role !== session.user.role) forbidden();
    if (orgRole && orgRole !== session.member?.role) forbidden();

    return session;
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
      router.push("/overwatch");
    } else if (session.member?.role === OrgRole.customer) {
      router.push("/store");
    } else if (session.member?.role === OrgRole.vendor) {
      router.push("/vendor");
    } else {
      router.push("/business");
    }
  }
}

export const authService = new AuthService(authClient);
