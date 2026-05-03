# Clean Up Frontend & Implement User/Profile Dashboard

The existing frontend was built for a "Travel Buddy" app. The backend is now a **Collaborative Team Hub**. This plan removes all travel-related dead code, removes unimplemented auth features (forgot/reset password, verify-email, change-password), cleans up unused user services, and updates the dashboard + profile sections to match the actual backend API.

## Backend API Summary (What Actually Exists)

### Auth Routes (`/api/v1/auth/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Email/password registration |
| POST | `/login` | Login, returns tokens |
| POST | `/refresh-token` | Refresh access token |
| POST | `/logout` | Clear cookies |
| GET | `/me` | Get current user profile |
| PATCH | `/me` | Update name/avatar (with file upload) |

### User Routes (`/api/v1/users/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/me` | Get own profile |
| PATCH | `/update-me` | Update own profile (with file upload) |

### User Model (Prisma)
Fields: `id`, `email`, `password`, `fullName`, `avatar`, `role`, `status`, `isVerified`, `isDeleted`, `createdAt`, `updatedAt`

> [!IMPORTANT]
> The backend has **no** forgot-password, reset-password, verify-email, change-password, dashboard-stats, top-travelers, create-admin, get-user-by-id, delete-user, update-status, or any travel-plan endpoints. All frontend code calling these must be removed.

---

## Proposed Changes

### 1. Delete Unnecessary Auth Routes & Components

#### [DELETE] [forgot-password/](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/app/(auth)/forgot-password)
#### [DELETE] [reset-password/](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/app/(auth)/reset-password)
#### [DELETE] [verify-email/](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/app/(auth)/verify-email)
#### [DELETE] [VerifyEmailForm.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/auth/VerifyEmailForm.tsx)
#### [DELETE] [ChangePasswordForm.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/profile/ChangePasswordForm.tsx)

---

### 2. Delete Unnecessary Services

#### Auth Services to Delete
#### [DELETE] [verifyEmail.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/auth/verifyEmail.ts)
#### [DELETE] [changePassword.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/auth/changePassword.ts)
#### [DELETE] [logout.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/auth/logout.ts)
- `logout.ts` imports from the deleted `tokenHandlers.ts`. Logout is already handled by `auth.actions.ts` → `AuthService.logout()`. This old service is an orphaned duplicate.

#### User Services to Delete (all except `updateMyProfile.ts`)
#### [DELETE] [dashboardStats.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/user/dashboardStats.ts)
#### [DELETE] [getTopTravelers.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/user/getTopTravelers.ts)
#### [DELETE] [getUserByIdAdmin.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/user/getUserByIdAdmin.ts)
#### [DELETE] [updateStatus.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/user/updateStatus.ts)
#### [DELETE] [deleteUser.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/user/deleteUser.ts)
#### [DELETE] [createAdmin.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/user/createAdmin.ts)

---

### 3. Delete Travel-Related & Old Admin Components

#### [DELETE] [TravelerCard.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/user/TravelerCard.tsx)
#### [DELETE] [UsersTable.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/user/UsersTable.tsx)
#### [DELETE] [ViewUserModal.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/user/ViewUserModal.tsx)
#### [DELETE] [EditUserModal.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/user/EditUserModal.tsx)
#### [DELETE] [DeleteUserModal.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/user/DeleteUserModal.tsx)
#### [DELETE] [CreateAdminModal.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/user/CreateAdminModal.tsx)

#### Home Page Travel Components to Delete
#### [DELETE] [TopRatedTravelersSection.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/home/TopRatedTravelersSection.tsx)
#### [DELETE] [PopularDestinationsSection.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/home/PopularDestinationsSection.tsx)
#### [DELETE] [TravelCategoriesSection.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/home/TravelCategoriesSection.tsx)
#### [DELETE] [CTASection.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/home/CTASection.tsx)
#### [DELETE] [HeroSection.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/home/HeroSection.tsx)
#### [DELETE] [HowItWorksSection.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/home/HowItWorksSection.tsx)
#### [DELETE] [StatsFooter.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/home/StatsFooter.tsx)
#### [DELETE] [TestimonialsSection.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/home/TestimonialsSection.tsx)
#### [DELETE] [WhyChooseUsSection.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/home/WhyChooseUsSection.tsx)

> [!NOTE]
> The `(common)/page.tsx` already has a proper Team Hub landing page — it doesn't import any of these old travel sections. They are dead code.

#### Old Dashboard Components to Delete
#### [DELETE] [AdminDashboard.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/dashboard/AdminDashboard.tsx)
#### [DELETE] [UserDashboard.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/dashboard/UserDashboard.tsx)
#### [DELETE] [DashboardShell.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/dashboard/DashboardShell.tsx)
#### [DELETE] [DashboardShellClient.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/dashboard/DashboardShellClient.tsx)

---

### 4. Clean Up Types

#### [MODIFY] [user.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/types/user.ts)
- Replace entire file with types matching backend User model (no travel fields, no subscription, no reviews, no admin user management types)

