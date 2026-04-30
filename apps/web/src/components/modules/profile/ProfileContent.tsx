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
  Globe,
  Mail,
  MapPin,
  Phone,
  Shield,
  User as UserIcon,
  XCircle,
} from "lucide-react";
import Link from "next/link";

interface ProfileContentProps {
  user: any;
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
      case "USER":
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
      case "BLOCK":
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

                  {user.hasVerifiedBadge && (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      <BadgeCheck className="h-4 w-4 mr-1" />
                      Verified Badge
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/profile/edit">
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

                {/* Phone */}
                <InfoItem
                  icon={Phone}
                  label="Contact Number"
                  value={user.contactNumber || "Not provided"}
                />

                {/* Location */}
                <InfoItem
                  icon={MapPin}
                  label="Current Location"
                  value={user.currentLocation || "Not provided"}
                />

                {/* Verification */}
                <div className="space-y-1">
                  <LabelWithIcon
                    icon={user.isVerified ? CheckCircle : XCircle}
                    label="Email Verification"
                  />
                  <div className="flex items-center gap-2">
                    {user.isVerified ? (
                      <span className="text-green-600 font-medium">
                        Verified
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Not Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="sm:col-span-2 space-y-1">
                  <LabelWithIcon icon={UserIcon} label="Bio" />
                  <p className="text-muted-foreground">
                    {user.bio || "No bio provided"}
                  </p>
                </div>
                {/* Bio */}
                <div className="sm:col-span-2 space-y-1">
                  <LabelWithIcon icon={UserIcon} label="DateOfBirth" />
                  <p className="text-muted-foreground">
                    {user?.dateOfBirth
                      ? formatDate(user.dateOfBirth)
                      : "No provided"}
                  </p>
                </div>

                {/* Travel Interests */}
                <TagList
                  icon={Globe}
                  label="Travel Interests"
                  items={user.travelInterests}
                />

                {/* Visited Countries */}
                <TagList
                  icon={MapPin}
                  label="Visited Countries"
                  items={user.visitedCountries}
                />

                {/* Subscription */}
                {user.subscription && (
                  <div className="sm:col-span-2 space-y-2">
                    <LabelWithIcon icon={Shield} label="Subscription" />
                    <div className="flex flex-wrap gap-2">
                      <Badge>{user.subscription.plan}</Badge>
                      <Badge
                        className={getStatusColor(user.subscription.status)}
                      >
                        {user.subscription.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(user.subscription.startDate)} →{" "}
                      {formatDate(user.subscription.endDate)}
                    </p>
                  </div>
                )}

                {/* Dates */}
                <InfoItem
                  icon={Calendar}
                  label="Member Since"
                  value={formatDate(user.createdAt)}
                />

                <InfoItem
                  icon={Calendar}
                  label="Last Updated"
                  value={formatDate(user.updatedAt)}
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
