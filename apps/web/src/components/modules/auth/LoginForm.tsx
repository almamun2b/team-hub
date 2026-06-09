"use client";

import { loginAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

const demoUsers = [
  { label: "Admin", email: "admin@gmail.com", password: "Password1$" },
  { label: "User", email: "user@gmail.com", password: "Password1$" },
];

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function fillDemoUser(user: (typeof demoUsers)[number]) {
    setEmail(user.email);
    setPassword(user.password);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your workspaces.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {state?.error && (
            <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md">
              {state.error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="space-y-3 rounded-md border bg-muted/30 p-3">
            <div className="space-x-1">
              <span className="text-sm font-medium">
                Demo users for testing
              </span>
              <span className="text-xs text-muted-foreground">
                ( Click to fill form )
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map((user) => (
                <Button
                  key={user.email}
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fillDemoUser(user)}
                >
                  {user.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mt-4">
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