#### [DELETE] [dashboard.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/types/dashboard.ts)
- Old travel-based dashboard types — will be replaced

---

### 5. Update `updateMyProfile.ts` Service

#### [MODIFY] [updateMyProfile.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/user/updateMyProfile.ts)
- Fix API endpoint: `/user/profile/update` → `/users/update-me` (matching backend `UserRoutes`)
- Update type to match backend schema (remove travel-specific fields not in the User model)
- Fix `revalidateTag` call (currently has invalid second argument)

---

### 6. Update `me.ts` Service

#### [MODIFY] [me.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/services/auth/me.ts)
- Update import to use `MeResponse` from `@/types/auth` instead of `UserProfileResponse` from `@/types/user` (the old travel-based type)

---

### 7. Update Proxy Middleware

#### [MODIFY] [proxy.ts](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/proxy.ts)
- Remove routes that no longer exist: `forgot-password`, `reset-password`, `verify-email`, `change-password`, `reviews`, `travel-plans`, `my-travel-plans`, `subscription`, `users`

---

### 8. Update Navbar

#### [MODIFY] [Navbar.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/shared/navbar/Navbar.tsx)
- Remove travel-related nav items: `Matching Plan`, `Pricing`, `Travel Plans`, `Travelers`
- Update `me()` import to use the corrected `me.ts` service
- Add Team Hub relevant items: `Dashboard`

#### [MODIFY] [NavbarAuth.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/shared/navbar/NavbarAuth.tsx)
- Remove import of `logoutUser` from deleted `@/services/auth/logout`
- Use `logoutAction` from `@/actions/auth.actions` instead
- Update type from `UserProfile` (travel types) to `User` from `@/types/auth`

---

### 9. Implement New Dashboard Page

#### [MODIFY] [page.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/app/(protected)/dashboard/page.tsx)
- Remove old `AdminDashboard`/`UserDashboard` imports and `getDashboardStats` call
- Implement a simple, clean dashboard showing:
  - Welcome greeting with user name
  - User profile card (avatar, role, status, member since)
  - Quick links to workspace features (Goals, Announcements, Kanban, Analytics)

---

### 10. Implement Profile Page (within dashboard)

#### [NEW] [page.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/app/(protected)/dashboard/profile/page.tsx)
- Server component that fetches user via `me()` and renders `ProfileContent`

#### [MODIFY] [ProfileContent.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/profile/ProfileContent.tsx)
- Remove travel-specific fields: `travelInterests`, `visitedCountries`, `subscription`, `hasVerifiedBadge`, `isVerified`, `bio`, `contactNumber`, `currentLocation`, `dateOfBirth`, `gender`
- Align displayed fields with backend User model: `id`, `email`, `fullName`, `avatar`, `role`, `status`, `createdAt`

#### [NEW] [page.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/app/(protected)/dashboard/profile/edit/page.tsx)
- Server component for edit profile, renders `EditProfileForm`

#### [MODIFY] [EditProfileForm.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/profile/EditProfileForm.tsx)
- Remove travel-specific form fields not in User model
- Update to only show: `fullName` (editable), `email` (display only), avatar upload
- Fix form submission to use corrected `updateMyProfile` endpoint

---

### 11. Update Sidebar Navigation

#### [MODIFY] [app-sidebar.tsx](file:///home/mamun/Desktop/workspace/mamun/team-hub/apps/web/src/components/modules/dashboard/app-sidebar.tsx)
- Add "Profile" to navigation items
- Already has correct Team Hub navigation (Goals, Announcements, Kanban, Analytics)

---

## Open Questions

> [!IMPORTANT]
> **Profile fields scope**: The backend `updateProfile` validation accepts `fullName`, `contactNumber`, `bio`, `dateOfBirth`, `gender`, `currentLocation`, `travelInterests`, `visitedCountries` — but the Prisma User model only has `fullName` and `avatar`. The validation schema appears to be copy-pasted from the old project and will likely fail at the DB level for fields not in the schema. Should I:
> - **(A)** Only show `fullName` + avatar in the edit form (safe, matches Prisma model)?
> - **(B)** Show all fields from the validation schema (may fail at DB)?
>
> I recommend **(A)** to match the actual database schema.

> [!IMPORTANT]  
> **`logout.ts` in `services/auth/`**: This file imports from the already-deleted `tokenHandlers.ts`. The `NavbarAuth.tsx` imports `logoutUser` from this file. I'll switch it to use `logoutAction` from `auth.actions.ts` instead and delete `logout.ts`. Is that OK?

---

## Verification Plan

### Automated Tests
```bash
cd /home/mamun/Desktop/workspace/mamun/team-hub && pnpm build
```
- Verify no TypeScript/build errors after all changes

### Manual Verification
- Check dashboard renders correctly after login
- Verify profile page shows user info
- Verify edit profile form works
- Confirm no broken imports remain
