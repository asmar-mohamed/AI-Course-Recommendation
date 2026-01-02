import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: any
  children?: ChildItem[]
  item?: any
  url?: any
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: any
  id?: string
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: any
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  {
    heading: 'Dashboards',
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/dashboard",
      },
      {
        name: "Recommendations",
        icon: "solar:lightbulb-bolt-line-duotone",
        id: uniqueId(),
        url: "/recommendations",
      },
    ],
  },
  {
    heading: 'Explore',
    children: [
      {
        name: 'Courses',
        icon: 'solar:library-line-duotone',
        id: uniqueId(),
        url: '/courses',
      },
    ],
  },
  {
    heading: 'User',
    children: [
      {
        name: 'Profile',
        icon: 'solar:user-circle-linear',
        id: uniqueId(),
        url: '/profile',
      },
    ],
  },
];

export default SidebarContent;
