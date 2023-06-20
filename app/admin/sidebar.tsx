import {
    Search,
    LayoutGrid,
    FolderTree,
    Library,
    ListMusic,
    Mic2,
    Music,
    Music2,
    PlayCircle,
    Radio,
    User,
    Building,
    Users,
    FolderKey,
    User2,
    Fingerprint,
  } from "lucide-react"
  
  import { cn } from "@/lib/utils"
  import { Button } from "@/components/ui/button"
  import { ScrollArea } from "@/components/ui/scroll-area"
import Dashboard from "../dashboard/page"
import { usePathname } from "next/navigation"
import Link from "next/link"
  
  
  interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    
  }

const listData = {
    dashboard: [
        {
            name: 'Dashboard',
            url: '/admin',
            icon: <LayoutGrid className="mr-2 h-4 w-4" />
        },
        {
            name: 'Browse',
            url: '#',
            icon: <Search className="mr-2 h-4 w-4" />
        },
    ],
    classManagement: [
        {
            name: 'Classes',
            url: '/admin/classManagement',
            icon: <Building className="mr-2 h-4 w-4" />
        },
        {
            name: 'Class Categories',
            url: '#',
            icon: <FolderTree className="mr-2 h-4 w-4" />
        },
    ],
    userManagement: [
        {
            name: 'User',
            url: '/admin/userManagement',
            icon: <Users className="mr-2 h-4 w-4" />
        },
        {
            name: 'Role',
            url: '#',
            icon: <FolderKey className="mr-2 h-4 w-4" />
        },
    ],
    settings: [
        {
            name: 'Profile',
            url: '/admin/myProfile',
            icon: <User2 className="mr-2 h-4 w-4" />
        },
        {
            name: 'Privacy',
            url: '#',
            icon: <Fingerprint className="mr-2 h-4 w-4" />
        },
    ],
}
  
  export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-4 py-2">
                    <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                    Discover
                    </h2>
                    <div className="space-y-1">
                        {
                            listData.dashboard.map((data,key)=>{
                                return(
                                    <Button
                                    key={key}
                                    variant={pathname == data.url ? 'secondary' : 'ghost'}
                                    size="sm"
                                    className="w-full justify-start"
                                    asChild
                                    >
                                        <Link href={data.url} >
                                                {data.icon}
                                                {data.name}
                                        </Link>
                                    </Button>
                                )   
                            })
                        }
                    </div>
            </div>
                <div className="px-4 py-2">
                    <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                    Class Management
                    </h2>
                    <div className="space-y-1">
                        {
                            listData.classManagement.map((data,key)=>{
                                return(
                                    <Link href={data.url} key={key}>
                                        <Button
                                        variant={pathname?.startsWith(data.url) ? 'secondary' : 'ghost'}
                                        size="sm"
                                        className="w-full justify-start"
                                        >
                                            {data.icon}
                                            {data.name}
                                        </Button>
                                    </Link>
                                )   
                            })
                        }
                    </div>
                </div>
                <div className="px-4 py-2">
                    <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                    User Management
                    </h2>
                    <div className="space-y-1">
                        {
                            listData.userManagement.map((data, key)=>{
                                return(
                                    <Link href={data.url} key={key}>
                                        <Button
                                        variant={pathname?.startsWith(data.url) ? 'secondary' : 'ghost'}
                                        size="sm"
                                        className="w-full justify-start"
                                        >
                                            {data.icon}
                                            {data.name}
                                        </Button>
                                    </Link>
                                )   
                            })
                        }
                    </div>
                </div>
                <div className="px-4 py-2">
                    <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                    Settings
                    </h2>
                    <div className="space-y-1">
                        {
                            listData.settings.map((data,key)=>{
                                return(
                                    <Link href={data.url} key={key}>
                                        <Button
                                        variant={pathname?.startsWith(data.url) ? 'secondary' : 'ghost'}
                                        size="sm"
                                        className="w-full justify-start"
                                        >
                                            {data.icon}
                                            {data.name}
                                        </Button>
                                    </Link>
                                )   
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        )
    }