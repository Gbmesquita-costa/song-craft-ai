import { useActionState } from "react";
import { handleLogoutUser } from "@/actions/logout-user";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bell, Crown, Loader, LogOut, Settings, User } from "lucide-react";
import { useSession } from "next-auth/react";

interface LogOutUserContainerProps {
  pending: boolean;
}

const LogOutUserContainer = ({ pending }: LogOutUserContainerProps) => {
  return (
    <DropdownMenuItem
      asChild
      className="cursor-pointer disabled:cursor-not-allowed"
      disabled={pending}
      onSelect={(event) => event.preventDefault()}
    >
      <button
        type="submit"
        className="w-full flex items-center justify-start 
        cursor-pointer disabled:cursor-not-allowed"
      >
        {pending ? (
          <div className="animate-spin mr-3">
            <Loader />
          </div>
        ) : (
          <LogOut className="mr-2 h-4 w-4" />
        )}
        <span>Sair</span>
      </button>
    </DropdownMenuItem>
  );
};

const UserAccount = () => {
  const [_, formAction, isPending] = useActionState(handleLogoutUser, null);
  // const { data: session, status } = useSession();

  return (
    <div className="mt-auto space-y-4">
      {/* Upgrade banner */}
      <div
        className="bg-gradient-to-r from-purple-50 
        to-blue-50 rounded-lg p-3 border border-purple-200"
      >
        <div className="flex items-center space-x-3">
          <div
            className="p-2 bg-gradient-to-r from-purple-500 
            to-blue-500 rounded-lg flex items-center justify-center"
          >
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Upgrade para Pro
            </p>
            <p className="text-xs text-gray-600">
              Música ilimitada e mais recursos
            </p>
          </div>
        </div>
        <Button
          size="sm"
          className="w-full mt-3 bg-gradient-to-r 
        from-purple-600 to-blue-600"
        >
          Fazer Upgrade
        </Button>
      </div>

      {/* User dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-3 
              hover:bg-gray-50 border rounded-lg"
          >
            <div className="flex items-center space-x-3 w-full">
              {/* <div className="text-2xl">{session?.user?.image}</div> */}
              <div className="flex-1 min-w-0 text-left">
                {/* <p className="text-sm font-medium text-gray-900 truncate">
                  {session?.user?.name}
                </p> */}
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                </div>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="center" forceMount>
          <DropdownMenuLabel className="flex flex-col space-y-1">
            {/* <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p> */}
            {/* <p
              className="text-xs leading-none 
              text-muted-foreground"
            >
              {session?.user?.email}
            </p> */}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="relative">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notificações</span>

            <Badge
              className="ml-auto h-5 w-5 p-0 text-xs 
            bg-red-500 flex items-center justify-center"
            >
              3
            </Badge>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <form action={formAction}>
            <LogOutUserContainer pending={isPending} />
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { UserAccount };
