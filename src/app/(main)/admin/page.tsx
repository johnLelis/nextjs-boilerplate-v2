"use client";

import { useEffect, useState } from "react";

import type { UserWithRole } from "better-auth/plugins/admin";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSwap } from "@/components/ui/loading-swap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth/auth-client";

type Roles = "user" | "admin" | ("user" | "admin")[] | undefined;

type CreateForm = {
  email: string;
  password: string;
  name: string;
  role: Roles;
};

type EditForm = Pick<CreateForm, "name" | "role">;

const AdminPage = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const pageSize = 10;

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Form states
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [createForm, setCreateForm] = useState<CreateForm>({
    email: "",
    password: "",
    name: "",
    role: "user",
  });
  const [editForm, setEditForm] = useState<EditForm>({
    name: "",
    role: "user",
  });
  const [banForm, setBanForm] = useState({
    reason: "",
    expiresIn: "",
  });
  const [newPassword, setNewPassword] = useState("");

  const loadUsers = async (page = 1, search = "") => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.admin.listUsers({
        query: {
          limit: pageSize,
          offset: (page - 1) * pageSize,
          searchValue: search || undefined,
          searchField: "name",
          searchOperator: "contains",
        },
      });

      if (error) {
        toast.error(error.message || "Failed to load users");
      } else if (data) {
        setUsers(data.users || []);
        setTotalUsers(data.total || 0);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load users";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(currentPage, searchValue);
  }, [currentPage, searchValue]);

  const handleSearch = () => {
    setCurrentPage(1);
    loadUsers(1, searchValue);
  };

  const handleCreateUser = async () => {
    if (!createForm.email || !createForm.password || !createForm.name) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsActionLoading(true);
    try {
      const { error } = await authClient.admin.createUser({
        email: createForm.email,
        password: createForm.password,
        name: createForm.name,
        role: createForm.role,
      });

      if (error) {
        toast.error(error.message || "Failed to create user");
      } else {
        toast.success("User created successfully");
        setShowCreateModal(false);
        setCreateForm({ email: "", password: "", name: "", role: "user" });
        await loadUsers(currentPage, searchValue);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create user";
      toast.error(errorMessage);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    setIsActionLoading(true);
    try {
      const { error: updateError } = await authClient.admin.updateUser({
        userId: selectedUser.id,
        data: { name: editForm.name },
      });

      if (updateError) {
        toast.error(updateError.message || "Failed to update user");
        return;
      }

      if (editForm.role && editForm.role !== selectedUser.role) {
        const { error: roleError } = await authClient.admin.setRole({
          userId: selectedUser.id,
          role: editForm?.role,
        });

        if (roleError) {
          toast.error(roleError.message || "Failed to update role");
          return;
        }
      }

      toast.success("User updated successfully");
      setShowEditModal(false);
      setSelectedUser(null);
      await loadUsers(currentPage, searchValue);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update user";
      toast.error(errorMessage);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsActionLoading(true);
    try {
      const { error } = await authClient.admin.removeUser({
        userId: selectedUser.id,
      });

      if (error) {
        toast.error(error.message || "Failed to delete user");
      } else {
        toast.success("User deleted successfully");
        setShowDeleteModal(false);
        setSelectedUser(null);
        await loadUsers(currentPage, searchValue);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete user";
      toast.error(errorMessage);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBanUser = async () => {
    if (!selectedUser) return;

    setIsActionLoading(true);
    try {
      const { error } = await authClient.admin.banUser({
        userId: selectedUser.id,
        banReason: banForm.reason || undefined,
        banExpiresIn: banForm.expiresIn
          ? Number.parseInt(banForm.expiresIn) * 60 * 60 * 24
          : undefined,
      });

      if (error) {
        toast.error(error.message || "Failed to ban user");
      } else {
        toast.success("User banned successfully");
        setShowBanModal(false);
        setSelectedUser(null);
        setBanForm({ reason: "", expiresIn: "" });
        await loadUsers(currentPage, searchValue);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to ban user";
      toast.error(errorMessage);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUnbanUser = async (user: UserWithRole) => {
    setIsActionLoading(true);
    try {
      const { error } = await authClient.admin.unbanUser({
        userId: user.id,
      });

      if (error) {
        toast.error(error.message || "Failed to unban user");
      } else {
        toast.success("User unbanned successfully");
        await loadUsers(currentPage, searchValue);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to unban user";
      toast.error(errorMessage);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!selectedUser || !newPassword) return;

    setIsActionLoading(true);
    try {
      const { error } = await authClient.admin.setUserPassword({
        userId: selectedUser.id,
        newPassword: newPassword,
      });

      if (error) {
        toast.error(error.message || "Failed to change password");
      } else {
        toast.success("Password changed successfully");
        setShowPasswordModal(false);
        setSelectedUser(null);
        setNewPassword("");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to change password";
      toast.error(errorMessage);
    } finally {
      setIsActionLoading(false);
    }
  };

  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <div className="container mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage all users in your application
              </CardDescription>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              Create User
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="flex gap-2">
            <Input
              placeholder="Search by name..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>

          {/* Users Table */}
          {isLoading && (
            <p className="text-muted-foreground text-center text-sm">
              Loading users...
            </p>
          )}

          {!isLoading && users.length === 0 && (
            <p className="text-muted-foreground text-center text-sm">
              No users found
            </p>
          )}

          {!isLoading && users.length > 0 && (
            <div className="space-y-2">
              {users.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{user.name}</p>
                        {user.banned && (
                          <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800 dark:bg-red-900 dark:text-red-100">
                            Banned
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {user.email}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Role: {user.role} • Joined{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setEditForm({
                            name: user.name,
                            role: user.role as Roles,
                          });
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowPasswordModal(true);
                        }}
                      >
                        Password
                      </Button>
                      {user.banned ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnbanUser(user)}
                          disabled={isActionLoading}
                        >
                          Unban
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowBanModal(true);
                          }}
                        >
                          Ban
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, totalUsers)} of {totalUsers}{" "}
                users
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create User Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to your application
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-name">Name</Label>
              <Input
                id="create-name"
                value={createForm.name}
                onChange={(e) =>
                  setCreateForm({ ...createForm, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-email">Email</Label>
              <Input
                id="create-email"
                type="email"
                value={createForm.email}
                onChange={(e) =>
                  setCreateForm({ ...createForm, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-password">Password</Label>
              <Input
                id="create-password"
                type="password"
                value={createForm.password}
                onChange={(e) =>
                  setCreateForm({ ...createForm, password: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-role">Role</Label>
              <Select
                value={createForm.role as string}
                onValueChange={(value) =>
                  setCreateForm({ ...createForm, role: value as Roles })
                }
              >
                <SelectTrigger id="create-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setCreateForm({
                  email: "",
                  password: "",
                  name: "",
                  role: "user",
                });
              }}
              disabled={isActionLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateUser} disabled={isActionLoading}>
              <LoadingSwap isLoading={isActionLoading}>Create User</LoadingSwap>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={editForm.role as string}
                onValueChange={(value) =>
                  setEditForm({ ...editForm, role: value as Roles })
                }
              >
                <SelectTrigger id="edit-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedUser(null);
              }}
              disabled={isActionLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} disabled={isActionLoading}>
              <LoadingSwap isLoading={isActionLoading}>Update User</LoadingSwap>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              {`Are you sure you want to delete "${selectedUser?.name}"? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedUser(null);
              }}
              disabled={isActionLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={isActionLoading}
            >
              <LoadingSwap isLoading={isActionLoading}>Delete</LoadingSwap>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban User Modal */}
      <Dialog open={showBanModal} onOpenChange={setShowBanModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              {`Ban "${selectedUser?.name}" from accessing the application`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ban-reason">Reason (Optional)</Label>
              <Input
                id="ban-reason"
                value={banForm.reason}
                onChange={(e) =>
                  setBanForm({ ...banForm, reason: e.target.value })
                }
                placeholder="e.g., Violating terms of service"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ban-expires">Expires In (Days, Optional)</Label>
              <Input
                id="ban-expires"
                type="number"
                value={banForm.expiresIn}
                onChange={(e) =>
                  setBanForm({ ...banForm, expiresIn: e.target.value })
                }
                placeholder="Leave empty for permanent ban"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowBanModal(false);
                setSelectedUser(null);
                setBanForm({ reason: "", expiresIn: "" });
              }}
              disabled={isActionLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBanUser}
              disabled={isActionLoading}
            >
              <LoadingSwap isLoading={isActionLoading}>Ban User</LoadingSwap>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Password</DialogTitle>
            <DialogDescription>
              {`Set a new password for "${selectedUser?.name}"`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordModal(false);
                setSelectedUser(null);
                setNewPassword("");
              }}
              disabled={isActionLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={isActionLoading || !newPassword}
            >
              <LoadingSwap isLoading={isActionLoading}>
                Change Password
              </LoadingSwap>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
