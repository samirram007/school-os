import SignIn from '#/features/base-modules/auth/sign-in';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

const signInSearchSchema = z.object({
  redirect: z.string().optional().catch(''),
});

export const Route = createFileRoute('/_guest/sign-in')({
  validateSearch: (search) => signInSearchSchema.parse(search),
  beforeLoad: async ({ context, search }) => {
    // console.log(context, "context")
    if (context.auth?.user) {
      throw redirect({ to: search.redirect || '/dashboard' });
    }
  },
  component: () => <SignIn />,
});

