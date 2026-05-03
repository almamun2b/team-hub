/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BadgeCheck,
  Calendar,
  CheckCircle,
  Edit,
  Mail,
  Shield,
  User as UserIcon,
  XCircle,
} from "lucide-react";
import Link from "next/link";

interface ProfileContentProps {
  user: {
    id: string;
    email: string;
    fullName: string;
    avatar?: string;
    role: string;
    status: string;
    createdAt: string;
  };
}

export function ProfileContent({ user }: ProfileContentProps) {
  const formatDate = (date?: Date | string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "ADMIN":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "MEMBER":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "INACTIVE":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "BLOCKED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="bg-background mx-auto">
      {/* Header */}
      <div className="py-12 text-center">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">My Profile</h1>
          <p className="mt-4 text-muted-foreground">
            View and manage your account information
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="pb-16">
        <div className="container max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar ?? ""} />
                  <AvatarFallback className="text-xl">
                    {user.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <CardTitle>{user.fullName}</CardTitle>

                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>

                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/dashboard/profile/edit">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-6 sm:grid-cols-2">
                {/* Email */}
                <InfoItem icon={Mail} label="Email" value={user.email} />

                {/* Member Since */}
                <InfoItem
                  icon={Calendar}
                  label="Member Since"
                  value={formatDate(user.createdAt)}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <LabelWithIcon icon={Icon} label={label} />
      <p className="font-medium">{value}</p>
    </div>
  );
}

function LabelWithIcon({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
}

function TagList({
  icon: Icon,
  label,
  items = [],
}: {
  icon: any;
  label: string;
  items?: string[];
}) {
  return (
    <div className="space-y-1 sm:col-span-2">
      <LabelWithIcon icon={Icon} label={label} />
      <div className="flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => <Badge key={item}>{item}</Badge>)
        ) : (
          <span className="text-muted-foreground text-sm">None</span>
        )}
      </div>
    </div>
  );
}
