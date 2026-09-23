import {
  LayoutDashboard,
  FileText,
} from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
  badge?: string;
  section?: string;
}

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: LayoutDashboard,
    section: 'Overview',
  },
  {
    label: 'Blogs',
    to: '/admin/management/blogs',
    icon: FileText,
    section: 'Content',
  },
];