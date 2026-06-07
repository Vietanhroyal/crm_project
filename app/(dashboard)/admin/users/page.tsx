"use client";

import { useState, useEffect } from 'react';
import { User, UserRole, UserStatus } from '@/types';
import { UserTable } from '@/components/admin/users/user-table';
import { UserFormDialog, UserFormData } from '@/components/admin/users/user-form-dialog';
import { Button } from '@/components/ui/button';
import { Plus, Download, Mail } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'invite'>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (data: UserFormData) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create user');
    }
    
    await loadUsers();
  };

  const handleInviteUser = async (data: UserFormData) => {
    const res = await fetch('/api/invitations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emails: data.inviteEmails,
        role: data.role,
        ttlHours: data.ttlHours,
      }),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to send invitation');
    }
    
    await loadUsers();
  };

  const handleEditUser = async (data: UserFormData) => {
    if (!selectedUser) return;
    
    const res = await fetch(`/api/users/${selectedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: data.name }),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update user');
    }
    
    await loadUsers();
  };

  const handleSubmit = async (data: UserFormData) => {
    if (formMode === 'invite') {
      await handleInviteUser(data);
    } else if (formMode === 'edit') {
      await handleEditUser(data);
    } else {
      await handleCreateUser(data);
    }
  };

  const handleChangeRole = async (user: User, newRole: UserRole) => {
    const res = await fetch(`/api/users/${user.id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });
    
    if (res.ok) {
      await loadUsers();
    }
  };

  const handleToggleStatus = async (user: User) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    const res = await fetch(`/api/users/${user.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    
    if (res.ok) {
      await loadUsers();
    }
  };

  const handleResetPassword = async (user: User) => {
    const res = await fetch(`/api/users/${user.id}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' }),
    });
    
    if (res.ok) {
      alert('Password reset email sent');
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Bạn có chắc muốn xóa người dùng ${user.name}?`)) return;
    
    const res = await fetch(`/api/users/${user.id}`, {
      method: 'DELETE',
    });
    
    if (res.ok) {
      await loadUsers();
    }
  };

  const openCreateDialog = () => {
    setFormMode('create');
    setSelectedUser(null);
    setFormOpen(true);
  };

  const openInviteDialog = () => {
    setFormMode('invite');
    setSelectedUser(null);
    setFormOpen(true);
  };

  const openEditDialog = (user: User) => {
    setFormMode('edit');
    setSelectedUser(user);
    setFormOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-text-dark">Người dùng</h1>
          <p className="text-text-muted mt-1">Quản lý tài khoản, vai trò và trạng thái nhân viên</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={openInviteDialog}>
            <Mail className="w-4 h-4" />
            Mời
          </Button>
          <Button variant="cta" className="gap-2" onClick={openCreateDialog}>
            <Plus className="w-4 h-4" />
            Thêm mới
          </Button>
        </div>
      </div>

      <UserTable
        users={users}
        onEdit={openEditDialog}
        onDelete={handleDeleteUser}
        onChangeRole={handleChangeRole}
        onToggleStatus={handleToggleStatus}
        onResetPassword={handleResetPassword}
      />

      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        user={selectedUser}
        mode={formMode}
      />
    </div>
  );
}