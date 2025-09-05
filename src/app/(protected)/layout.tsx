import { ProtectedProvider } from "@/providers/protected-provider";

type RootProtectedLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootProtectedLayout = ({ children }: RootProtectedLayoutProps) => {
  return <ProtectedProvider>{children}</ProtectedProvider>;
};

export default RootProtectedLayout;
